import express from 'express';
import { GetByIdRoute } from './getById';
import {GetByEmailRoute} from "./getByEmail";
import {GetAllByNameRoute} from "./getAllByName";

const UserRouter = express.Router();

UserRouter.get('/getUserById', GetByIdRoute);
UserRouter.get('/getUserByEmail', GetByEmailRoute);
UserRouter.get('/getUsersByName', GetAllByNameRoute);

export { UserRouter };
