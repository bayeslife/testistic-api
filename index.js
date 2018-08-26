import express from 'express'
import cors from 'cors'
import bodyparser from 'body-parser'
import morgan from 'morgan'
import routes from './routes.js'

import TestisticController from './controllers/TestisticController.js'
import authenticationController from './controllers/AuthenticationController.js'
import Debug from 'debug'
const debug = Debug('testistic-repository')

var testisticController = TestisticController.create({
    kafkaHost: process.env.KAFKA_HOST + ':9092' || '192.168.56.10:9092'
})

const app = express()
app.use(morgan('combined'))
app.use(bodyparser.json())
app.use(cors())

routes.setup(app, testisticController, authenticationController)

let port = process.env.PORT || 8081
debug('Listening:', port)
app.listen(port)

process.on('SIGTERM', () => {
    console.log('shut')
})
