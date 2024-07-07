import express from 'express';
import { deleteTask, getMyTask, newTask, updateTask } from '../contorllers/task.js';
// import { isAuthenticated } from '../middlewars/auth.js';

const router = express.Router();

router.post('/new', newTask);
router.get('/my',  getMyTask);
router.route('/:id').put( updateTask).delete(deleteTask);

export default router;


