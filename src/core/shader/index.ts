export * from './shader'

export const glsl3 = (strings: any) => {
  return '#version 300 es' + strings.raw[0]
}
