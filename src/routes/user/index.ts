import express from 'express';
import { GetByIdRoute } from './getById';

const UserRouter = express.Router();

UserRouter.get('/login', GetByIdRoute);

export { UserRouter };
