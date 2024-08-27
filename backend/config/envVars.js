import dotenv from 'dotenv';

dotenv.config();

export const envVars = {
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
}