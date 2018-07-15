import { Mat4, Vec3 } from '@core/math/type'
import { toRadian } from '@core/math/util'

export const M00 = 0
export const M01 = 1
export const M02 = 2
export const M03 = 3
export const M10 = 4
export const M11 = 5
export const M12 = 6
export const M13 = 7
export const M20 = 8
export const M21 = 9
export const M22 = 10
export const M23 = 11
export const M30 = 12
export const M31 = 13
export const M32 = 14
export const M33 = 15

export const createEmpty = (): Mat4 => {
  return new Mat4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
}

export const clear = (des: Mat4): Mat4 => {
  const desM = des.values

  desM[M00] = 0
  desM[M01] = 0
  desM[M02] = 0
  desM[M03] = 0

  desM[M10] = 0
  desM[M11] = 0
  desM[M12] = 0
  desM[M13] = 0

  desM[M20] = 0
  desM[M21] = 0
  desM[M22] = 0
  desM[M23] = 0

  desM[M30] = 0
  desM[M31] = 0
  desM[M32] = 0
  desM[M33] = 0

  return des
}

export const identity = (des: Mat4): Mat4 => {
  const desM = des.values

  desM[M00] = 1
  desM[M01] = 0
  desM[M02] = 0
  desM[M03] = 0

  desM[M10] = 0
  desM[M11] = 1
  desM[M12] = 0
  desM[M13] = 0

  desM[M20] = 0
  desM[M21] = 0
  desM[M22] = 1
  desM[M23] = 0

  desM[M30] = 0
  desM[M31] = 0
  desM[M32] = 0
  desM[M33] = 1

  return des
}

export const initTranslation = (des: Mat4, x: number, y: number, z: number): Mat4 => {
  const desM = des.values

  desM[M00] = 1
  desM[M01] = 0
  desM[M02] = 0
  desM[M03] = x

  desM[M10] = 0
  desM[M11] = 1
  desM[M12] = 0
  desM[M13] = y

  desM[M20] = 0
  desM[M21] = 0
  desM[M22] = 1
  desM[M23] = z

  desM[M30] = 0
  desM[M31] = 0
  desM[M32] = 0
  desM[M33] = 1

  return des
}

export const initScale = (des: Mat4, x: number, y: number, z: number) => {
  const m = des.values

  m[M00] = x
  m[M01] = 0
  m[M02] = 0
  m[M03] = 0

  m[M10] = 0
  m[M11] = y
  m[M12] = 0
  m[M13] = 0

  m[M20] = 0
  m[M21] = 0
  m[M22] = z
  m[M23] = 0

  m[M30] = 0
  m[M31] = 0
  m[M32] = 0
  m[M33] = 1

  return des
}

export const initRotation = (des: Mat4, x: number, y: number, z: number): Mat4 => {
  const rx = createEmpty()
  const ry = createEmpty()
  const rz = createEmpty()

  const xM = rx.values
  const yM = ry.values
  const zM = rz.values

  x = toRadian(x)
  y = toRadian(y)
  z = toRadian(z)

  const sinX = Math.sin(x)
  const sinY = Math.sin(y)
  const sinZ = Math.sin(z)

  const cosX = Math.cos(x)
  const cosY = Math.cos(y)
  const cosZ = Math.cos(z)

  zM[M00] = cosZ
  zM[M10] = sinZ
  zM[M20] = 0
  zM[M30] = 0

  zM[M01] = -sinZ
  zM[M11] = cosZ
  zM[M21] = 0
  zM[M31] = 0

  zM[M02] = 0
  zM[M12] = 0
  zM[M22] = 1
  zM[M32] = 0

  zM[M03] = 0
  zM[M13] = 0
  zM[M23] = 0
  zM[M33] = 1

  xM[M00] = 1
  xM[M10] = 0
  xM[M20] = 0
  xM[M30] = 0

  xM[M01] = 0
  xM[M11] = cosX
  xM[M21] = sinX
  xM[M31] = 0

  xM[M02] = 0
  xM[M12] = -sinX
  xM[M22] = cosX
  xM[M32] = 0

  xM[M03] = 0
  xM[M13] = 0
  xM[M23] = 0
  xM[M33] = 1

  yM[M00] = cosY
  yM[M10] = 0
  yM[M20] = sinY
  yM[M30] = 0

  yM[M01] = 0
  yM[M11] = 1
  yM[M21] = 0
  yM[M31] = 0

  yM[M02] = -sinY
  yM[M12] = 0
  yM[M22] = cosY
  yM[M32] = 0

  yM[M03] = 0
  yM[M13] = 0
  yM[M23] = 0
  yM[M33] = 1

  mul(des, ry, rx)
  mul(des, rz, des)

  return des
}

export const mul = (des: Mat4, a: Mat4, b: Mat4): Mat4 => {
  const desM = des.values
  const aM = a.values
  const bM = b.values

  let a00 = aM[M00]
  let a01 = aM[M01]
  let a02 = aM[M02]
  let a03 = aM[M03]

  let a10 = aM[M10]
  let a11 = aM[M11]
  let a12 = aM[M12]
  let a13 = aM[M13]

  let a20 = aM[M20]
  let a21 = aM[M21]
  let a22 = aM[M22]
  let a23 = aM[M23]

  let a30 = aM[M30]
  let a31 = aM[M31]
  let a32 = aM[M32]
  let a33 = aM[M33]

  // Cache only the current line of the second matrix
  let b0 = bM[0]
  let b1 = bM[1]
  let b2 = bM[2]
  let b3 = bM[3]

  desM[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
  desM[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
  desM[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
  desM[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

  b0 = bM[4]
  b1 = bM[5]
  b2 = bM[6]
  b3 = bM[7]

  desM[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
  desM[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
  desM[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
  desM[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

  b0 = bM[8]
  b1 = bM[9]
  b2 = bM[10]
  b3 = bM[11]

  desM[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
  desM[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
  desM[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
  desM[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

  b0 = bM[12]
  b1 = bM[13]
  b2 = bM[14]
  b3 = bM[15]

  desM[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
  desM[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
  desM[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
  desM[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

  return des
}

export const copy = (des: Mat4, src: Mat4): Mat4 => {
  const desM = des.values
  const srcM = src.values

  desM[M00] = srcM[M00]
  desM[M01] = srcM[M01]
  desM[M02] = srcM[M02]
  desM[M03] = srcM[M03]

  desM[M10] = srcM[M10]
  desM[M11] = srcM[M11]
  desM[M12] = srcM[M12]
  desM[M13] = srcM[M13]

  desM[M20] = srcM[M20]
  desM[M21] = srcM[M21]
  desM[M22] = srcM[M22]
  desM[M23] = srcM[M23]

  desM[M30] = srcM[M30]
  desM[M31] = srcM[M31]
  desM[M32] = srcM[M32]
  desM[M33] = srcM[M33]

  return des
}
