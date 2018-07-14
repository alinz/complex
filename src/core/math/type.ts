export class Vec2 {
  values: Float32Array
  constructor(x: number, y: number) {
    this.values = new Float32Array(2)

    this.values[0] = x
    this.values[1] = y
  }
}

export class Vec3 {
  values: Float32Array
  constructor(x: number, y: number, z: number) {
    this.values = new Float32Array(3)

    this.values[0] = x
    this.values[1] = y
    this.values[2] = z
  }
}

export class Quat {
  values: Float32Array
  constructor(x: number, y: number, z: number, w: number) {
    this.values = new Float32Array(4)

    this.values[0] = x
    this.values[1] = y
    this.values[2] = z
    this.values[3] = w
  }
}

export class Mat4 {
  values: Float32Array
  constructor(
    m00: number,
    m01: number,
    m02: number,
    m03: number,
    m10: number,
    m11: number,
    m12: number,
    m13: number,
    m20: number,
    m21: number,
    m22: number,
    m23: number,
    m30: number,
    m31: number,
    m32: number,
    m33: number
  ) {
    this.values = new Float32Array(16)

    this.values[0] = m00
    this.values[1] = m01
    this.values[2] = m02
    this.values[3] = m03
    this.values[4] = m10
    this.values[5] = m11
    this.values[6] = m12
    this.values[7] = m13
    this.values[8] = m20
    this.values[9] = m21
    this.values[10] = m22
    this.values[11] = m23
    this.values[12] = m30
    this.values[13] = m31
    this.values[14] = m32
    this.values[15] = m33
  }
}
