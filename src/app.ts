import express, { Express } from 'express';
import { AppServer } from '@root/setupServer';
import connectDatabase from '@root/setupDatabase';
import { config } from '@root/config';

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
		config.cloudinaryConfig();
	}
}

const application: App = new App();
application.initialize();
