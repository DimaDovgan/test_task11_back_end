"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import {app} from './app';
const app = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
//const db_host=process.env.DB_HOST
//   const {DB_HOST:string,PORT=3004} = process.env;
mongoose_1.default.connect(process.env.DB_HOST).then(() => {
    app.listen(process.env.PORT);
    console.log(`Database connection successful on${process.env.PORT}!!!`);
})
    .catch((error) => {
    console.log(process.env.DB_HOST);
    console.log(error.message);
    process.exit(1);
});
