import { iota } from '@core/generator'
import { FastArray } from '@core/algorithm'

export const genEntityId = iota()

export class Entity {
  id: number
  type: number
  init: boolean
  active: boolean

  constructor(type: number) {
    this.id = genEntityId()
    this.type = type
    this.init = false
    this.active = true
  }
}

export class EntityManager {
  bucketsMap: Map<number, Array<Entity>>
  bucketTypes: Array<number>
  entityToBuckets: Map<number, Array<FastArray<Entity>>>

  constructor() {
    this.bucketsMap = new Map()
    this.bucketTypes = []
    this.entityToBuckets = new Map()
  }

  // this method must be used when each system is being intialized
  // do not call this method after initalization.
  registerBucketType(type: number) {
    if (!this.bucketsMap.has(type)) {
      this.bucketsMap.set(type, [])
      this.bucketTypes.push(type)
    }
  }

  // everytime an entity is being created, this methid must be called
  add(entity: Entity) {
    if (!entity.init) {
      return
    }

    entity.init = true

    for (const bucketType of this.bucketTypes) {
      if ((entity.type & bucketType) === bucketType) {
        const buckets = this.bucketsMap.get(bucketType)

        buckets.push(entity)

        let bucketsRef = this.entityToBuckets.get(entity.id)
        if (!bucketsRef) {
          bucketsRef = []
          this.entityToBuckets.set(entity.id, bucketsRef)
        }

        bucketsRef.push(new FastArray(buckets))
      }
    }
  }

  remove(entity: Entity) {
    const bucketsRef = this.entityToBuckets.get(entity.id)
    if (!bucketsRef) {
      return
    }

    for (const buckets of bucketsRef) {
      buckets.remove(buckets.indexOf(entity))
    }

    entity.init = false
  }

  entities(type: number): Array<Entity> {
    const entities = this.bucketsMap.get(type)
    if (!entities) {
      throw new Error(`no entities found for type ${type}`)
    }

    return entities
  }
}
