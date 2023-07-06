import dotenv from 'dotenv';
import bunyan from 'bunyan';

dotenv.config({});

class Config {
	public DATABASE_URL: string | undefined;
	public SERVER_PORT_NO: string | undefined;
	public JWT_SECRET: string | undefined;
	public COOKIE_SESSION_KEY1: string | undefined;
	public COOKIE_SESSION_KEY2: string | undefined;
	public CLIENT_URL: string | undefined;
	public NODE_ENV: string | undefined;
	public REDIS_HOST: string | undefined;

	private readonly DEFAULT_DATABASE_URL = 'mongodb://localhost:27017/ark_chat';
	private readonly DEFAULT_REDIS_HOST = 'redis://localhost:6379';

	constructor() {
		this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
		this.SERVER_PORT_NO = process.env.SERVER_PORT_NO || '1000';
		this.JWT_SECRET = process.env.JWT_SECRET;
		this.COOKIE_SESSION_KEY1 = process.env.COOKIE_SESSION_KEY1 || '';
		this.COOKIE_SESSION_KEY2 = process.env.COOKIE_SESSION_KEY2 || '';
		this.CLIENT_URL = process.env.CLIENT_URL || '';
		this.NODE_ENV = process.env.NODE_ENV || '';
		this.REDIS_HOST = process.env.REDIS_HOST || this.DEFAULT_REDIS_HOST;
	}

	public createLogger(name: string): bunyan {
		return bunyan.createLogger({ name, level: 'debug' });
	}

	public validateConfig(): void {
		for (const [key, value] of Object.entries(this)) {
			if (value === undefined)
				throw new Error(`Configuration ${key} is undefined`);
		}
	}
}

export const config: Config = new Config();
