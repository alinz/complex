import { Entity } from './entity'

export interface Operation {
  add(entitiy: Entity): void
  remove(entitiy: Entity): void
  find<T extends Entity>(type: number): Array<T>
}

export interface System {
  componentTypes(): Array<number>
  init(op: Operation): void
  fixedUpdate(delta: number, op: Operation): void
  lateUpdate(interpolation: number, op: Operation): void
  start(): void
  stop(): void
  clean(): void
}
