import { iota } from '@core/generator'
import { FastArray } from '@core/algorithm'

const genEntityId = iota()

export class Entity {
  meta: {
    id: number
    type: number
    active: boolean
  }

  constructor(type: number) {
    this.meta = {
      id: genEntityId(),
      type: type,
      active: true
    }
  }

  clean() {}
}

export class EntityPool {
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
  // NOTE: This Method will be called automatically
  addBucket(type: number) {
    if (!this.bucketsMap.has(type)) {
      this.bucketsMap.set(type, [])
      this.bucketTypes.push(type)
    }
  }

  // everytime an entity is being created, this methid must be called
  add(entity: Entity) {
    const meta = entity.meta
    for (const bucketType of this.bucketTypes) {
      if ((meta.type & bucketType) === bucketType) {
        const buckets = this.bucketsMap.get(bucketType)

        buckets.push(entity)

        let bucketsRef = this.entityToBuckets.get(meta.id)
        if (!bucketsRef) {
          bucketsRef = []
          this.entityToBuckets.set(meta.id, bucketsRef)
        }

        bucketsRef.push(new FastArray(buckets))
      }
    }
  }

  remove(entity: Entity) {
    const { meta } = entity
    const bucketsRef = this.entityToBuckets.get(meta.id)
    if (!bucketsRef) {
      return
    }

    for (const buckets of bucketsRef) {
      buckets.remove(buckets.indexOf(entity))
    }
  }

  find<T extends Entity>(type: number): Array<T> {
    const entities = this.bucketsMap.get(type)
    if (!entities) {
      throw new Error(`no entities found for type ${type}`)
    }

    return entities as Array<T>
  }

  clean() {
    const uniqueEntities = new Set<Entity>()
    for (const entities of this.bucketsMap.values()) {
      for (const entity of entities) {
        uniqueEntities.add(entity)
      }
    }

    for (const entity of uniqueEntities) {
      entity.clean()
    }

    this.bucketsMap.clear()
    this.bucketTypes = []
    this.entityToBuckets.clear()
  }
}
