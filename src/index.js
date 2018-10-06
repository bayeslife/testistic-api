import express from 'express'
import cors from 'cors'
import bodyparser from 'body-parser'
import morgan from 'morgan'
import routes from './route.js'

import Repository from 'testistic-repository'
import ProduceController from './controllers/ProduceController.js'
import TestisticController from './controllers/TestisticController.js'
import authenticationController from './controllers/AuthenticationController.js'
import Debug from 'debug'
const debug = Debug('testistic-repository')

var options = {
    kafkaUrl: process.env.KAFKASERVICE || '192.168.56.10:9092'
}
debug(`Creating repository with kafkaUrl:${options.kafkaUrl}`)
var repository = Repository.create(options)

var produceController = ProduceController.create(repository)
var testisticController = TestisticController.create(repository)

const app = express()
app.use(morgan('combined'))
app.use(bodyparser.json())
app.use(cors())

routes.setup(app, testisticController, authenticationController, produceController)

let port = process.env.PORT || 8081
debug('Listening:', port)
app.listen(port)

process.on('SIGTERM', () => {
    console.log('shut')
})
