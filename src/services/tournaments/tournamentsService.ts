import { dbError, handlePromise, messageError, ValueError } from '../../helpers';
import db from '../../lib/db-client';
import {
    TOURNAMENT_COLUMNS,
    TOURNAMENT_TABLE,
    TournamentInsertData,
    TournamentUpdateData
} from "../../models/tournament";
import {
    Match,
    MATCH_COLUMNS,
    MATCH_TABLE,
    Round,
    ROUND_COLUMNS,
    ROUND_TABLE,
    RoundInsertData,
    Tournament
} from "../../models";
import {createRound, createRoundAndReturnData} from "./roundService";
import * as _ from "underscore";
import {createMatchAndReturnData} from "./matchService";


export const createTournament = async (tournamentData: TournamentInsertData): Promise<ValueError<number>> => {
    const [createdCount, err] = await handlePromise(db('tournaments').insert(tournamentData));

    if (err !== null || !createdCount || createdCount?.length < 1) {
        return [null, dbError(err)];
    }

    return [createdCount[0], null];
};

type generateBracketType = Omit<TournamentInsertData & RoundInsertData & {
    'players': Array<number>
}, 'number'>

export const generateBracket = async (tournamentData: generateBracketType): Promise<ValueError<any>> => {
    const {race_to, tournament_id, num_of_players, players } = tournamentData

    // Generate bracket based on the max number of players
    const numberOfRounds = Math.log2(num_of_players);
    const rounds: Array<Round> = [];
    for(let i = 0; i < numberOfRounds; i++) {
        const [round, roundErr] = await createRoundAndReturnData({
            number: i + 1,
            title: getRoundName(i + 1, numberOfRounds),
            race_to: race_to,
            tournament_id: tournament_id
        });

        if (roundErr !== null || !round) {
            return [null, roundErr];
        }

        rounds.push(round);
    }
    rounds.sort((a, b) => a.number - b.number);

    let numberOfMatches = num_of_players;
    const matches: Array<Match> = []
    let matchNumber = 0;
    for(const round of rounds) {
        numberOfMatches = Math.floor(numberOfMatches / 2);

        if(round.number === 1) {
            const numberOfMissingPlayers = num_of_players - players.length;
            const allPlayers = [...players, ...Array(numberOfMissingPlayers).fill(null)]
            const halfLength = allPlayers.length / 2;
            const firstHalf = allPlayers.slice(0, halfLength);
            const secondHalf = allPlayers.slice(halfLength).reverse();

            for(const playerPair of _.zip(firstHalf, secondHalf)) {
                const [match, matchErr] = await createMatchAndReturnData({
                    status: '',
                    status_code: 0,
                    player_one_id: playerPair[0],
                    player_two_id: playerPair[1],
                    player_one_score: null,
                    player_two_score: null,
                    slot_one_reference_match: null,
                    slot_two_reference_match: null,
                    number: ++matchNumber,
                    round_id: round.id,
                });

                if (matchErr !== null || !match) {
                    return [null, matchErr];
                }

                matches.push(match);
            }
        } else {
            for (let i = 0; i < numberOfMatches; i++) {
                const [match, matchErr] = await createMatchAndReturnData({
                    status: '',
                    status_code: 0,
                    player_one_id: null,
                    player_two_id: null,
                    player_one_score: null,
                    player_two_score: null,
                    // @ts-ignore
                    slot_one_reference_match: matches.shift().number,
                    // @ts-ignore
                    slot_two_reference_match: matches.shift().number,
                    number: ++matchNumber,
                    round_id: round.id,
                });

                if (matchErr !== null || !match) {
                    return [null, matchErr];
                }

                matches.push(match);
            }
        }
    }

    return [tournament_id, null]
};

export const getTournamentDataById = async (id: number): Promise<ValueError<any>> => {
    const [tournamentData, err] = await handlePromise(db('tournaments')
        .select('tournaments.id as tournament_id',
            'tournaments.title as tournament_title',
            'tournaments.club_name as tournament_club_name',
            'tournaments.num_of_players as tournament_num_of_players',
            'tournaments.discipline as tournament_discipline',
            'tournaments.datetime as tournament_datetime',
            'tournaments.created_at as tournament_created_at',
            'tournaments.updated_at as tournament_updated_at',
            'r.id as round_id',
            'r.number as round_number',
            'r.title as round_title',
            'r.race_to as round_race_to',
            'r.tournament_id as round_tournament_id',
            'm.id as match_id',
            'm.number as match_number',
            'm.status as match_status',
            'm.status_code as match_status_code',
            'm.player_one_score as match_player_one_score',
            'm.player_two_score as match_player_two_score',
            'm.round_id as match_round_id',
            'm.player_one_id as match_player_one_id',
            'm.player_two_id as match_player_two_id',
            'm.slot_one_reference_match as match_slot_one_reference_match',
            'm.slot_two_reference_match as match_slot_two_reference_match',
            'u1.id as player_one_id',
            'u1.first_name as player_one_first_name',
            'u1.last_name as player_one_last_name',
            'u1.date_of_birth as player_one_date_of_birth',
            'u1.nationality as player_one_nationality',
            'u1.win_percentage as player_one_win_percentage',
            'u2.id as player_two_id',
            'u2.first_name as player_two_first_name',
            'u2.last_name as player_two_last_name',
            'u2.date_of_birth as player_two_date_of_birth',
            'u2.nationality as player_two_nationality',
            'u2.win_percentage as player_two_win_percentage',)
        .leftJoin('rounds as r', 'tournaments.id', 'r.tournament_id')
        .leftJoin('matches as m', 'r.id', 'm.round_id')
        .leftJoin('users as u1', 'm.player_one_id', 'u1.id')
        .leftJoin('users as u2', 'm.player_two_id', 'u2.id')
        .where('tournaments.id', id));

    if (err !== null) {
        return [null, dbError(err)];
    }
    if (!tournamentData) {
        return [null, messageError("Tournament doesn't exist")];
    }

    const [userData, userErr] = await handlePromise(db.select('u.id')
        .from('users as u')
        .join('matches as m', function () {
            this.on('u.id', '=', 'm.player_one_id').orOn('u.id', '=', 'm.player_two_id')
        })
        .join('rounds as r', 'm.round_id', 'r.id')
        .where('r.tournament_id', id)
        .distinct('u.*'));

    if (userErr !== null) {
        return [null, dbError(userErr)];
    }
    if (!userData) {
        return [null, messageError("Internal server error")];
    }

    return [{tournamentData, userData}, null];
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

export const getAllTournaments = async (): Promise<ValueError<Tournament[]>> => {
    const [tournaments, err] = await handlePromise(db('tournaments'));

    if (err !== null) {
        return [null, dbError(err)];
    }

    return [tournaments, null];
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

const getRoundName = (roundNum: number, maxRounds): string => {
    if (roundNum === maxRounds - 2) {
        return 'Quarter finals'
    } else if (roundNum === maxRounds - 1) {
        return 'Semi finals'
    } else if (roundNum === maxRounds) {
        return 'Finals'
    }

    return `Round ${roundNum}`
}