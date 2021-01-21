import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { config } from 'dotenv';
config();

//IMPORT MODEL
import UsersModel from "../models/usersModel";
const usersModel = new UsersModel();

function generateToken(params = {}) {
    return jwt.sign(params, <string>process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 });
}

class authenticateController {

    async index(req: Request, res: Response) {
        if (req.headers.authorization === undefined) return;
        const [hashType, hash] = req.headers.authorization.split(' ');
        const [login, password] = Buffer.from(hash, 'base64').toString().split(':');

        const passwordMd5 = crypto.createHash("md5").update(password).digest('hex')

        const users = await usersModel.myUser(login);

        if (!users) {
            return res.status(400).json({ error: "User not found" });
        }

        if (users.password !== passwordMd5) {
            return res.status(401).json({ error: "invalid password" });
        }
        users.password = undefined;

        return res.json({
            users,
            token: generateToken({ id: users.id })
        });
    }
}

export default authenticateController;