import { Request, Response } from 'express';
import * as serviceTask from '../services/taks.service';
import { ITask } from '../types/tasks.types';

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await serviceTask.getServiceTasks();
    res.status(200).json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await serviceTask.getServiceTask(id);

    if (result.rows.length === 0)
      res.status(404).json({ message: 'Task not found' });

    res.json(result.rows[0]);
    return;
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description } = req.body as ITask;

  const existTitle = await serviceTask.existsTitle(title);

  if (existTitle.rows.length != 0) {
    const err = new Error('Titulo ya registrado');
    res.status(400).json(err.message);
    return;
  }

  try {
    const newTask = await serviceTask.createServiceTask(title, description);
    res.status(201).json(newTask.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await serviceTask.deleteServiceTask(id);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Task not found' });
    }

    res.sendStatus(204);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { description, title } = req.body as ITask;

  try {
    const result = await serviceTask.updateServiceTask(title, description, id);

    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
