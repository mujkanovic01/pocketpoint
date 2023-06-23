import { dbError, handlePromise, messageError, ValueError } from '../../helpers';
import db from '../../lib/db-client';
import {
    Match,
    MATCH_TABLE,
    MATCH_COLUMNS,
    MatchInsertData,
    MatchUpdateData, RoundInsertData, Round,
} from '../../models';
import {createRound, getRoundById} from "./roundService";


export const createMatchAndReturnData = async (matchData: MatchInsertData): Promise<ValueError<Match>> => {
    const [createdId, err] = await createMatch(matchData)

    if (err !== null || !createdId) {
        return [null, err];
    }

    return getMatchById(createdId);
};

export const createMatch = async (
    matchData: MatchInsertData
): Promise<ValueError<number>> => {
    const [createdCount, err] = await handlePromise(db(MATCH_TABLE).insert(matchData));

    if (err !== null || !createdCount || createdCount?.length < 1) {
        return [null, dbError(err)];
    }

    return [createdCount[0], null];
};

export const getMatchById = async (id: number): Promise<ValueError<Match>> => {
    const [match, err] = await handlePromise(
        db(MATCH_TABLE).where(MATCH_COLUMNS.id, id).first()
    );

    if (err !== null) {
        return [null, dbError(err)];
    }
    if (!match) {
        return [null, messageError("Match doesn't exist")];
    }

    return [match, null];
};

export const updateMatch = async (
    matchData: MatchUpdateData
): Promise<ValueError<number>> => {
    const { id, ...updateData } = matchData;
    const [updatedCount, err] = await handlePromise(
        db(MATCH_TABLE).where(MATCH_COLUMNS.id, id).update(updateData)
    );

    // Update user info

    if (err !== null) {
        return [null, dbError(err)];
    }

    return [updatedCount, null];
};
