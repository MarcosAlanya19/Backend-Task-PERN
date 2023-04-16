import { Pool } from 'pg';
import { config } from '../config';

export const pool = new Pool({
  user: config.DB.USER,
  password: config.DB.PASSWORD,
  host: config.DB.HOST,
  port: Number(config.DB.PORT),
  database: config.DB.DATABASE,
});

export const createTableIfNotExists = async (): Promise<void> => {
  await pool.connect();
  try {
    await pool.query(
      `
        create extension if not exists "uuid-ossp";
        create table if not exists task(
          id UUID primary key default uuid_generate_v4(),
          title varchar(255) unique,
          description varchar(255)
        )
      `
    );
    console.log('Conexión a la BD establecida correctamente');
  } catch (error) {
    console.log(`Error en BD: ${error}`);
  }
};
