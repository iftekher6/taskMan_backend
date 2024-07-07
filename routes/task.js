import express from 'express';
import { deleteTask, getMyTask, newTask, updateTask } from '../contorllers/task.js';
import { isAuthenticated } from '../middlewars/auth.js';

const router = express.Router();

router.post('/new', isAuthenticated, newTask);
router.get('/my', isAuthenticated, getMyTask);
router.route('/:id').put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);

export default router;


