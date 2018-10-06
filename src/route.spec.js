import routes from '../src/routes.js'

import assert from 'assert'

function testsupport() {
  var s = {
    errors: false,
    res: {
      send: function () {
        s.errors = true
      }
    },
    next: () => {
      s.errors = false
    }
  }
  return s
}

describe('Given routes', function () {
  describe('When valid TestRun is validated', function () {
    var support = testsupport()
    var req = {
    }
    routes.setTestisticController({
      validateTestRun: function () {
        return []// no errors
      }
    })
    routes.validateTestRun(req, support.res, support.next)
    it('Then there are no errors', function () { 
        assert.ok(!support.errors)
    })
  })
  describe('When invalid TestRun is validated', function () {
    var support = testsupport()
    var req = {
    }
    routes.setTestisticController({
      validateTestRun: function () {
        return ['an error']
      }
    })
    routes.validateTestRun(req, support.res, support.next)
    it('Then there are errors', function () {    
        assert.ok(support.errors)
    })
  })
})
