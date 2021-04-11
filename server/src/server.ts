import express from 'express';
import cors from 'cors';
import router from './routes';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'https://mp3-downloader.web.app',
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ["my-custom-header"],
}));
app.use(router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server running');
});
