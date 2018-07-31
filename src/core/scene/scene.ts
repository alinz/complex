import { System, EntityPool } from '@core/ecs'

export class Scene {
  systemsMap: Map<{ new (): System }, System>
  entityPool: EntityPool
  isInit: boolean

  constructor() {
    this.systemsMap = new Map()
    this.entityPool = new EntityPool()
    this.isInit = false
  }

  addSystem(SystemClass: { new (): System }) {
    if (this.systemsMap.has(SystemClass)) {
      throw new Error(`system ${SystemClass.name} already added`)
    }

    const instance = new SystemClass()

    for (const bucket of instance.componentTypes()) {
      this.entityPool.addBucket(bucket)
    }

    this.systemsMap.set(SystemClass, instance)
  }

  init() {
    if (this.isInit) {
      return
    }

    this.isInit = true

    const systems = this.systemsMap.values()
    for (const system of systems) {
      system.init(this.entityPool)
    }
  }

  fixedUpdate(delta: number) {
    const systems = this.systemsMap.values()
    for (const system of systems) {
      system.fixedUpdate(delta, this.entityPool)
    }
  }

  lateUpdate(interpolation: number) {
    const systems = this.systemsMap.values()
    for (const system of systems) {
      system.lateUpdate(interpolation, this.entityPool)
    }
  }

  start() {
    const systems = this.systemsMap.values()
    for (const system of systems) {
      system.start()
    }
  }

  stop() {
    const systems = this.systemsMap.values()
    for (const system of systems) {
      system.stop()
    }
  }

  clean() {
    if (!this.isInit) {
      return
    }

    this.isInit = false

    const systems = this.systemsMap.values()
    for (const system of systems) {
      system.clean()
    }

    this.systemsMap.clear()
    this.entityPool.clean()
  }
}
