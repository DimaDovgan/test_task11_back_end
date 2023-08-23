// import {app} from './app';
const app =require("./app")
import dotenv from 'dotenv';
import mongoose from 'mongoose'

 dotenv.config();
 //const db_host=process.env.DB_HOST
//   const {DB_HOST:string,PORT=3004} = process.env;
mongoose.connect(process.env.DB_HOST as string).then(() => {
  app.listen(process.env.PORT);
  console.log(`Database connection successful on${process.env.PORT}!!!`)
} )
    .catch((error) => {
      console.log(process.env.DB_HOST)
    console.log(error.message)
    process.exit(1)
});