import 'babel-polyfill'

import { App } from '@game'

window.onload = async () => {
  const app = new App()

  // waiting until all the resources and io completed
  // here.
  await app.init()

  app.start()

  setTimeout(() => {
    app.stop()
  }, 4000)
}
