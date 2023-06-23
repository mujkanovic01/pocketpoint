import { BaseResponse } from '../types';
import { Request, RequestHandler } from 'express';
import { messageError, successResponse } from '../../helpers';
import { AuthService, JWTService, UserService } from '../../services';
import _ from 'lodash';
import bcrypt from 'bcrypt';

type Params = {};
type ResBody = { access_token: string };
type ReqBody = { email: string; password: string };
type ReqQuery = unknown;
type LoginRequestHandler = RequestHandler<Params, BaseResponse<ResBody>, ReqBody, ReqQuery>;

const transformRequest = (req: Request<Params, BaseResponse<ResBody>, ReqBody, ReqQuery>) => ({
    email: req.body.email,
    password: req.body.password,
});

const validateRequest: LoginRequestHandler = (req, res, next) => {
    // Base validation
    if (!_.isEmpty(req.query)) return next(messageError('Query parameters not allowed'));
    if (!_.isEmpty(req.params)) return next(messageError('Path parameters not allowed'));

    // Params validation
    if (req.body.email == undefined) return next(messageError('Missing email'));
    if (req.body.password == undefined) return next(messageError('Missing password'));

    next();
};

const login: LoginRequestHandler = async (req, res, next) => {
    const { email, password } = transformRequest(req);

    const [user, e] = await UserService.getByEmail(email);

    if (user === undefined || user === null) {
        return next(messageError("Invalid credentials"));
    }

    if (e !== null) {
        return next(e);
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
        return next(messageError('Invalid credentials'));
    }

    const [accessToken, accessTokenErr] = await JWTService.signAccessData({ user_id: user.id, 'first_name': user.first_name, 'last_name': user.last_name });

    if (accessTokenErr !== null || accessToken === null) {
        return next(messageError('Unknown error'));
    }

    // await AuthService.invalidateResetTokens(user.id);

    res.status(200).json(successResponse({ access_token: accessToken }));
};

export const LoginRoute = [validateRequest, login];
