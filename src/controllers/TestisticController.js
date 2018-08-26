import Repository from 'testistic-repository'
import Testistic from 'testistic-base'

import Debug from 'debug'
const debug = Debug('testistic-api')

function create (options) {
  var repository = Repository.create(options.kafkaHost)
  debug('Repo', repository)
  return {
    createProject: async function (project) {
      debug('Creating project', project)
      var newproject = Testistic.Project.createFrom(project)
      await repository.produceProject(newproject)
      return newproject
    },
    validateProject: function (project) {
      debug('Validating project', project)
      return Testistic.Project.validate(project)
    },
    getProjects: async function (epic) {
      let projects = await repository.getProjects()
      return projects
    },

    createTestRun: async function (testinstance) {
      var testrun = Testistic.TestRun.createFrom(testinstance)
      await repository.produceTestRun(testrun)
      debug('Created testrun into repository', testrun)
      return testrun
    },
    validateTestRun: function (body) {
      return Testistic.TestRun.validate(body)
    },
    getTestRuns: async function (epic) {
      let testruns = await repository.getTestRuns()
      return testruns
    }
  }
}

export default { create }
