const express = require('express');
import cors from 'cors';
const jwt = require('jsonwebtoken');
const app = express();
const port = 8000;
const dotenv = require('dotenv');
const { getConnection } = require('./config/db');
import route from './routes';
import startCron from './cron';
startCron();
dotenv.config();

const { Server } = require('socket.io');
const handleSocket = require('./socket');
getConnection();
app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
const io = new Server(server, {
    allowEIO3: true,
    cors: {
        origin: true,
        methods: ['GET', 'POST'],
        credentials: true,
    },
});
route(app);

handleSocket(io);
