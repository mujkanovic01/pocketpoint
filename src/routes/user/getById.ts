import { BaseResponse } from '../types';
import { Request, RequestHandler } from 'express';
import { isNumeric, messageError, successResponse } from '../../helpers';
import { UserService } from '../../services';
import _ from 'lodash';
import { User } from '../../models';

type Params = unknown;
type ResBody = User;
type ReqBody = unknown;
type ReqQuery = { id: string };
type GetByIdRequestHandler = RequestHandler<Params, BaseResponse<ResBody>, ReqBody, ReqQuery>;

const transformRequest = (req: Request<Params, BaseResponse<ResBody>, ReqBody, ReqQuery>) => ({
  id: parseInt(req.query.id),
});

const validateRequest: GetByIdRequestHandler = (req, res, next) => {
  // Base validation
  if (!_.isEmpty(req.params)) return next(messageError('Query parameters not allowed'));
  if (!_.isEmpty(req.body)) return next(messageError('Body parameters not allowed'));

  // Id validation
  if (req.query.id == undefined) return next(messageError('Missing id'));
  if (!isNumeric(req.query.id)) return next(messageError('Invalid id'));

  next();
};

const getById: GetByIdRequestHandler = async (req, res, next) => {
  const { id } = transformRequest(req);

  const [user, err] = await UserService.getById(id);
  if (err !== null || user === null) {
    return next(err);
  }

  res.status(200).json(successResponse(user));
};

export const GetByIdRoute = [validateRequest, getById];
