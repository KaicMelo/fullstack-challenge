import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('fc_users', table => {
        table.increments('id').primary();
        table.string('user').notNullable();
        table.string('password').notNullable();
        table.timestamp('created_at');
    });
}

export async function down(knex: Knex) {
    knex.schema.dropTable('fc_users');
}