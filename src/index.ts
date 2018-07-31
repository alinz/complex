import 'babel-polyfill'

import { Main } from '@game'

window.onload = async () => {
  const main = new Main()

  // waiting until all the resources and io completed
  // here.
  await main.init()

  main.start()

  setTimeout(() => {
    main.stop()
  }, 4000)
}
