import express from 'express';
import {CreateTournamentRoute} from "./createTournament";
import {GetTournamentDataByIdRoute} from "./getTournamentDataById";
import {GetAllTournamentsRoute} from "./getAllTournaments";

const TorunamentsRouter = express.Router();

TorunamentsRouter.post('/createTournament', CreateTournamentRoute);
TorunamentsRouter.get('/tournamentData', GetTournamentDataByIdRoute);
TorunamentsRouter.get('/getAllTournaments', GetAllTournamentsRoute);

export { TorunamentsRouter };
