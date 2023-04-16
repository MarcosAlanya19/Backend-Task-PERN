import { Router } from 'express';
import * as taskCtrl from '../controllers/tasks.controllers';

export const router = Router();

router.get('/tasks', taskCtrl.getAllTasks);
router.get('/tasks/:id', taskCtrl.getTask);
router.post('/tasks', taskCtrl.createTask);
router.delete('/tasks/:id', taskCtrl.deleteTask);
router.put('/tasks/:id', taskCtrl.updateTask);
