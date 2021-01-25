import axios from "axios";
const btoa_module = require('btoa')
import { config } from 'dotenv';
config();

const base_url = "http://localhost:3001/";

let token = "";
let id_created = "";

describe('Authenticate Method', () => {
    test('should login and save the token', async () => {

        var authorizationBasic = btoa_module(process.env.USER_TEST + ':' + process.env.PASSWORD_TEST);

        var configLogin = {
            "headers": {
                "Authorization": "Basic " + authorizationBasic
            }
        };

        await axios.get(base_url + 'authenticate', configLogin).then(res => {
            token = res.data.token;
            expect(res.status).toEqual(200)
        });
    });
});

describe('CRUD Methods', () => {
    test('should create a new auction', async () => {

        var config = {
            "headers": {
                "Authorization": "Bearer " + token
            }
        };
        const data = {
            "name": "Leilão para teste",
            "initial_value": '1.200,00',
            "used": 0,
            "responsible": 'Kaic Melo Santos',
            "start_date": '2021-01-24',
            "end_date": '2021-01-26',
        }

        await axios.post(base_url + 'auctions', data, config).then(res => {
            id_created = res.data.id;
            expect(res.status).toEqual(201)
        });
    });
    test('should return json with all auction', async () => {

        var config = {
            "headers": {
                "Authorization": "Bearer " + token
            }
        };

        await axios.get(base_url + 'auctions', config).then(res => {
            expect(res.status).toEqual(200)
        });
    });
    test('should return json with last created auction', async () => {

        var config = {
            "headers": {
                "Authorization": "Bearer " + token
            }
        };

        await axios.get(base_url + 'auctions/' + id_created, config).then(res => {
            console.log(res);
            expect(res.status).toEqual(200)
        });
    });
    test('should update last created auction', async () => {

        var config = {
            "headers": {
                "Authorization": "Bearer " + token
            }
        };

        const data = {
            "name": "Leilão para Atualizado",
            "initial_value": '900,99',
            "used": 1,
            "responsible": 'Kaic Santos',
            "start_date": '2021-01-20',
            "end_date": '2021-01-30',
        }

        await axios.put(base_url + 'auctions/'+id_created, data, config).then(res => {
            expect(res.status).toEqual(200)
        });
    });
    test('should delete last created auction', async () => {

        var config = {
            "headers": {
                "Authorization": "Bearer " + token
            }
        };
        
        await axios.delete(base_url + 'auctions/'+id_created, config).then(res => {
            expect(res.status).toEqual(200)
        });
    });
});