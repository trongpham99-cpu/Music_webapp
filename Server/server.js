const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const server = express()
server.use(cors());
server.use(bodyParser.json());

const exampleRouter = require('./routers/example.router');
const userRouter = require('./routers/user.router');

server.use("/api", exampleRouter);
server.use("/user",userRouter);




module.exports = server;
