export class Window {
  gl: WebGL2RenderingContext
  canvas: HTMLCanvasElement

  constructor() {
    const body = document.body

    // apply style to body
    body.style.border = '0'
    body.style.backgroundColor = 'white'
    body.style.padding = '0'
    body.style.margin = '0'

    const canvas = document.createElement('canvas')

    // apply style to canvas
    canvas.style.width = '100vw'
    canvas.style.height = '100vh'
    canvas.style.display = 'block'

    body.appendChild(canvas)

    const gl = canvas.getContext('webgl2')
    if (!gl) {
      throw new Error('webgl2 is not supported')
    }

    this.canvas = canvas
    this.gl = gl

    this.resize()

    window.addEventListener('resize', this.resize, false)
  }

  resize = () => {
    const { canvas, gl } = this
    const cssToRealPixels = window.devicePixelRatio || 1

    // Lookup the size the browser is displaying the canvas.
    const displayWidth = Math.floor(canvas.clientWidth * cssToRealPixels)
    const displayHeight = Math.floor(canvas.clientHeight * cssToRealPixels)

    // Check if the canvas is not the same size.
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      // Make the canvas the same size
      canvas.width = displayWidth
      canvas.height = displayHeight
    }

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, displayWidth, displayHeight)
  }
}
