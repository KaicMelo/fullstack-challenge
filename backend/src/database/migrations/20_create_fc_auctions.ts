import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('fc_auctions', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('initial_value').notNullable();
        table.string('responsible').notNullable();
        table.boolean('used').notNullable();
        table.date('start_date').notNullable();
        table.date('end_date').notNullable();
        table.timestamp('created_at');
    });
}

export async function down(knex: Knex) {
    knex.schema.dropTable('fc_auctions');
}