import { Request, Response } from 'express';
import auctionsModel from '../models/auctionsModel';
// import expressValidator from 'express-validator'
const AuctionsModel = new auctionsModel();

interface createAuction {
    name: string,
    initial_value: number,
    responsible: string,
    used: boolean,
    start_date: string,
    end_date: string
}

function noEmpty(req: Request){

    req.check('name', 'name is required').notEmpty();
    req.check('initial_value', 'initial_value is required').notEmpty();
    req.check('responsible', 'responsible is required').notEmpty();
    req.check('used', 'use is required').notEmpty();
    req.check('start_date', 'start date is required').notEmpty();
    req.check('end_date', 'end date is required').notEmpty();

    return req.validationErrors();
}

class auctionsController {

    async index(req: Request, res: Response) {
        const auctions = await AuctionsModel.index();

        if (!auctions) {
            return res.status(400).json({ message: "Auction not found" });
        }

        return res.json({
            auctions
        });
    }
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const auctions = await AuctionsModel.show(id);

        if (!auctions) {
            return res.status(400).json({ message: "Auction not found" });
        }

        return res.json({
            auctions
        });
    }
    async store(req: Request, res: Response) {
        const auction = req.body;

        const erros = noEmpty(req);

        if (erros) {
            return res.status(401).json({ message: erros });
        }

        const auctions = await AuctionsModel.store(auction);

        if (!auctions) {
            return res.status(400).json({ message: "Auction not found" });
        }

        return res.status(201).json({ message: 'Create successful',id:auctions[0] });
    }
    async update(req: Request, res: Response) {
        const { id } = req.params;

        const auction = req.body;

        const erros = noEmpty(req);

        if (erros) {
            return res.status(401).json({ message: erros });
        }

        const auctions = await AuctionsModel.update(id, auction);

        if (!auctions) {
            return res.status(400).json({ message: "Error" });
        }

        return res.json({ message: 'Update successful' });

    }
    async destroy(req: Request, res: Response) {
        const { id } = req.params;

        const auctions = await AuctionsModel.destroy(id);

        if (!auctions) {
            return res.status(400).json({ message: "Error" });
        }

        return res.send({ message: 'Delete successful' });
    }
}

export default auctionsController;