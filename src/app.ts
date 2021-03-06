import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import createConnection from './database';
import { router } from './router';

createConnection();
const app = express();
app.use(cors())
app.use(express.json());

app.use('/api', router);

export { app };
