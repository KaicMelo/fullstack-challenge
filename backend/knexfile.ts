import path from 'path';
import {config} from 'dotenv';
config();

module.exports = {
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USERNAME,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE,
    },
    migrations:{
        directory:path.resolve(__dirname,'src','database','migrations') 
    },
    seeds:{
        directory:path.resolve(__dirname,'src','database','seeds') 
    },
    useNullAsDefault: true,
}