import express from 'express';
import * as hello from '../controllers/hello.js';

export const helloRouter = express.Router()

// All routes for hello
helloRouter.get('/', hello.index);




