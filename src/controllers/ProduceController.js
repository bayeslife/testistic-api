import Debug from 'debug'
const debug = Debug('testistic-api')

function create (repository) {
  return {
    produce: async function (entitytype, entity) {
      debug(`Creating entity of type: ${entitytype}`)
      await repository.produce(entitytype, entity)
      return entity
    },
    get: async function (entitytype) {
      debug(`Get entities of type: ${entitytype}`)
      var results = await repository.get(entitytype, 20)
      debug(`Results: ${results.length}`)
      return results
    }
  }
}

export default { create }
