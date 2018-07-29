import { Vec2, Vec3 } from '@core/math/type'

export const length = (src: Vec3): number => {
  const [x, y, z] = src.values

  return Math.sqrt(x * x + y * y + z * z)
}

export const max = (src: Vec3): number => {
  const [x, y, z] = src.values

  return Math.max(x, Math.max(y, z))
}

export const dot = (a: Vec3, b: Vec3): number => {
  const [x, y, z] = a.values
  const [x1, y1, z1] = b.values

  return x * x1 + y * y1 + z * z1
}

export const cross = (des: Vec3, a: Vec3, b: Vec3) => {
  const [x, y, z] = a.values
  const [x1, y1, z1] = b.values

  des.values[0] = y * z1 - z * y1
  des.values[1] = z * x1 - x * z1
  des.values[2] = x * y1 - y * x1

  return des
}

export const normalized = (des: Vec3, src: Vec3) => {
  const len = length(src)

  des.values[0] = src.values[0] / len
  des.values[1] = src.values[1] / len
  des.values[2] = src.values[2] / len

  return des
}

export const lerp = (des: Vec3, a: Vec3, b: Vec3, lerpFactor: number): Vec3 => {
  sub(des, a, b)
  mulScalar(des, des, lerpFactor)
  add(des, des, b)

  return des
}

export const add = (des: Vec3, a: Vec3, b: Vec3): Vec3 => {
  des.values[0] = a.values[0] + b.values[0]
  des.values[1] = a.values[1] + b.values[1]
  des.values[2] = a.values[2] + b.values[2]

  return des
}

export const addScalar = (des: Vec3, src: Vec3, val: number): Vec3 => {
  des.values[0] = src.values[0] + val
  des.values[1] = src.values[1] + val
  des.values[2] = src.values[2] + val

  return des
}

export const sub = (des: Vec3, a: Vec3, b: Vec3): Vec3 => {
  des.values[0] = a.values[0] - b.values[0]
  des.values[1] = a.values[1] - b.values[1]
  des.values[2] = a.values[2] - b.values[2]

  return des
}

export const subScalar = (des: Vec3, src: Vec3, val: number): Vec3 => {
  des.values[0] = src.values[0] - val
  des.values[1] = src.values[1] - val
  des.values[2] = src.values[2] - val

  return des
}

export const mul = (des: Vec3, a: Vec3, b: Vec3): Vec3 => {
  des.values[0] = a.values[0] * b.values[0]
  des.values[1] = a.values[1] * b.values[1]
  des.values[2] = a.values[2] * b.values[2]

  return des
}

export const mulScalar = (des: Vec3, src: Vec3, val: number): Vec3 => {
  des.values[0] = src.values[0] * val
  des.values[1] = src.values[1] * val
  des.values[2] = src.values[2] * val

  return des
}

export const div = (des: Vec3, a: Vec3, b: Vec3): Vec3 => {
  des.values[0] = a.values[0] / b.values[0]
  des.values[1] = a.values[1] / b.values[1]
  des.values[2] = a.values[2] / b.values[2]

  return des
}

export const divScalar = (des: Vec3, src: Vec3, val: number): Vec3 => {
  des.values[0] = src.values[0] / val
  des.values[1] = src.values[1] / val
  des.values[2] = src.values[2] / val

  return des
}

export const abs = (des: Vec3, src: Vec3): Vec3 => {
  des.values[0] = Math.abs(src.values[0])
  des.values[1] = Math.abs(src.values[1])
  des.values[2] = Math.abs(src.values[2])

  return des
}

export const getXY = (des: Vec2, src: Vec3): Vec2 => {
  const [x, y, _] = src.values

  des.values[0] = x
  des.values[1] = y

  return des
}

export const getYZ = (des: Vec2, src: Vec3): Vec2 => {
  const [_, y, z] = src.values

  des.values[0] = y
  des.values[1] = z

  return des
}

export const getZX = (des: Vec2, src: Vec3): Vec2 => {
  const [x, _, z] = src.values

  des.values[0] = z
  des.values[1] = x

  return des
}

export const getYX = (des: Vec2, src: Vec3): Vec2 => {
  const [x, y, _] = src.values

  des.values[0] = y
  des.values[1] = x

  return des
}

export const getZY = (des: Vec2, src: Vec3): Vec2 => {
  const [_, y, z] = src.values

  des.values[0] = z
  des.values[1] = y

  return des
}

export const getXZ = (des: Vec2, src: Vec3): Vec2 => {
  const [x, _, z] = src.values

  des.values[0] = x
  des.values[1] = z

  return des
}

export const negate = (des: Vec3, src: Vec3): Vec3 => {
  const [x, y, z] = src.values

  des.values[0] = -x
  des.values[1] = -y
  des.values[2] = -z

  return des
}

export const clone = (src: Vec3): Vec3 => {
  const [x, y, z] = src.values

  return new Vec3(x, y, z)
}
