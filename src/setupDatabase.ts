import mongoose from 'mongoose';
import Logger from 'bunyan';
import { config } from '@root/config';

const log: Logger = config.createLogger('setupDatabase');

export default () => {
	const connect = () => {
		mongoose
			.connect(config.DATABASE_URL!)
			.then(() => {
				log.info('connected to mongoDb.');
			})
			.catch((error) => {
				log.error('Error connecting to the database', error);
				return process.exit(1);
			});
	};
	connect();

	mongoose.connection.on('disconnected', connect);
};
