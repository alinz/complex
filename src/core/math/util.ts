const degree = Math.PI / 180

export const EPSILON = 0.000001

export function toRadian(a: number): number {
  return a * degree
}

export function toDegree(radian: number): number {
  return radian / degree
}