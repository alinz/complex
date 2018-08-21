export interface Matcher {
  Match(): number
}

export class ExactMatcher implements Matcher {
  type: number
  constructor(type: number) {
    this.type = type
  }

  Match(): number {
    return this.type
  }
}

export class AtLeastMatcher implements Matcher {
  type: number
  constructor(type: number) {
    this.type = type
  }

  Match(): number {
    return this.type
  }
}
