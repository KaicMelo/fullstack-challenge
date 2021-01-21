import knex from '../database/connection';

class auctionsModel {

    async index() {
        return knex('fc_auctions').select('*');
    }
    async show(id) {
        return knex('fc_auctions').where('id', id).first();
    }
   async store(auction){ 
        return knex('fc_auctions').insert(auction); 
    }
   async update(id,auction){
        return knex('fc_auctions').where('id', id).update(auction);
    }
   async destroy(id){
        return knex('fc_auctions').where('id', id).delete();
    }
}

export default auctionsModel;