import { System } from '@core/system'

export class RenderSystem implements System {
  gl: WebGL2RenderingContext

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl
  }

  init() {
    // loading shaders
    // loading some assets
  }

  start() {}

  fixedUpdate(delta: number) {}

  lateUpdate(interpolation: number) {
    this.beforeRender()
    this.render()
    this.afterRender()
  }

  stop() {}

  cleanup() {}

  beforeRender() {}

  render() {}

  afterRender() {}
}
