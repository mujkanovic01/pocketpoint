import db from '../lib/db-client';

export type Tournament = {
  id: number;
  title: string,
  club_name: string,
  num_of_players: string,
  discipline: string,
  datetime: Date,
  created_at: Date;
  updated_at: Date;
};

export const TOURNAMENT_TABLE = 'tournaments';

export const TOURNAMENT_COLUMNS = {
  id: `${TOURNAMENT_TABLE}.id` as const,
  title: `${TOURNAMENT_TABLE}.title` as const,
  club_name: `${TOURNAMENT_TABLE}.club_name` as const,
  num_of_players: `${TOURNAMENT_TABLE}.num_of_players` as const,
  datetime: `${TOURNAMENT_TABLE}.datetime` as const,
  discipline: `${TOURNAMENT_TABLE}.discipline` as const,
  created_at: `${TOURNAMENT_TABLE}.created_at` as const,
  updated_at: `${TOURNAMENT_TABLE}.updated_at` as const,
};
2
export const TOURNAMENT_REFS = {
  id: () => db.ref('id').withSchema(TOURNAMENT_TABLE),
  title: () => db.ref('title').withSchema(TOURNAMENT_TABLE),
  club_name: () => db.ref('club_name').withSchema(TOURNAMENT_TABLE),
  num_of_players: () => db.ref('num_of_players').withSchema(TOURNAMENT_TABLE),
  datetime: () => db.ref('datetime').withSchema(TOURNAMENT_TABLE),
  discipline: () => db.ref('discipline').withSchema(TOURNAMENT_TABLE),
  created_at: () => db.ref('created_at').withSchema(TOURNAMENT_TABLE),
  updated_at: () => db.ref('updated_at').withSchema(TOURNAMENT_TABLE),
};

export type TournamentInsertData = Omit<Tournament, 'id' | 'created_at' | 'updated_at'>;
export type TournamentUpdateData = Partial<Omit<Tournament, 'id' | 'created_at' | 'updated_at'>>;
