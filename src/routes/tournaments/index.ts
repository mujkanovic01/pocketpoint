import express from 'express';
import {CreateTournamentRoute} from "./createTournament";

const TorunamentsRouter = express.Router();

TorunamentsRouter.post('/createTournament', CreateTournamentRoute);

export { TorunamentsRouter };
