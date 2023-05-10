import express from 'express';
import cors from 'cors';
require('dotenv').config();
import initRoutes from './src/routes';
import './db.js';

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to API Book App');
});

initRoutes(app);

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});