import { iota } from '@core/generator'
import { Matcher, AtLeastMatcher, ExactMatcher } from './matcher'
import { instance } from '@core/di'

import { Buckets } from './buckets'

const genEntityId = iota()

export class Entity {
  meta: {
    id: number
    type: number
    live: boolean
  }

  constructor(type: number) {
    this.meta = {
      id: genEntityId(),
      type: type,
      live: false
    }
  }

  clean() {}
}

export class EntityPool {
  exactMatchBuckets: Buckets<number, Entity>
  atLeastMatchBuckets: Buckets<number, Entity>

  // key: entity.id -> [bucket.type, ...]
  entityExactBuckets: Map<number, Array<number>>
  entityAtLeastBuckets: Map<number, Array<number>>

  constructor() {
    this.entityExactBuckets = new Map()
    this.entityAtLeastBuckets = new Map()

    this.exactMatchBuckets = new Buckets()
    this.atLeastMatchBuckets = new Buckets()
  }

  // this method must be used when each system is being intialized
  // do not call this method after initalization.
  // NOTE: This Method will be called automatically
  createBucket(matcher: Matcher) {
    const match = matcher.Match()

    if (matcher instanceof ExactMatcher) {
      this.exactMatchBuckets.create(match)
    } else if (matcher instanceof AtLeastMatcher) {
      this.atLeastMatchBuckets.create(match)
    } else {
      throw new Error(`unknown matcher`)
    }
  }

  // everytime an entity is being created, this methid must be called
  add(entity: Entity) {
    const meta = entity.meta

    if (meta.live) {
      throw new Error('entity already in system')
    }

    meta.live = true

    // we need to store bucket refs based on entity's id
    let entityExactBuckets = this.entityExactBuckets.get(entity.meta.id)
    if (!entityExactBuckets) {
      entityExactBuckets = []
      this.entityExactBuckets.set(entity.meta.id, entityExactBuckets)
    }

    let entityAtLeastBuckets = this.entityAtLeastBuckets.get(entity.meta.id)
    if (!entityAtLeastBuckets) {
      entityAtLeastBuckets = []
      this.entityAtLeastBuckets.set(entity.meta.id, entityAtLeastBuckets)
    }

    for (const bucketType of this.exactMatchBuckets.keys()) {
      if ((bucketType & meta.type) === meta.type) {
        this.exactMatchBuckets.bucket(bucketType).push(entity)
        entityExactBuckets.push(bucketType)
        break
      }
    }

    for (const bucketType of this.atLeastMatchBuckets.keys()) {
      if ((bucketType & meta.type) === bucketType) {
        this.atLeastMatchBuckets.bucket(bucketType).push(entity)
        entityAtLeastBuckets.push(bucketType)
      }
    }
  }

  remove(entity: Entity) {
    const meta = entity.meta

    let bucketTypes = this.entityExactBuckets.get(meta.id)

    for (const bucketType of bucketTypes) {
      this.exactMatchBuckets.remove(bucketType, entity)
    }

    bucketTypes = this.entityAtLeastBuckets.get(meta.id)

    for (const bucketType of bucketTypes) {
      this.atLeastMatchBuckets.remove(bucketType, entity)
    }
  }

  find<T extends Entity>(matcher: Matcher): Array<T> {
    const match = matcher.Match()

    let entities: Array<Entity>

    if (matcher instanceof ExactMatcher) {
      entities = this.exactMatchBuckets.bucket(match)
    } else if (matcher instanceof AtLeastMatcher) {
      entities = this.atLeastMatchBuckets.bucket(match)
    } else {
      throw new Error(`unknown matcher`)
    }

    return entities as Array<T>
  }

  clean() {
    const uniqueEntities = new Set<Entity>()

    for (const entities of this.exactMatchBuckets.values()) {
      for (const entity of entities) {
        uniqueEntities.add(entity)
      }
    }

    for (const entities of this.atLeastMatchBuckets.values()) {
      for (const entity of entities) {
        uniqueEntities.add(entity)
      }
    }

    for (const entity of uniqueEntities) {
      entity.clean()
    }

    this.entityExactBuckets.clear()
  }
}
