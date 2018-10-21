import Debug from 'debug'
const debug = Debug('testistic-api')

function create (repository) {
  return {
    produce: async function (entitytype, entity) {
      debug(`Creating entity of type: ${entitytype}`)
      await repository.produce(entitytype, entity)
      return entity
    },
    get: async function (entitytype, options) {
      debug(`Get entities of type: ${entitytype}`)
      if (!options) options={}
      var count = options.count || 20
      var start = options.start || 0
      var results = await repository.get(entitytype, count, start )
      debug(`Results: ${results ? results.length : null}`)
      return results ? results : []
    },
    getTopics: async function (options) {
      debug(`GetTopics`)
      if (!options) options={}
      var count = options.count || 20
      var start = options.start || 0
      var results = await repository.getTopics()
      debug(`Results: ${results.length}`)
      return results
    }
  }
}

export default { create }
