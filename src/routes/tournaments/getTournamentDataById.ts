import { BaseResponse } from '../types';
import { Request, RequestHandler } from 'express';
import { isNumeric, messageError, successResponse } from '../../helpers';
import {TournamentService, UserService} from '../../services';
import _ from 'lodash';
import { User } from '../../models';

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = { id: string };
type GetTournamentDataByIdRequestHandler = RequestHandler<Params, BaseResponse<ResBody>, ReqBody, ReqQuery>;

const transformRequest = (req: Request<Params, BaseResponse<ResBody>, ReqBody, ReqQuery>) => ({
  id: parseInt(req.query.id),
});

const validateRequest: GetTournamentDataByIdRequestHandler = (req, res, next) => {
  // Base validation
  if (!_.isEmpty(req.params)) return next(messageError('Query parameters not allowed'));
  if (!_.isEmpty(req.body)) return next(messageError('Body parameters not allowed'));

  // Id validation
  if (req.query.id == undefined) return next(messageError('Missing id'));
  if (!isNumeric(req.query.id)) return next(messageError('Invalid id'));

  next();
};

const getTournamentDataById: GetTournamentDataByIdRequestHandler = async (req, res, next) => {
  const { id } = transformRequest(req);

  const [tournamentData, err] = await TournamentService.getTournamentDataById(id);
  if (err !== null || tournamentData === null) {
    return next(err);
  }

  res.status(200).json(successResponse(tournamentData));
};

export const GetTournamentDataByIdRoute = [validateRequest, getTournamentDataById];
