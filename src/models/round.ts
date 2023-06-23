import db from '../lib/db-client';

export type Round = {
  id: number;
  title: string,
  race_to: number,
  tournament_id: number,
};

export const ROUND_TABLE = 'rounds';

export const ROUND_COLUMNS = {
  id: `${ROUND_TABLE}.id` as const,
  title: `${ROUND_TABLE}.title` as const,
  race_to: `${ROUND_TABLE}.race_to` as const,
  tournament_id: `${ROUND_TABLE}.tournament_id` as const,
  created_at: `${ROUND_TABLE}.created_at` as const,
  updated_at: `${ROUND_TABLE}.updated_at` as const,
};

export const ROUND_REFS = {
  id: () => db.ref('id').withSchema(ROUND_TABLE),
  title: () => db.ref('title').withSchema(ROUND_TABLE),
  race_to: () => db.ref('race_to').withSchema(ROUND_TABLE),
  num_of_players: () => db.ref('num_of_players').withSchema(ROUND_TABLE),
  datetime: () => db.ref('datetime').withSchema(ROUND_TABLE),
  discipline: () => db.ref('discipline').withSchema(ROUND_TABLE),
  created_at: () => db.ref('created_at').withSchema(ROUND_TABLE),
  updated_at: () => db.ref('updated_at').withSchema(ROUND_TABLE),
};

export type RoundInsertData = Omit<Round, 'id' | 'created_at' | 'updated_at'>;
export type RoundUpdateData = Partial<Omit<Round, 'id' | 'created_at' | 'updated_at'>>;
