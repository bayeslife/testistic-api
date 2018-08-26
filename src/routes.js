import Debug from 'debug'
const debug = Debug('testistic-repository')

let testisticController
let authenticationController

function createTestRun (req, res) {
  res.send(testisticController.createTestRun(req.body))
}

function validateTestRun (req, res, next) {
  var errors = testisticController.validateTestRun(req.body)
  // console.log(errors)
  if (!errors || errors.length === 0) {
   next()
  } else {
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

function setup (app, testistic/* controller */, authentication/* controller */) {
  testisticController = testistic
  authenticationController = authentication

  app.post('/projects', validateProject, createProject)
  app.get('/projects', async (req, res) => {
    let result = await testisticController.getProjects()
    res.send(result)
    }
  )

  app.post('/testinstances', validateTestRun, createTestRun)
  app.post('/testruns', validateTestRun, createTestRun)
  app.get('/testruns', async (req, res) => {
      let result = await testisticController.getTestRuns()
      res.send(result)
    }
  )

  app.post('/login', (req, res) => authenticationController.logIn(req, res))
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
