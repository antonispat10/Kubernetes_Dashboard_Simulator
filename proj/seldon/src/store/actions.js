import * as actionTypes from './actionTypes'

export const LAST_FIVE_VALUES = value => {
  return {
    type: actionTypes.LAST_FIVE_VALUES,
    value,
  }
}
