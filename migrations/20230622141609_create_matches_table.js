/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('matches', function(t) {
        t.increments('id').unsigned().primary();
        t.timestamp("created_at").defaultTo(knex.fn.now());
        t.timestamp("updated_at").defaultTo(knex.fn.now());
        t.string('status');
        t.integer('status_code');
        t.integer('player_one_score');
        t.integer('player_two_score');
        t.integer('round_id').unsigned();
        t.foreign('round_id').references('rounds.id')
        t.integer('player_one_id').unsigned();
        t.foreign('player_one_id').references('users.id')
        t.integer('player_two_id').unsigned();
        t.foreign('player_two_id').references('users.id')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('matches');
};
