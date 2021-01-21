import { Request, Response } from 'express';
import auctionsModel from '../models/auctionsModel';

const AuctionsModel = new auctionsModel();

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

        const auctions =await AuctionsModel.store(auction);

        if (!auctions) {
            return res.status(400).json({ message: "Auction not found" });
        }

        return res.status(201).json({message:'Create successful' });
    }
    async update(req: Request, res: Response) {
        const { id } = req.params;

        const auction = req.body;

        const auctions = await AuctionsModel.update(id,auction);

        if (!auctions) {
            return res.status(400).json({ message: "Error" });
        }
        
        return res.json({message:'Update successful' });

    }
    async destroy(req: Request, res: Response) {
        const { id } = req.params;

        const auctions = await AuctionsModel.destroy(id);

        if (!auctions) {
            return res.status(400).json({ message: "Error" });
        }

        return res.send({message:'Delete successful' });
    }
}

export default auctionsController;