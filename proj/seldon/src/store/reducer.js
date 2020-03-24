import * as actionTypes from './actionTypes'

const initialState = {
  lastFiveCalculations: [],
}

const setFiveValues = (state, action) => {
  let values = [...state.lastFiveCalculations]
  let valueIndex = state.lastFiveCalculations.findIndex(v => {
    return (
      v.machineId === action.value.machineId &&
      v.programId === action.value.programId
    )
  })
  if (valueIndex === -1) values.push(action.value)
  else {
    values = values.map((v, i) => {
      if (valueIndex === i) {
        const cpu = [...v.cpu, ...action.value.cpu]
        const memory = [...v.memory, ...action.value.memory]
        const time = [...v.time, ...action.value.time]
        if (cpu.length === 6) {
          cpu.splice(0, 1)
          memory.splice(0, 1)
          time.splice(0, 1)
        }
        v = { ...v, cpu, memory, time }
      }
      return v
    })
  }
  return {
    ...state,
    lastFiveCalculations: values,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LAST_FIVE_VALUES:
      return setFiveValues(state, action)
    default:
      return state
  }
}

export default reducer
