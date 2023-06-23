import { BaseResponse } from "../types";
import { Request, RequestHandler } from 'express';
import { messageError, successResponse } from '../../helpers';
import { UserService } from '../../services';
import _ from 'lodash';

type Params = unknown;
type ResBody = string;
type ReqBody = unknown;
type ReqQuery = { email: string };
type GetByEmailRequestHandler = RequestHandler<Params, BaseResponse<ResBody>, ReqBody, ReqQuery>;

const transformRequest = (req: Request<Params, BaseResponse<ResBody>, ReqBody, ReqQuery>) => ({
  email: req.query.email,
});

const validateRequest: GetByEmailRequestHandler = (req, res, next) => {
  // Base validation
  if (!_.isEmpty(req.params)) return next(messageError('Path parameters not allowed'));
  if (!_.isEmpty(req.body)) return next(messageError('Body parameters not allowed'));

  // Params validation
  if (req.query.email === undefined) return next(messageError('Missing email'));

  next();
};

const getByEmail: GetByEmailRequestHandler = async (req, res, next) => {
  const { email } = transformRequest(req);

  const [user, err] = await UserService.getByEmail(email);
  if (err !== null || user === null) {
    return next(err);
  }

  res.status(200).json(successResponse('User valid'));
};

export const GetByEmailRoute = [validateRequest, getByEmail];
