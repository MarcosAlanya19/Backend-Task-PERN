import { pool } from '../database/db';

export const getServiceTasks = async () => await pool.query('select * from task');

export const getServiceTask = async (id: string) =>
  await pool.query('select * from task where id = $1', [id]);

export const existsTitle = async (title: string) =>
  pool.query('select * from task where title in ($1)', [title]);

export const createServiceTask = async (title: string, description: string) =>
  pool.query('insert into task (title, description) values ($1, $2) returning *', [
    title,
    description,
  ]);

export const deleteServiceTask = async (id: string) =>
  pool.query('delete from task where id = $1', [id]);

export const updateServiceTask = async (
  title: string,
  description: string,
  id: string
) =>
  pool.query('update task set title= $1, description=$2 where id=$3 returning *', [
    title,
    description,
    id,
  ]);
