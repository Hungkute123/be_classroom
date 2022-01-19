import dotenv from 'dotenv';
dotenv.config();
const CLOUDINARY ={ 
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
};

const config = {
    cloudinary: CLOUDINARY,
};

export default config;