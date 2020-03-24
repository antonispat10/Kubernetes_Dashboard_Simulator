import * as list from '~/mock/NameList'

const machinePrograms = (i, machineIndex, minutesOnFirstLoad) => {
  return {
    id: `program${i}`,
    name: `${list.programsName[(i * machineIndex) % list.programsName.length]}`,
    node: `${list.nodesName[i % list.nodesName.length]}`,
    status: list.statusName[(i * machineIndex) % 2],
    restarts: (i * machineIndex) % 5,
    age: `${((i * 9 * machineIndex) % 15) +
      (new Date().getSeconds() + minutesOnFirstLoad)} seconds`,
    cpu: `0.${getRandomNumber()}`,
    memory: `${getRandomNumber()}.${getRandomNumber(0, 9)}`,
  }
}

// getting a random number
const getRandomNumber = (min = 0, max = 99) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const machineBasicInfo = i => {
  return {
    id: `${i}`,
    name: list.machineNames[i],
    ip: `127.0.0.${i}`,
  }
}

class Machine {
  constructor(machineIndex, programsLength) {
    this.machineIndex = machineIndex
    this.programsLength = programsLength
  }
  minutesOnFirstLoad = new Date().getSeconds()
  programs = () => {
    return Array(this.programsLength)
      .fill({})
      .map((v, ind) => {
        return machinePrograms(ind, this.machineIndex, this.minutesOnFirstLoad)
      })
  }
  machineObject = () => {
    return {
      ...machineBasicInfo(this.machineIndex),
      programs: [...this.programs()],
    }
  }
}

export default Machine
