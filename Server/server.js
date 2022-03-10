const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const server = express()
server.use(cors());
server.use(bodyParser.json());

const exampleRouter = require('./routers/example.router');

server.use("/api", exampleRouter);

module.exports = server;
