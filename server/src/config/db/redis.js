import { createClient } from 'redis';
const dotenv = require('dotenv');
dotenv.config();
const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-12238.c263.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 12238,
    },
});

client.on('error', (err) => {
    console.error('Redis Client Error', err);
});
client
    .connect()
    .then(() => {
        console.log('Connected to redis');
        return client.ping();
    })
    .then((pong) => {
        console.log('Redis ping response:', pong);
    })
    .catch((err) => {
        console.error('Error connecting to Redis:', err);
    });
export default client;
