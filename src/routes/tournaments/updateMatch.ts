import { BaseResponse } from "../types";
import { Request, RequestHandler } from 'express';
import { messageError, successResponse } from '../../helpers';
import { TournamentService } from '../../services';
import _ from 'lodash';
import {MatchUpdateData} from "../../models";

type Params = unknown;
type ResBody = unknown;
type ReqBody = MatchUpdateData;
type ReqQuery = unknown;
type UpdateMatchRequestHandler = RequestHandler<Params, BaseResponse<ResBody>, ReqBody, ReqQuery>;

const transformRequest = (req: Request<Params, BaseResponse<ResBody>, ReqBody, ReqQuery>) => ({
    id: req.body.id,
    status: req.body.status,
    status_code: req.body.status_code,
    player_one_score: req.body.player_one_score,
    player_two_score: req.body.player_two_score,
});

const validateRequest: UpdateMatchRequestHandler = (req, res, next) => {
    // Base validation
    if (!_.isEmpty(req.params)) return next(messageError('Path parameters not allowed'));
    if (!_.isEmpty(req.query)) return next(messageError('Query parameters not allowed'));

    //Params validation
    if (req.body.id === undefined) return next(messageError('Missing id'));
    if (req.body.player_one_score === undefined) return next(messageError('Missing player one score'));
    if (req.body.player_two_score === undefined) return next(messageError('Missing player two score'));
    if (req.body.status === undefined) return next(messageError('Missing status'));
    if (req.body.status_code === undefined) return next(messageError('Missing status code'));

    next();
};

const updateMatch: UpdateMatchRequestHandler = async (req, res, next) => {
    const matchData = transformRequest(req);
    const [updatedCount , err] = await TournamentService.updateMatch(matchData);

    if(updatedCount === null || updatedCount === undefined || err) {
        return next(err);
    }

    res.status(200).json(successResponse('Match updated'));
};

export const UpdateMatchRoute = [validateRequest, updateMatch];
