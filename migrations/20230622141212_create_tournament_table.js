/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tournaments', function(t) {
        t.increments('id').unsigned().primary();
        t.timestamp("created_at").defaultTo(knex.fn.now());
        t.timestamp("updated_at").defaultTo(knex.fn.now());
        t.string('title');
        t.string('club_name');
        t.string('discipline');
        t.string('status');
        t.integer('num_of_players');
        t.datetime('datetime');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('tournaments');
};
