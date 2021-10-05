const express = require("express");
const carsRouter = require('./cars/cars-router');
const { errorHandling } = require('./cars/cars-middleware');

const server = express()

// DO YOUR MAGIC

server.use(express.json())

server.use('/api/cars', carsRouter)

server.use(errorHandling)


module.exports = server
