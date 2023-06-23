import { dbError, handlePromise, messageError, ValueError } from '../../helpers';
import db from '../../lib/db-client';
import {
    TOURNAMENT_COLUMNS,
    TOURNAMENT_TABLE,
    TournamentInsertData,
    TournamentUpdateData
} from "../../models/tournament";
import {Tournament} from "../../models";


export const createTournament = async (tournamentData: TournamentInsertData): Promise<ValueError<number>> => {
    const [createdCount, err] = await handlePromise(db('tournaments').insert(tournamentData));

    if (err !== null || !createdCount || createdCount?.length < 1) {
        return [null, dbError(err)];
    }

    return [createdCount[0], null];
};

export const getTournamentById = async (id: number): Promise<ValueError<Tournament>> => {
    const [tournament, err] = await handlePromise(db('tournaments').where(TOURNAMENT_COLUMNS.id, id).first());

    if (err !== null) {
        return [null, dbError(err)];
    }
    if (!tournament) {
        return [null, messageError("Tournament doesn't exist")];
    }

    return [tournament, null];
};

export const updateTournament = async (id: number, tournamentData: TournamentUpdateData): Promise<ValueError<Tournament>> => {
    const [updatedCount, err] = await handlePromise(db('tournaments').where(TOURNAMENT_COLUMNS.id, id).update({
        ...tournamentData,
        updated_at: new Date(),
    }));

    if (err !== null) {
        return [null, dbError(err)];
    }
    if (updatedCount === 0) {
        return [null, messageError("Tournament doesn't exist")];
    }

    const [updatedTournament, retrievalErr] = await getTournamentById(id);
    if (retrievalErr !== null) {
        return [null, retrievalErr];
    }

    return [updatedTournament, null];
};