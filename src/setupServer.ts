import {
	Application,
	json,
	urlencoded,
	Response,
	Request,
	NextFunction,
} from 'express';
import { Server } from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieSession from 'cookie-session';
import compression from 'compression';
import HTTP_STATUS from 'http-status-codes';
import 'express-async-errors';
import Logger from 'bunyan';
import { Server as SocketServer } from 'socket.io';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import appRoutes from './routes';
import { config } from './config';
import {
	CustomError,
	IErrorResponse,
} from './shared/globals/helpers/error-handlers';

const log: Logger = config.createLogger('setupServer');

export class AppServer {
	private app: Application;

	constructor(app: Application) {
		this.app = app;
	}

	public start(): void {
		this.securityMiddleware(this.app);
		this.standardMiddleware(this.app);
		this.routesMiddleware(this.app);
		this.globalErrorHandler(this.app);
		this.startServer(this.app);
	}

	private standardMiddleware(app: Application): void {
		app.use(json({ limit: '50mb' }));
		app.use(urlencoded({ limit: '50mb', extended: true }));
		app.use(compression());
	}
	private securityMiddleware(app: Application): void {
		app.use(
			cookieSession({
				name: 'sessionToken',
				keys: [config.COOKIE_SESSION_KEY1!, config.COOKIE_SESSION_KEY2!],
				maxAge: 24 * 7 * 3600000,
				secure: config.NODE_ENV != 'development', //false for development and true for production with more configs.
			}),
		);
		app.use(
			cors({
				origin: config.CLIENT_URL,
				credentials: true, //should be true so that cookies can be sent
				optionsSuccessStatus: 200,
				methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
			}),
		);
		app.use(helmet());
		app.use(hpp());
	}
	private routesMiddleware(app: Application): void {
		appRoutes(app);
	}
	private globalErrorHandler(app: Application): void {
		app.all('*', (req: Request, res: Response) => {
			res
				.status(HTTP_STATUS.NOT_FOUND)
				.json({ message: `${req.originalUrl} not found` });
		});
		app.use(
			(
				error: IErrorResponse,
				_req: Request,
				res: Response,
				next: NextFunction,
			) => {
				if (error instanceof CustomError) {
					return res.status(error.statusCode).json(error.serializeErrors());
				}
				next();
			},
		);
	}

	private async startServer(app: Application): Promise<void> {
		try {
			const httpServer: Server = new Server(app);
			this.startHttpServer(httpServer);
			const socketIO: SocketServer = await this.createSocketIO(httpServer);
		} catch (error) {
			log.error(error);
		}
	}

	private async createSocketIO(httpServer: Server): Promise<SocketServer> {
		const io: SocketServer = new SocketServer(httpServer, {
			cors: {
				origin: config.CLIENT_URL,
				methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
			},
		});
		const pubClient = createClient({ url: config.REDIS_HOST });
		const subClient = pubClient.duplicate();
		await Promise.all([pubClient.connect(), subClient.connect()]);
		io.adapter(createAdapter(pubClient, subClient));
		return io;
	}

	private startHttpServer(httpServer: Server): void {
		log.info(`Server has started with process ${process.pid}`);
		httpServer.listen(config.SERVER_PORT_NO, () => {
			log.info(`Server listening at port ${config.SERVER_PORT_NO}`);
		});
	}

	private socketIOConnections(io: SocketServer): void {}
}
