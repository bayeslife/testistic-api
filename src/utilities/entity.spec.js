import entitytypeLogic from './entity.js'

import check from 'assert'

describe('Given ', function () {
  var tests = [
    {
      path: '/entity',
      entityType: 'entity'
    },
    {
      path: '/part1/part2',
      entityType: 'part1_part2'
    },
    {
      path: ' /part1/part2',
      entityType: 'part1_part2'
    }
  ]
  tests.forEach((test) => {
    describe('When ', function () {
      var entitytype
      beforeEach(() => {
        entitytype = entitytypeLogic.deriveType(test.path)
      })
      it(`Then ${test.path} is mapped to '${test.entityType} `, function () {
        check.strictEqual(test.entityType, entitytype)
      })
    })
  })
})
