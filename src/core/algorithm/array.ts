export class FastArray<T> {
  arrPtr: Array<T>

  constructor(arr: Array<T>) {
    this.arrPtr = arr
  }

  push(val: T) {
    this.arrPtr[this.arrPtr.length] = val
  }

  pop(): T {
    const arrPtr = this.arrPtr
    const val = arrPtr[arrPtr.length - 1]
    arrPtr.length--
    return val
  }

  remove(index: number) {
    const arr = this.arrPtr
    const len = arr.length

    if (!len) return

    while (index < len) {
      arr[index] = arr[index + 1]
      index++
    }

    arr.length--
  }

  indexOf(val: T): number {
    const arr = this.arrPtr
    const len = arr.length

    for (let i = 0; i < len; i++) {
      if (arr[i] === val) {
        return i
      }
    }

    return -1
  }
}
