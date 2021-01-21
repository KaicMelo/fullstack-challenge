import knex from '../database/connection';

class auctionsModel {

    async index() {
        return knex('fc_auctions').select('*');
    }
    async show(id: number) {
        return knex('fc_auctions').where('id', id).first();
    }
   async store(auction: object){ 
        return knex('fc_auctions').insert(auction); 
    }
   async update(id:number,auction: object){
        return knex('fc_auctions').where('id', id).update(auction);
    }
   async destroy(id:number){
        return knex('fc_auctions').where('id', id).delete();
    }
}

export default auctionsModel;