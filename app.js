import express from 'express';
import userRouter from './routes/user.js';
// import adminRouter from './routes/admin.js';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import taskRouter from './routes/task.js';
import { errorMiddleware } from './middlewars/error.js';
import cors from 'cors';



export const app = express();

config({
  path : './data/config.env',
})
 
// const allowedOrigins = 'https://final-todo-umber.vercel.app/'
const allowedOrigins = `${process.env.FRONTEND_URI}`

//Using middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin : (origin, callback) =>{
    if(!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    }else{
      callback(new Error('Not Allowed By CORS'))
    }
  },
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true,
}));
//Using Routes
app.use('/api/v1/users', userRouter);
// app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/tasks', taskRouter);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//error middleware
app.use(errorMiddleware);