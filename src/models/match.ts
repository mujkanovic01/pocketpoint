import db from '../lib/db-client';

export type Match = {
  id: number;
  number: number,
  status: string,
  status_code: number,
  player_one_score: number | null,
  player_two_score: number | null,
  round_id: number,
  player_one_id: number | null,
  player_two_id: number | null,
  slot_one_reference_match: number | null,
  slot_two_reference_match: number | null,
  created_at: Date;
  updated_at: Date;
};

export const MATCH_TABLE = 'matches';

export const MATCH_COLUMNS = {
  id: `${MATCH_TABLE}.id` as const,
  number: `${MATCH_TABLE}.number` as const,
  status: `${MATCH_TABLE}.status` as const,
  status_code: `${MATCH_TABLE}.status_code` as const,
  player_one_score: `${MATCH_TABLE}.player_one_score` as const,
  player_two_score: `${MATCH_TABLE}.player_two_score` as const,
  round_id: `${MATCH_TABLE}.round_id` as const,
  player_one_id: `${MATCH_TABLE}.player_one_id` as const,
  player_two_id: `${MATCH_TABLE}.player_two_id` as const,
  slot_one_reference_match: `${MATCH_TABLE}.slot_one_reference_match` as const,
  slot_two_reference_match: `${MATCH_TABLE}.slot_two_reference_match` as const,
  created_at: `${MATCH_TABLE}.created_at` as const,
  updated_at: `${MATCH_TABLE}.updated_at` as const,
};

export const MATCH_REFS = {
  id: () => db.ref('id').withSchema(MATCH_TABLE),
  number: () => db.ref('number').withSchema(MATCH_TABLE),
  status: () => db.ref('status').withSchema(MATCH_TABLE),
status_code: () => db.ref('status_code').withSchema(MATCH_TABLE),
  player_one_score: () => db.ref('player_one_score').withSchema(MATCH_TABLE),
  player_two_score: () => db.ref('player_two_score').withSchema(MATCH_TABLE),
  round_id: () => db.ref('round_id').withSchema(MATCH_TABLE),
  player_one_id: () => db.ref('player_one_id').withSchema(MATCH_TABLE),
  player_two_id: () => db.ref('player_two_id').withSchema(MATCH_TABLE),
  slot_one_reference_match: () => db.ref('slot_one_reference_match').withSchema(MATCH_TABLE),
  slot_two_reference_match: () => db.ref('slot_two_reference_match').withSchema(MATCH_TABLE),
  created_at: () => db.ref('created_at').withSchema(MATCH_TABLE),
  updated_at: () => db.ref('updated_at').withSchema(MATCH_TABLE),
};

export type MatchInsertData = Omit<Match, 'id' | 'created_at' | 'updated_at'>;
export type MatchUpdateData = Partial<Omit<Match, 'round_id' | 'player_one_id' | 'player_two_id' | 'slot_one_reference_match' | 'slot_two_reference_match'| 'created_at' | 'updated_at'>>;
