const express = require('express')

const server = express()
const routes = require('./routes/tasks')

server.use(express.json())
server.use(express.static('public'))
server.use('/todoList/', routes)

module.exports = server
