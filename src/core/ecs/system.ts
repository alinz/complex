import { getTime } from '@core/time'

export interface System {
  init(): void
  start(): void
  fixedUpdate(delta: number): void
  lateUpdate(interpolation: number): void
  stop(): void
  cleanup(): void
}

class SystemInfo {
  system: System
  isActive: boolean

  constructor(system: System) {
    this.system = system
    this.isActive = false
  }
}

export class SystemManger {
  systems: Array<SystemInfo>
  systemsMap: Map<{ new (...args: any[]): System }, SystemInfo>
  isRunning: boolean
  frameTime: number
  frameRate: number

  constructor(frameRate: number) {
    this.systems = []
    this.systemsMap = new Map()

    this.isRunning = false
    this.frameRate = frameRate * 1.0
    this.frameTime = 1.0 / this.frameRate
  }

  add<T extends System>(SystemClass: { new (...args: any[]): T }, instance: T): SystemManger {
    if (this.systemsMap.has(SystemClass)) {
      throw new Error(`System ${SystemClass.name} already exists`)
    }

    const systemInfo = new SystemInfo(instance)

    instance.init()
    this.systemsMap.set(SystemClass, systemInfo)
    this.systems.push(systemInfo)

    return this
  }

  remove<T extends System>(SystemClass: { new (...args: any[]): T }) {
    const systemInfo = this.systemsMap.get(SystemClass)
    if (!systemInfo) {
      throw new Error(`System ${SystemClass.name} not found`)
    }

    if (systemInfo.isActive) {
      systemInfo.isActive = false
      systemInfo.system.stop()
    }
    systemInfo.system.cleanup()

    this.systemsMap.delete(SystemClass)
    this.systems = this.systems.filter(info => info !== systemInfo)
  }

  stopSystem<T extends System>(SystemClass: { new (...args: any[]): T }) {
    const systemInfo = this.systemsMap.get(SystemClass)
    if (!systemInfo) {
      throw new Error(`System ${SystemClass.name} not found`)
    }

    if (systemInfo.isActive) {
      systemInfo.isActive = false
      systemInfo.system.stop()
    }
  }

  startSystem<T extends System>(SystemClass: { new (...args: any[]): T }) {
    const systemInfo = this.systemsMap.get(SystemClass)
    if (!systemInfo) {
      throw new Error(`System ${SystemClass.name} not found`)
    }

    if (!systemInfo.isActive) {
      systemInfo.isActive = false
      systemInfo.system.start()
    }
  }

  startAllSystems() {
    this.systems.forEach(info => {
      if (!info.isActive) {
        info.isActive = true
        info.system.start()
      }
    })
  }

  fixedUpdate(delta: number) {
    this.systems.forEach(info => {
      if (info.isActive) {
        info.system.fixedUpdate(delta)
      }
    })
  }

  lateUpdate(interpolation: number) {
    this.systems.forEach(info => {
      if (info.isActive) {
        info.system.lateUpdate(interpolation)
      }
    })
  }

  stopAllSystems() {
    this.systems.forEach(info => {
      if (info.isActive) {
        info.isActive = false
        info.system.stop()
      }
    })
  }

  cleanup() {
    this.stopAllSystems()
    this.systems.forEach(info => info.system.cleanup())
    this.systems = []
    this.systemsMap.clear()
  }

  start() {
    if (!this.isRunning) {
      this.runLoop()
    }
  }

  stop() {
    if (this.isRunning) {
      this.isRunning = false
    }
  }

  runLoop() {
    if (this.isRunning) {
      return
    }

    const step = this.frameTime
    const slow = 1

    let now = 0
    let dt = 0
    let last = getTime()
    let slowStep = slow * step
    let delta = 0.0

    let updateCounter = 0
    let renderCounter = 0
    let deltaCounter = 0.0

    const internal = () => {
      now = getTime()
      delta = now - last
      dt = dt + Math.min(1, delta / 1000)

      while (dt > slowStep) {
        updateCounter++
        dt = dt - slowStep
        this.fixedUpdate(step)
      }

      renderCounter++
      this.lateUpdate(dt / slow)
      last = now

      if (this.isRunning) {
        requestAnimationFrame(internal)
      } else {
        this.cleanup()
        return
      }

      deltaCounter += delta / 1000
      if (deltaCounter >= 1) {
        console.log(updateCounter, renderCounter)
        deltaCounter = 0
        updateCounter = 0
        renderCounter = 0
      }
    }

    this.isRunning = true
    requestAnimationFrame(internal)
  }
}
