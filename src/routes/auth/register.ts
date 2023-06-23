import { BaseResponse } from '../types';
import { Request, RequestHandler } from 'express';
import { messageError, successResponse } from '../../helpers';
import { AuthService, JWTService, UserService } from '../../services';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import { UserInsertData } from "../../models";
import moment from "moment";

type Params = unknown;
type ResBody = { access_token: string };
type ReqBody = UserInsertData;
type ReqQuery = unknown;
type RegisterRequestHandler = RequestHandler<Params, BaseResponse<ResBody>, ReqBody, ReqQuery>;

const transformRequest = (req: Request<Params, BaseResponse<ResBody>, ReqBody, ReqQuery>) => ({
  email: req.body.email,
  password: req.body.password,
  first_name: req.body.first_name,
  last_name: req.body.last_name,
  nationality: req.body.nationality,
  date_of_birth: moment(moment(req.body.date_of_birth).format('YYYY-MM-DD')).toDate(),
});

const validateRequest: RegisterRequestHandler = (req, res, next) => {
  // Base validation
  if (!_.isEmpty(req.query)) return next(messageError('Query parameters not allowed'));
  if (!_.isEmpty(req.params)) return next(messageError('Path parameters not allowed'));

  // Params validation
  if (req.body.email == undefined) return next(messageError('Missing email'));
  if (req.body.password == undefined) return next(messageError('Missing password'));
  if (req.body.first_name == undefined) return next(messageError('Missing first name'));
  if (req.body.last_name == undefined) return next(messageError('Missing last name'));
  if (req.body.nationality == undefined) return next(messageError('Missing nationality'));
  if (req.body.date_of_birth == undefined) return next(messageError('Missing date of birth'));

  next();
};

const register: RegisterRequestHandler = async (req, res, next) => {
  const requestData = transformRequest(req);

  const [user, e] = await UserService.getByEmail(requestData.email);

  if (user !== undefined && e === null) {
    return next(messageError('User already exists'));
  }

  const hashedPassword = await bcrypt.hash(requestData.password, 10);
  const [userIds, err] = await AuthService.register({...requestData, password: hashedPassword });

  if (err !== null || userIds === null) {
    return next(err);
  }

  const [accessToken, accessTokenErr] = await JWTService.signAccessData({ user_id: userIds[0], 'first_name': requestData.first_name, 'last_name': requestData.last_name });

  if (accessTokenErr !== null || accessToken === null) {
    return next(err);
  }

  res.status(200).json(successResponse({ access_token: accessToken }));
};

export const RegisterRoute = [validateRequest, register];
