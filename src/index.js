//import Twitter from 'twitter';
//import { TwitterApi } from 'twitter-api-v2';

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

// Crea archivo .js para agregar tareas al cron
fs.appendFile('//home/hanz/Desktop/Social_Hub_2022/test.js', 'console.log("it works");', function (err) {
    if (err) throw err;
    console.log('Saved!');}
);

app.set("port", process.env.PORT || 3001);
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
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

/*
const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

const tweet1 = async () => {
    try {
        await client.v2.tweet("First post from my app with Node.js!");
    } catch (error) {
        console.log(error)
    }
}
*/
//tweet1();