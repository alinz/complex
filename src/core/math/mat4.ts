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

export const clear = (src: Mat4): Mat4 => {
  src[M00] = 0
  src[M01] = 0
  src[M02] = 0
  src[M03] = 0
  src[M10] = 0
  src[M11] = 0
  src[M12] = 0
  src[M13] = 0
  src[M20] = 0
  src[M21] = 0
  src[M22] = 0
  src[M23] = 0
  src[M30] = 0
  src[M31] = 0
  src[M32] = 0
  src[M33] = 0

  return src
}

export const identity = (des: Mat4): Mat4 => {
  des[M00] = 1
  des[M01] = 0
  des[M02] = 0
  des[M03] = 0
  des[M10] = 0
  des[M11] = 1
  des[M12] = 0
  des[M13] = 0
  des[M20] = 0
  des[M21] = 0
  des[M22] = 1
  des[M23] = 0
  des[M30] = 0
  des[M31] = 0
  des[M32] = 0
  des[M33] = 1

  return des
}

export const initTranslation = (des: Mat4, x: number, y: number, z: number): Mat4 => {
  des[M00] = 1
  des[M01] = 0
  des[M02] = 0
  des[M03] = x
  des[M10] = 0
  des[M11] = 1
  des[M12] = 0
  des[M13] = y
  des[M20] = 0
  des[M21] = 0
  des[M22] = 1
  des[M23] = z
  des[M30] = 0
  des[M31] = 0
  des[M32] = 0
  des[M33] = 1

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

export const mul = (des: Mat4, a: Mat4, b: Mat4): Mat4 => {
  const desV = des.values
  const aV = a.values
  const bV = b.values

  let a00 = aV[M00],
    a01 = aV[M01],
    a02 = aV[M02],
    a03 = aV[M03]
  let a10 = aV[M10],
    a11 = aV[M11],
    a12 = aV[M12],
    a13 = aV[M13]
  let a20 = aV[M20],
    a21 = aV[M21],
    a22 = aV[M22],
    a23 = aV[M23]
  let a30 = aV[M30],
    a31 = aV[M31],
    a32 = aV[M32],
    a33 = aV[M33]

  // Cache only the current line of the second matrix
  let b0 = bV[0],
    b1 = bV[1],
    b2 = bV[2],
    b3 = bV[3]
  desV[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
  desV[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
  desV[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
  desV[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

  b0 = bV[4]
  b1 = bV[5]
  b2 = bV[6]
  b3 = bV[7]
  desV[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
  desV[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
  desV[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
  desV[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

  b0 = bV[8]
  b1 = bV[9]
  b2 = bV[10]
  b3 = bV[11]
  desV[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
  desV[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
  desV[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
  desV[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

  b0 = bV[12]
  b1 = bV[13]
  b2 = bV[14]
  b3 = bV[15]
  desV[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
  desV[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
  desV[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
  desV[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

  return des
}

export const copy = (des: Mat4, src: Mat4): Mat4 => {
  des[M00] = src[M00]
  des[M01] = src[M01]
  des[M02] = src[M02]
  des[M03] = src[M03]
  des[M10] = src[M10]
  des[M11] = src[M11]
  des[M12] = src[M12]
  des[M13] = src[M13]
  des[M20] = src[M20]
  des[M21] = src[M21]
  des[M22] = src[M22]
  des[M23] = src[M23]
  des[M30] = src[M30]
  des[M31] = src[M31]
  des[M32] = src[M32]
  des[M33] = src[M33]

  return des
}
