import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors"
import cors from 'cors';
import 'reflect-metadata';
import createConnection from './database';
import { AppError } from './error/AppError';
import { router } from './router';

createConnection();
const app = express();
app.use(cors())
app.use(express.json());

app.use('/api', router);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) return response.status(err.statusCode)
        .json({
            message: err.message,
            type:err.name
        })
    return response.status(500).json({
        status: "Error",
        message:`Internal server error ${err.message}`
    })
})

export { app };
