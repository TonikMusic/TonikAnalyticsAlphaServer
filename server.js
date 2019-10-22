const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected To Database');
}).catch((err) => {
    console.log(err)
    return err;
})

server.listen(process.env.PORT, () => {
    console.log(`Server Listening on ${process.env.PORT}`)
});