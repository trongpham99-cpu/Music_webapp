const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const createError = require('http-errors')
const server = express()
server.use(cors());
server.use(bodyParser.json());
server.use(express.json());

const exampleRouter = require('./routers/example.router');
const userRouter = require('./routers/user.router');
const audioRouter = require("./routers/audio.js");
const artistRouter = require("./routers/artist.js");
const typeAudioRouter = require("./routers/type-audio.js")
const itemRouter = require("./routers/item.router");

server.use("/user", userRouter);
server.use("/api", exampleRouter);
server.use("/audio", audioRouter);
server.use("/artist", artistRouter);
server.use("/type", typeAudioRouter);
server.use("/item", itemRouter)

server.use((req, res, next) => {
    next(createError.NotFound(`This route does not exits`))
})
server.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message
    })
})

module.exports = server;