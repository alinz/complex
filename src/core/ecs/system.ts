import { Entity } from './entity'
import { Matcher } from './matcher'

export interface Operation {
  add(entitiy: Entity): void
  remove(entitiy: Entity): void
  find<T extends Entity>(matcher: Matcher): Array<T>
}

export interface System {
  componentTypes(): Array<Matcher>
  init(op: Operation): void
  fixedUpdate(delta: number, op: Operation): void
  lateUpdate(interpolation: number, op: Operation): void
  start(): void
  stop(): void
  clean(): void
}
