type Iterator = () => number

export const iota32 = (times: number = 0): Iterator => (): number => {
  if (times === 32) {
    throw new Error('reached max id')
  }

  const val = 1 << times
  times++
  return val
}

export const iota = (times: number = 0): Iterator => (): number => times++
