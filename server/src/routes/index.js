const express = require('express');
const authRouter = require('./auth');
const userRouter = require('./user');
const followRouter = require('./follower');
const chatroomRouter = require('./chatroom');
function route(app) {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/user', userRouter);
    app.use('/api/v1/follow', followRouter);
    app.use('/api/v1/chatroom', chatroomRouter);
}
export default route;
