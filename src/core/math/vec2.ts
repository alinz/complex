import { toRadian } from '@core/math/util'
import { Vec2 } from '@core/math/type'

export const add = (des: Vec2, a: Vec2, b: Vec2): Vec2 => {
  des.values[0] = a.values[0] + b.values[0]
  des.values[1] = a.values[1] + b.values[1]

  return des
}

export const addScalar = (des: Vec2, src: Vec2, val: number): Vec2 => {
  des.values[0] = src.values[0] + val
  des.values[1] = src.values[1] + val

  return des
}

export const sub = (des: Vec2, a: Vec2, b: Vec2): Vec2 => {
  des.values[0] = a.values[0] - b.values[0]
  des.values[1] = a.values[1] - b.values[1]

  return des
}

export const subScalar = (des: Vec2, src: Vec2, val: number): Vec2 => {
  des.values[0] = src.values[0] - val
  des.values[1] = src.values[1] - val

  return des
}

export const mul = (des: Vec2, a: Vec2, b: Vec2): Vec2 => {
  des.values[0] = a.values[0] * b.values[0]
  des.values[1] = a.values[1] * b.values[1]

  return des
}

export const mulScalar = (des: Vec2, src: Vec2, val: number): Vec2 => {
  des.values[0] = src.values[0] * val
  des.values[1] = src.values[1] * val

  return des
}

export const div = (des: Vec2, a: Vec2, b: Vec2): Vec2 => {
  des.values[0] = a.values[0] / b.values[0]
  des.values[1] = a.values[1] / b.values[1]

  return des
}

export const divScalar = (des: Vec2, src: Vec2, val: number): Vec2 => {
  des.values[0] = src.values[0] / val
  des.values[1] = src.values[1] / val

  return des
}

export const length = (src: Vec2): number => {
  const [x, y] = src.values

  return Math.sqrt(x * x + y * y)
}

export const max = (src: Vec2): number => {
  const [x, y] = src.values

  return Math.max(x, y)
}

export const dot = (a: Vec2, b: Vec2): number => {
  const [x, y] = a.values
  const [x1, y1] = b.values

  return x * x1 + y * y1
}

export const normalized = (des: Vec2, src: Vec2): Vec2 => {
  const srcM = src.values
  const desM = des.values
  const len = length(src)

  desM[0] = srcM[0] / len
  desM[1] = srcM[1] / len

  return this
}

export const cross = (a: Vec2, b: Vec2): number => {
  const [x, y] = a.values
  const [x1, y1] = b.values

  return x * y1 - y * x1
}

export const lerp = (des: Vec2, a: Vec2, b: Vec2, lerpFactor: number): Vec2 => {
  sub(des, a, b)
  mulScalar(des, des, lerpFactor)
  add(des, des, b)

  return des
}

export const rotate = (des: Vec2, src: Vec2, angle: number): Vec2 => {
  const rad = toRadian(angle)
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)

  let [x, y] = src.values

  x = x * cos - y * sin
  y = x * sin + y * cos

  des.values[0] = x
  des.values[1] = y

  return des
}

export const abs = (des: Vec2, src: Vec2): Vec2 => {
  const [x, y] = src.values

  des.values[0] = Math.abs(x)
  des.values[1] = Math.abs(y)

  return des
}

export const clone = (src: Vec2): Vec2 => {
  const [x, y] = src.values

  return new Vec2(x, y)
}
