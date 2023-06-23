import { BaseResponse } from '../types';
import { Request, RequestHandler } from 'express';
import { isNumeric, messageError, successResponse } from '../../helpers';
import { UserService} from '../../services';
import _ from 'lodash';
import { User} from '../../models';

type Params = unknown;
type ResBody = Array<User>;
type ReqBody = unknown;
type ReqQuery = unknown
type GetAllUsersRequestHandler = RequestHandler<Params, BaseResponse<ResBody>, ReqBody, ReqQuery>;

const validateRequest: GetAllUsersRequestHandler = (req, res, next) => {
  // Base validation
  if (!_.isEmpty(req.params)) return next(messageError('Path parameters not allowed'));
  if (!_.isEmpty(req.query)) return next(messageError('Query parameters not allowed'));
  if (!_.isEmpty(req.body)) return next(messageError('Body parameters not allowed'));

  next();
};

const getAllUsers: GetAllUsersRequestHandler = async (req, res, next) => {
  const [users, err] = await UserService.getAllUsers();

  if (err !== null || users === null) {
    return next(err);
  }

  res.status(200).json(successResponse(users));
};

export const GetAllUsersRoute = [validateRequest, getAllUsers];
