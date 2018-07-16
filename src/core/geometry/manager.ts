import { Geometry } from '@core/geometry/geometry'

export class GeometryManager {
  gl: WebGL2RenderingContext
  geometries: Map<{ new (gl: WebGL2RenderingContext): Geometry }, Geometry>
  currentBindGeometry: Geometry | null

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl
    this.geometries = new Map()
    this.currentBindGeometry = null
  }

  getInstance(Geometry: { new (gl: WebGL2RenderingContext): Geometry }): Geometry {
    let geometry = this.geometries.get(Geometry)
    if (!geometry) {
      geometry = new Geometry(this.gl)
      this.geometries.set(Geometry, geometry)
    }
    return geometry
  }

  autoBind(Geometry: { new (): Geometry }) {
    const geometry = this.getInstance(Geometry)

    if (geometry !== this.currentBindGeometry) {
      if (this.currentBindGeometry) {
        this.currentBindGeometry.unbind()
      }
      geometry.bind()
      this.currentBindGeometry = geometry
    }
  }
}
