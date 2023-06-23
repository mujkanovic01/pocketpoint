import express from 'express';
import { GetByIdRoute } from './getById';
import {GetByEmailRoute} from "./getByEmail";
import {GetAllByNameRoute} from "./getAllByName";
import {GetAllUsersRoute} from "./getAllUsers";

const UserRouter = express.Router();

UserRouter.get('/getUserById', GetByIdRoute);
UserRouter.get('/getUserByEmail', GetByEmailRoute);
UserRouter.get('/getUsersByName', GetAllByNameRoute);
UserRouter.get('/getAllUsers', GetAllUsersRoute);

export { UserRouter };
