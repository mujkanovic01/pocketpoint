import { BaseResponse } from "../types";
import { Request, RequestHandler } from 'express';
import { messageError, successResponse } from '../../helpers';
import { UserService } from '../../services';
import _ from 'lodash';
import {getUsersByName} from "../../services/user";

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = { name: string };
type GetAllByNameRequestHandler = RequestHandler<Params, BaseResponse<ResBody>, ReqBody, ReqQuery>;

const transformRequest = (req: Request<Params, BaseResponse<ResBody>, ReqBody, ReqQuery>) => ({
  name: req.query.name,
});

const validateRequest: GetAllByNameRequestHandler = (req, res, next) => {
  // Base validation
  if (!_.isEmpty(req.params)) return next(messageError('Path parameters not allowed'));
  if (!_.isEmpty(req.body)) return next(messageError('Body parameters not allowed'));

  // Params validation
  if (req.query.name === undefined) return next(messageError('Missing name'));

  next();
};

const getAllByName: GetAllByNameRequestHandler = async (req, res, next) => {
  const { name } = transformRequest(req);

  const [users, err] = await UserService.getUsersByName(name);
  if (err !== null || users === null) {
    return next(err);
  }

  res.status(200).json(successResponse(users));
};

export const GetAllByNameRoute = [validateRequest, getAllByName];
