import Testistic from 'testistic-model'

import pkg from '../../package.json'

import Debug from 'debug'
const debug = Debug('testistic-api')

function create (repository) {
  return {
    getHealth: function (epic) {
      return {
        version: pkg.version,
        name: pkg.name
      }
    },
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
      debug('createTestRun')
      var testrun = Testistic.TestRun.createFrom(testinstance)
      await repository.produceTestRun(testrun)
      debug('Created testrun into repository', testrun)
      return testrun
    },
    createTestRuns: async function (testinstances) {
      debug('createTestRuns')
      return testinstances.map((testinstance)=>this.createTestRun(testinstance))
    },
    validateTestRun: function (body) {
      return Testistic.TestRun.validate([body])
    },
    validateTestRuns: function (body) {
      return Testistic.TestRun.validate(body)
    },
    getTestRuns: async function (epic) {
      let testruns = await repository.getTestRuns()
      return testruns
    },
    getProjectTestRuns: async function (project) {
      let testruns = await repository.getProjectTestRuns(project)
      return testruns
    }
  }
}

export default { create }
