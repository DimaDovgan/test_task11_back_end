"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
//import cookieParser from 'cookie-parser';
// import  logger from 'morgan';
// import cors from 'cors';
// const indexRouter = require('./routes/api/leson');
// const usersRouter = require('./routes/api/auth');
const forms_1 = __importDefault(require("./routes/forms"));
const app = (0, express_1.default)();
app.use(cors({
    origin: '*'
}));
app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server/test');
});
app.use('/forms', forms_1.default);
// app.use('/api/users', usersRouter);
app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});
app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
});
module.exports = app;
