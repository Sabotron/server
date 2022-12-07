

import express from 'express';
import cors from "cors";
import morgan from 'morgan';
import { config } from 'dotenv';
import * as fs from 'fs';

const app = express();
config();

import userRouter from './routes/user.router.js';
import postRouter from './routes/post.router.js';
import scheduleRouter from './routes/schedule.router.js';


app.set("port", process.env.PORT || 3001);
app.use(cors({ credentials: true, origin: '*' }));
app.use(morgan('dev'));
app.use(express.json());

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/schedule',scheduleRouter);
app.use((req, res, next) => {
    res.status(404).json({
        message: 'page not found'
    })
})

app.get("/", (req, res) => {
    res.send("Hello mfs!")
})

app.listen(app.get("port"), () => {
    console.log("Server running on port", app.get("port"));
});

