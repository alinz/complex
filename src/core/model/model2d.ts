import { Geometry } from '@core/geometry'
import { Texture2D } from '@core/texture'

import { storeFloatDataInAttributeList, VBO_Location } from '@core/webgl-util'

export class Model2D {
  gl: WebGL2RenderingContext
  geometry: Geometry
  texture: Texture2D
  textCoord: WebGLBuffer

  constructor(gl: WebGL2RenderingContext, geometry: Geometry, texture: Texture2D, textCoord: Array<number>) {
    this.gl = gl
    this.geometry = geometry
    this.texture = texture
    this.textCoord = storeFloatDataInAttributeList(gl, textCoord, 2, VBO_Location.Texture)
  }

  cleanUp() {
    this.gl.deleteBuffer(this.textCoord)
  }
}
