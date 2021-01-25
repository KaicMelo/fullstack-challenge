import Knex from 'knex';
import crypto from  'crypto';

export async function seed(knex: Knex) {
    await knex("fc_users").insert([
        {
            user: 'filipe.souza',
            password: crypto.createHash("md5").update('filipe.souza').digest('hex'),
        },
        {
            user: 'gustavo.maranho',
            password: crypto.createHash("md5").update('gustavo.maranho').digest('hex'),
        },
        {
            user: 'flavio.scorrea',
            password: crypto.createHash("md5").update('flavio.scorrea').digest('hex'),
        },
        {
            user: 'kaic.melo',
            password: crypto.createHash("md5").update('kaic.melo').digest('hex'),
        },
        {
            user: '@user',
            password: crypto.createHash("md5").update('@user').digest('hex'),
        }
    ]);
}