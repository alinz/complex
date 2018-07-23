export * from './shader'
export * from './manager'

export const glsl3 = (strings: any) => {
  return '#version 300 es' + strings.raw[0]
}
