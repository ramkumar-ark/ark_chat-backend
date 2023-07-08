import dotenv from 'dotenv';
import bunyan from 'bunyan';
import cloudinary from 'cloudinary';

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
	public CLOUD_NAME: string | undefined;
	public CLOUD_API_KEY: string | undefined;
	public CLOUD_API_SECRET: string | undefined;

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
		this.CLOUD_NAME = process.env.CLOUD_NAME || '';
		this.CLOUD_API_KEY = process.env.CLOUD_API_KEY || '';
		this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET || '';
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

	public cloudinaryConfig(): void {
		cloudinary.v2.config({
			cloud_name: this.CLOUD_NAME,
			api_key: this.CLOUD_API_KEY,
			api_secret: this.CLOUD_API_SECRET,
		});
	}
}

export const config: Config = new Config();
