import Router, { Request, Response, NextFunction } from 'express';

import AuthenticateController from './controllers/authenticateController';
import AuctionsController from './controllers/auctionsController';

import jwt from 'jsonwebtoken';

const routes = Router();

const authMiddleware = (req: Request, res: Response, next) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(400).json({ error: "Token invalid" });

    const parts = auth.split(' ');

    if (parts.length === 1) return res.status(401).json({ error: "No token provided" });

    if (parts.length !== 2) return res.status(401).json({ error: "Token error" });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: "Token malformed" });

    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        next();
    } catch (error) {
        return res.status(400).json({ error: "Token invalid" });
    }
}

const authenticateController = new AuthenticateController();
const auctionsController = new AuctionsController();

// AUTHENTICATE ROUTES
routes.get('/authenticate', authenticateController.index);

// AUCTIONS ROUTES
routes.get('/auctions', authMiddleware, auctionsController.index);
routes.get('/auctions/:id', authMiddleware, auctionsController.show);
routes.post('/auctions', authMiddleware, auctionsController.store);
routes.put('/auctions/:id', authMiddleware, auctionsController.update);
routes.delete('/auctions/:id', authMiddleware, auctionsController.destroy);

export default routes;