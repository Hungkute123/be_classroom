import mongoose from 'mongoose';
import config from 'config';


const URL: any = process.env.DB_HOST || config.get('db_host');

export const connectDB = async function () {
	await mongoose.connect(URL, {
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});
	console.log(`Connected to success database`);
};
