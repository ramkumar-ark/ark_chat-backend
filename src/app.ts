import express, { Express } from 'express';
import { AppServer } from './setupServer';
import connectDatabase from './setupDatabase';
import { config } from './config';

class App {
	public initialize(): void {
		this.loadConfig();
		connectDatabase();
		const app: Express = express();
		const server: AppServer = new AppServer(app);
		server.start();
	}

	private loadConfig(): void {
		config.validateConfig();
	}
}

const application: App = new App();
application.initialize();
