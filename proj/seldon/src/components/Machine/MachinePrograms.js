import React from 'react'
import MachineProgramsTable from '~/components/Machine/MachineProgramsTable'
import '~/components/Machine/Machine.less'
import MachineGraph from '~/components/Machine/MachineGraph'

export function Sidebar() {
  const types = ['cpu', 'memory']
  return (
    <div className="machine-programs">
      <div className="machine-wrapper">
        <div className="graphs">
          {types.map((type, i) => {
            return <MachineGraph key={i} type={type}></MachineGraph>
          })}
        </div>
        <div className="table">
          <MachineProgramsTable className="table-container"></MachineProgramsTable>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
