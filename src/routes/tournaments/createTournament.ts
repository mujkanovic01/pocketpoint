import { BaseResponse } from "../types";
import { Request, RequestHandler } from 'express';
import { messageError, successResponse } from '../../helpers';
import { TournamentService } from '../../services';
import _ from 'lodash';

type Params = unknown;
type ResBody = unknown;
type ReqBody = any;
type ReqQuery = unknown;
type CreateTournamentRequestHandler = RequestHandler<Params, BaseResponse<ResBody>, ReqBody, ReqQuery>;

const transformRequest = (req: Request<Params, BaseResponse<ResBody>, ReqBody, ReqQuery>) => ({
  title: req.body.title,
  club_name: req.body.club_name,
  race_to: req.body.race_to,
  num_of_players: req.body.num_of_players,
  discipline: req.body.discipline,
  datetime: new Date(req.body.datetime),
  players: req.body.players,
});

const validateRequest: CreateTournamentRequestHandler = (req, res, next) => {
  // Base validation
  if (!_.isEmpty(req.params)) return next(messageError('Path parameters not allowed'));
  if (!_.isEmpty(req.query)) return next(messageError('Query parameters not allowed'));

  //Params validation
  if (req.body.title === undefined) return next(messageError('Missing title'));
  if (req.body.club_name === undefined) return next(messageError('Missing club name'));
  if (req.body.race_to === undefined) return next(messageError('Missing race to'));
  if (req.body.num_of_players === undefined) return next(messageError('Missing number of players'));
  if (req.body.discipline === undefined) return next(messageError('Missing discipline'));
  if (req.body.datetime === undefined) return next(messageError('Missing datetime'));
  if (req.body.players === undefined) return next(messageError('Missing players'));

  next();
};

const createTournament: CreateTournamentRequestHandler = async (req, res, next) => {
  const {players, race_to, ...tournamentData} = transformRequest(req);
  const [tournamentId , err] = await TournamentService.createTournament(tournamentData);

  if(tournamentId === null || tournamentId === undefined) {
    return next(err);
  }

  // const playerArray = players.split(', ').map(p => +p);
  const [tournamentIdBracket, err2] = await TournamentService.generateBracket({tournament_id: tournamentId, ...tournamentData, players, race_to});

  if(tournamentIdBracket === null || tournamentIdBracket === undefined || err2) {
    return next(err2);
  }

  res.status(200).json(successResponse({'tournament_id': tournamentIdBracket}));
};

export const CreateTournamentRoute = [validateRequest, createTournament];
