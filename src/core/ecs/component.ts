import { iota32 } from '@core/generator'

export const genComponentType = iota32()

export interface Component {
  type: number
}
