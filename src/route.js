import entityLogic from './utilities/entity.js'
import Debug from 'debug'
const debug = Debug('testistic-api')

let testisticController
let authenticationController
let produceController

function validateTestRuns (req, res, next) {
  debug('Validate TestRuns')
  var errors = testisticController.validateTestRuns(req.body)
  if (!errors || errors.length === 0) {
   next()
  } else {
    debug('Validation errors not recording')
    debug(errors)
   res.send(errors)
  }
}

function createTestRuns (req, res) {
  debug('createTestRun')
  res.send(testisticController.createTestRuns(req.body))
}

function createTestRun (req, res) {
  debug('createTestRuns')
  res.send(testisticController.createTestRun(req.body))
}

function validateTestRun (req, res, next) {
  debug('Validate TestRuns')
  var errors = testisticController.validateTestRun(req.body)
  // console.log(errors)
  if (!errors || errors.length === 0) {
   next()
  } else {
    debug('Validation errors not recording')
    debug(errors)
   res.send(errors)
  }
}

async function createProject (req, res) {
  var newproject = await testisticController.createProject(req.body)
  debug('Created Project', newproject)
  res.send(newproject)
}

function validateProject (req, res, next) {
  var errors = testisticController.validateProject(req.body)
  // console.log(errors)
  if (!errors || errors.length === 0) {
   next()
  } else {
   res.send(errors)
  }
}

function setup (app, testistic/* controller */, authentication/* controller */, produce /* controller */) {
  testisticController = testistic
  authenticationController = authentication
  produceController = produce

  app.get('/health', async (req, res) => {
    let result = await testisticController.getHealth()
    res.send(result)
    }
  )

  app.post('/projects', validateProject, createProject)
  app.get('/projects', async (req, res) => {
    let result = await testisticController.getProjects()
    res.send(result)
    }
  )

  app.post('/testinstances', validateTestRun, createTestRun)
  app.post('/testruns', validateTestRuns, createTestRuns)
  app.post('/testrun', validateTestRun, createTestRun)
  app.get('/testruns', async (req, res) => {
      let result = await testisticController.getTestRuns()
      res.send(result)
    })
  app.get('/testruns/projects/:project', async (req, res) => {
    let result = await testisticController.getProjectTestRuns(req.params.project)
    res.send(result)
  })

  
  app.post('/login', (req, res) => authenticationController.logIn(req, res))

  app.get('/topics', async (req, res) => {
    let result = await produceController.getTopics()
    res.send(result)
  })

  // catch all
  app.post(/.*/, function (req, res) {
    if (!(req.headers['content-type'] === 'application/json')) {
      res.sendStatus(404)
    } else {
      var entityType = entityLogic.deriveType(req.path)
      debug(`${entityType}`)
      var entity = produceController.produce(entityType, req.body)
      res.send(entity)
    }
  })

  app.get(/.*/, async function (req, res) {
      var entityType = entityLogic.deriveType(req.path)
      debug(`${entityType}`)
      debug(`${JSON.stringify(req.query)}`)
      var entities = await produceController.get(entityType, req.query)
      res.send(entities)
  })
}

function setTestisticController (controller) {
  testisticController = controller
}
function setAuthenticationController (controller) {
  authenticationController = controller
}

export default {
  validateTestRun,
  createTestRun,
  validateProject,
  createProject,
  setup,
  setTestisticController,
  setAuthenticationController
}
