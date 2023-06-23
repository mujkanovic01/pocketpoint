import { BaseResponse } from '../types';
import { Request, RequestHandler } from 'express';
import { isNumeric, messageError, successResponse } from '../../helpers';
import {TournamentService} from '../../services';
import _ from 'lodash';
import {Tournament, User} from '../../models';

type Params = unknown;
type ResBody = Array<Tournament>;
type ReqBody = unknown;
type ReqQuery = unknown
type GetAllTournamentsRequestHandler = RequestHandler<Params, BaseResponse<ResBody>, ReqBody, ReqQuery>;

const validateRequest: GetAllTournamentsRequestHandler = (req, res, next) => {
  // Base validation
  if (!_.isEmpty(req.params)) return next(messageError('Path parameters not allowed'));
  if (!_.isEmpty(req.query)) return next(messageError('Query parameters not allowed'));
  if (!_.isEmpty(req.body)) return next(messageError('Body parameters not allowed'));

  next();
};

const getAllTournaments: GetAllTournamentsRequestHandler = async (req, res, next) => {
  const [tournaments, err] = await TournamentService.getAllTournaments();

  if (err !== null || tournaments === null) {
    return next(err);
  }

  res.status(200).json(successResponse(tournaments));
};

export const GetAllTournamentsRoute = [validateRequest, getAllTournaments];
