import React from 'react'

const MachineContext = React.createContext()

export const MachineProvider = MachineContext.Provider
export const MachineConsumer = MachineContext.Consumer

export default MachineContext
