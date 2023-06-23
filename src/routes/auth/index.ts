import {RegisterRoute} from "./register";
import express from "express";
import {LoginRoute} from "./login";

const AuthRouter = express.Router();

AuthRouter.post('/login', LoginRoute)
AuthRouter.post('/register', RegisterRoute)

export { AuthRouter };
