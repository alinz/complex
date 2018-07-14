import { Geometry } from '@/core/geometry/geometry'

export class GeometryManager {
  geometries: Map<{ new (): Geometry }, Geometry>
  currentBindGeometry: Geometry | null

  constructor() {
    this.geometries = new Map()
    this.currentBindGeometry = null
  }

  getInstance(Geometry: { new (): Geometry }): Geometry {
    let geometry = this.geometries.get(Geometry)
    if (!geometry) {
      geometry = new Geometry()
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
