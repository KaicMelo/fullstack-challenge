import express from 'express'
import routes from './routes'
import cors from 'cors';
import expressValidator from 'express-validator';
import expressSession from 'express-session';

const app = express();

app.use(express.json());
app.use(expressValidator());
app.use(cors({origin: '*'}))
app.use(expressSession({
    secret: 'max',
    saveUninitialized: false,
    resave: false,
}));

app.use(routes);

export default app;