import Debug from 'debug'
const debug = Debug('testistic-api')

function deriveType (path) {
    var entityType = path

    entityType = path.replace(/\//g, ' ').trim().replace(/ /g, '_')

    debug(`Derived entityType:${entityType} from: ${path}`)
    return entityType
}

export default { deriveType }
