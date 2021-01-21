import knex from '../database/connection';

class usersModel {

    myUser(login: string){
        return knex('fc_users').select('*').where('user',login).first();
    }
}

export default usersModel;