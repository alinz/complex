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
