import dotenv from 'dotenv';
dotenv.config();
const cloudinary = require('cloudinary').v2;
import config from '../config/config';
cloudinary.config({
	cloud_name: config.cloudinary.cloud_name,
	api_key: config.cloudinary.api_key,
	api_secret: config.cloudinary.api_secret,
});
export default cloudinary;
