import express, { Express, Request, Response } from 'express';
import path from 'path'

const cookieParser =require('cookie-parser')
const logger =require('morgan')
const cors =require('cors')
//import cookieParser from 'cookie-parser';
// import  logger from 'morgan';
// import cors from 'cors';

// const indexRouter = require('./routes/api/leson');
// const usersRouter = require('./routes/api/auth');
 import forms from "./routes/forms";

const app = express();


app.use(cors({
  origin: '*'
}));

 app.use(logger('dev'));
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
 app.use(express.static(path.join(__dirname, 'public')));

 app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server/test');
  });
  
 app.use('/forms', forms);
// app.use('/api/users', usersRouter);

app.use((req:Request, res:Response) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err:any, req:Request, res:Response, next:any) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({message})
})

module.exports = app;