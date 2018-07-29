const instancesMap = new Map()

export const init = <T>(Class: { new (...args: Array<any>): T }, instance: T) => {
  if (instancesMap.has(Class)) {
    throw new Error(`Class ${Class.name} already initialized`)
  }
  instancesMap.set(Class, instance)
}

export const instance = <T>(Class: { new (...args: Array<any>): T }): T => {
  const instance = instancesMap.get(Class)
  if (!instance) {
    throw new Error(`Class ${Class.name} not found`)
  }
  return instance
}
