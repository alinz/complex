import { Mat4, Vec3 } from '@core/math/type'
import { toRadian } from '@core/math/util'
import * as vec3 from './vec3'

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

export const createIdentity = (): Mat4 => {
  return new Mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
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

export const translate = (out: Mat4, a: Mat4, v: Vec3) => {
  let [x, y, z] = v.values
  let a00, a01, a02, a03
  let a10, a11, a12, a13
  let a20, a21, a22, a23

  const outM = out.values
  const aM = a.values

  if (aM === outM) {
    outM[12] = aM[0] * x + aM[4] * y + aM[8] * z + aM[12]
    outM[13] = aM[1] * x + aM[5] * y + aM[9] * z + aM[13]
    outM[14] = aM[2] * x + aM[6] * y + aM[10] * z + aM[14]
    outM[15] = aM[3] * x + aM[7] * y + aM[11] * z + aM[15]
  } else {
    a00 = aM[0]
    a01 = aM[1]
    a02 = aM[2]
    a03 = aM[3]
    a10 = aM[4]
    a11 = aM[5]
    a12 = aM[6]
    a13 = aM[7]
    a20 = aM[8]
    a21 = aM[9]
    a22 = aM[10]
    a23 = aM[11]

    outM[0] = a00
    outM[1] = a01
    outM[2] = a02
    outM[3] = a03
    outM[4] = a10
    outM[5] = a11
    outM[6] = a12
    outM[7] = a13
    outM[8] = a20
    outM[9] = a21
    outM[10] = a22
    outM[11] = a23

    outM[12] = a00 * x + a10 * y + a20 * z + aM[12]
    outM[13] = a01 * x + a11 * y + a21 * z + aM[13]
    outM[14] = a02 * x + a12 * y + a22 * z + aM[14]
    outM[15] = a03 * x + a13 * y + a23 * z + aM[15]
  }

  return out
}

export function rotate(des: Mat4, a: Mat4, r: number, axis: Vec3): Mat4 {
  let [x, y, z] = axis.values
  let len = Math.sqrt(x * x + y * y + z * z)
  let s, c, t
  let a00, a01, a02, a03
  let a10, a11, a12, a13
  let a20, a21, a22, a23
  let b00, b01, b02
  let b10, b11, b12
  let b20, b21, b22

  const rad = toRadian(r)

  // if (len < glMatrix.EPSILON) { return null; }

  len = 1 / len
  x *= len
  y *= len
  z *= len

  s = Math.sin(rad)
  c = Math.cos(rad)
  t = 1 - c

  const aM = a.values
  const desM = des.values

  a00 = aM[0]
  a01 = aM[1]
  a02 = aM[2]
  a03 = aM[3]
  a10 = aM[4]
  a11 = aM[5]
  a12 = aM[6]
  a13 = aM[7]
  a20 = aM[8]
  a21 = aM[9]
  a22 = aM[10]
  a23 = aM[11]

  // Construct the elements of the rotation matrix
  b00 = x * x * t + c
  b01 = y * x * t + z * s
  b02 = z * x * t - y * s
  b10 = x * y * t - z * s
  b11 = y * y * t + c
  b12 = z * y * t + x * s
  b20 = x * z * t + y * s
  b21 = y * z * t - x * s
  b22 = z * z * t + c

  // Perform rotation-specific matrix multiplication
  desM[0] = a00 * b00 + a10 * b01 + a20 * b02
  desM[1] = a01 * b00 + a11 * b01 + a21 * b02
  desM[2] = a02 * b00 + a12 * b01 + a22 * b02
  desM[3] = a03 * b00 + a13 * b01 + a23 * b02
  desM[4] = a00 * b10 + a10 * b11 + a20 * b12
  desM[5] = a01 * b10 + a11 * b11 + a21 * b12
  desM[6] = a02 * b10 + a12 * b11 + a22 * b12
  desM[7] = a03 * b10 + a13 * b11 + a23 * b12
  desM[8] = a00 * b20 + a10 * b21 + a20 * b22
  desM[9] = a01 * b20 + a11 * b21 + a21 * b22
  desM[10] = a02 * b20 + a12 * b21 + a22 * b22
  desM[11] = a03 * b20 + a13 * b21 + a23 * b22

  if (aM !== desM) {
    // If the source and destination differ, copy the unchanged last row
    desM[12] = aM[12]
    desM[13] = aM[13]
    desM[14] = aM[14]
    desM[15] = aM[15]
  }
  return des
}

export const scale = (des: Mat4, a: Mat4, v: Vec3): Mat4 => {
  const [x, y, z] = v.values
  const desM = des.values
  const aM = a.values

  desM[0] = aM[0] * x
  desM[1] = aM[1] * x
  desM[2] = aM[2] * x
  desM[3] = aM[3] * x
  desM[4] = aM[4] * y
  desM[5] = aM[5] * y
  desM[6] = aM[6] * y
  desM[7] = aM[7] * y
  desM[8] = aM[8] * z
  desM[9] = aM[9] * z
  desM[10] = aM[10] * z
  desM[11] = aM[11] * z
  desM[12] = aM[12]
  desM[13] = aM[13]
  desM[14] = aM[14]
  desM[15] = aM[15]

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

export const transformationMatrix = (des: Mat4, position: Vec3, rx: number, ry: number, rz: number, scaleValue: number): Mat4 => {
  identity(des)

  translate(des, des, position)
  rotate(des, des, rx, new Vec3(1, 0, 0))
  rotate(des, des, ry, new Vec3(0, 1, 0))
  rotate(des, des, rz, new Vec3(0, 0, 1))
  scale(des, des, new Vec3(scaleValue, scaleValue, scaleValue))

  return des
}

export const projectionMatrix = (width: number, height: number, fov: number, nearPlane: number, farPlane: number): Mat4 => {
  const aspectRatio = width / height
  const yScale = (1.0 / Math.tan(toRadian(fov / 2.0))) * aspectRatio
  const xScale = yScale / aspectRatio
  const frustumLength = farPlane - nearPlane

  return new Mat4(
    xScale, // m00
    0, //m01
    0, //m02
    0, //m03
    0, //m10
    yScale, //m11
    0, //m12
    0, //m13
    0, //m20
    0, //m21
    -((farPlane - nearPlane) / frustumLength), //m22
    -1, //m23
    0, //m30
    0, //m31
    -((2.0 * nearPlane * farPlane) / frustumLength), //m32
    0 //m33
  )
}

// 0 -> pitch
// 1 -> yaw
// 2 -> roll
export const createViewMatrix = (position: Vec3, rotation: Vec3): Mat4 => {
  const result = createIdentity()
  const { values } = rotation

  vec3.negate(position, position)
  transformationMatrix(result, position, values[0], values[1], values[2], 1.0)
  vec3.negate(position, position)

  return result
}
