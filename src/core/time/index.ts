export const getTime = (): number => {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime()
}
