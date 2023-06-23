import { dbError, handlePromise, messageError, ValueError } from '../../helpers';
import db from '../../lib/db-client';
import {Round, ROUND_TABLE, ROUND_COLUMNS, RoundInsertData, RoundUpdateData} from '../../models';

export const createRoundAndReturnData = async (roundData: RoundInsertData): Promise<ValueError<Round>> => {
    const [createdId, err] = await createRound(roundData)

    if (err !== null || !createdId) {
        return [null, err];
    }

    return getRoundById(createdId);
};

export const createRound = async (roundData: RoundInsertData): Promise<ValueError<number>> => {
    const [createdCount, err] = await handlePromise(
        db(ROUND_TABLE).insert(roundData)
    );

    if (err !== null || !createdCount || createdCount?.length < 1) {
        return [null, dbError(err)];
    }

    return [createdCount[0], null];
};

export const getRoundById = async (id: number): Promise<ValueError<Round>> => {
    const [round, err] = await handlePromise(db(ROUND_TABLE).where(ROUND_COLUMNS.id, id).first());

    if (err !== null) {
        return [null, dbError(err)];
    }
    if (!round) {
        return [null, messageError("Round doesn't exist")];
    }

    return [round, null];
};

export const updateRound = async (roundData: RoundUpdateData): Promise<ValueError<number>> => {
    const {id, ...updateData} = roundData;
    const [updatedCount, err] = await handlePromise(
        db(ROUND_TABLE).where(ROUND_COLUMNS.id, id).update(updateData)
    );

    if (err !== null) {
        return [null, dbError(err)];
    }

    return [updatedCount, null];
};
