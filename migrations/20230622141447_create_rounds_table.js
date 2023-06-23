/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('rounds', function(t) {
        t.increments('id').unsigned().primary();
        t.integer('number').unsigned();
        t.timestamp("created_at").defaultTo(knex.fn.now());
        t.timestamp("updated_at").defaultTo(knex.fn.now());
        t.string('title');
        t.integer('race_to');
        t.integer('tournament_id').unsigned();
        t.foreign('tournament_id').references('tournaments.id')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('rounds');
};
