import React, { useEffect, useState } from 'react'
import './App.less'
import Sidebar from '~/components/Sidebar'
import Header from '~/components/Header'
import MachinePrograms from '~/components/Machine/MachinePrograms'
import timeFormat from '~/timeFormat'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as actions from '~/store/actions'

import { MachineProvider } from '~/context/MachineContext'
import Machine from '~/mock/Machine'

function App() {
  const dispatch = useDispatch()
  let totalMachines = []
  Array(7)
    .fill({})
    .forEach((v, i) => {
      // selects a random number
      const randomProgramsLength = ((15 * i) % 25) + 15
      totalMachines.push(new Machine(i, randomProgramsLength))
    })

  totalMachines = totalMachines.map(machine => {
    const machineObject = machine.machineObject()
    machineObject.programs = machineObject.programs.map(program => {
      // dispatch an action in every calculation of the machine's programs
      dispatch(
        actions.LAST_FIVE_VALUES({
          machineId: machineObject.id,
          programId: program.id,
          cpu: [program.cpu],
          memory: [program.memory],
          time: [timeFormat()],
        }),
      )
      return program
    })
    return machineObject
  })
  const [machines, setMachines] = useState([])
  const [key, setKey] = useState(1)

  useEffect(() => {
    // loading the first five machine's info immediately
    if (key <= 5) {
      setMachines(totalMachines)
      setKey(key + 1)
    }
    // loading new machine's info every 5 seconds
    const updateMachines = setInterval(() => {
      setMachines(totalMachines)
    }, 3000)
    return () => clearInterval(updateMachines)
  }, [totalMachines, key])
  if (!machines.length) return null
  return (
    <div className="App">
      <Router>
        <Header />
        <MachineProvider value={machines}>
          <div className="body">
            <Switch>
              <Redirect exact from="/" to="/machine/1" />
              <Route path={'/machine/:id'}>
                <Sidebar machines={machines} />
                <MachinePrograms />
              </Route>
            </Switch>
          </div>
        </MachineProvider>
      </Router>
    </div>
  )
}

export default App
