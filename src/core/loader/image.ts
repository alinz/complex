export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((res, rej) => {
    const image = new Image()

    image.onload = () => {
      res(image)
    }

    image.onerror = err => {
      rej(err)
    }

    image.src = url
  })
}

export const loadImages = (...urls: Array<string>): Promise<Array<HTMLImageElement>> => {
  return new Promise((res, rej) => {
    const results = new Array(urls.length)
    let loaded = urls.length
    let err: Error | null = null

    const load = async (url: string, index: number) => {
      try {
        results[index] = await loadImage(url)
      } catch (e) {
        err = e
        results[index] = null
      }
      loaded--
      if (loaded == 0) {
        err ? rej(err) : res(results)
      }
    }

    urls.forEach(load)
  })
}
