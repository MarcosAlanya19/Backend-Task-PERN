import dotenv from 'dotenv';
dotenv.config();

export const config = {
  DB: {
    USER: process.env.DB_USER || 'admin',
    PASSWORD: process.env.DB_PASSWORD || 'admin',
    HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || 5432,
    DATABASE: process.env.DB_DATABASE || 'tasksdb',
  },
};
