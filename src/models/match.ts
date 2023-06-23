import db from '../lib/db-client';


export type Match = {
  id: number;
  status: string,
  status_code: number,
  player_one_score: number,
  player_two_score: number,
  round_id: number,
  player_one_id: number,
  player_two_id: number,
  created_at: Date;
  updated_at: Date;
};

export const MATCH_TABLE = 'tournaments';

export const MATCH_COLUMNS = {
  id: `${MATCH_TABLE}.id` as const,
  status: `${MATCH_TABLE}.status` as const,
  status_code: `${MATCH_TABLE}.status_code` as const,
  player_one_score: `${MATCH_TABLE}.player_one_score` as const,
  player_two_score: `${MATCH_TABLE}.player_two_score` as const,
  round_id: `${MATCH_TABLE}.round_id` as const,
  player_one_id: `${MATCH_TABLE}.player_one_id` as const,
  player_two_id: `${MATCH_TABLE}.player_two_id` as const,
  created_at: `${MATCH_TABLE}.created_at` as const,
  updated_at: `${MATCH_TABLE}.updated_at` as const,
};

export const MATCH_REFS = {
  id: () => db.ref('id').withSchema(MATCH_TABLE),
  status: () => db.ref('status').withSchema(MATCH_TABLE),
  status_code: () => db.ref('status_code').withSchema(MATCH_TABLE),
  player_one_score: () => db.ref('player_one_score').withSchema(MATCH_TABLE),
  player_two_score: () => db.ref('player_two_score').withSchema(MATCH_TABLE),
  round_id: () => db.ref('round_id').withSchema(MATCH_TABLE),
  player_one_id: () => db.ref('player_one_id').withSchema(MATCH_TABLE),
  player_two_id: () => db.ref('player_two_id').withSchema(MATCH_TABLE),
  created_at: () => db.ref('created_at').withSchema(MATCH_TABLE),
  updated_at: () => db.ref('updated_at').withSchema(MATCH_TABLE),
};

export type MatchInsertData = Omit<Match, 'id' | 'created_at' | 'updated_at'>;
export type MatchUpdateData = Partial<Omit<Match, 'id' | 'created_at' | 'updated_at'>>;
