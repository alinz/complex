export class Buckets<K, V> {
  containers: Map<K, Array<V>>

  constructor() {
    this.containers = new Map()
  }

  create(key: K) {
    if (!this.containers.has(key)) {
      this.containers.set(key, [])
    }
  }

  bucket(key: K): Array<V> {
    const bucket = this.containers.get(key)
    if (!bucket) {
      throw new Error(`bucket ${key} not found`)
    }

    return bucket
  }

  add(key: K, value: V) {
    this.bucket(key).push(value)
  }

  remove(key: K, value: V) {
    const bucket = this.bucket(key)
    const idx = bucket.indexOf(value)
    if (idx !== -1) {
      bucket.splice(idx, 1)
    }
  }

  values(): IterableIterator<Array<V>> {
    return this.containers.values()
  }

  keys(): IterableIterator<K> {
    return this.containers.keys()
  }
}
