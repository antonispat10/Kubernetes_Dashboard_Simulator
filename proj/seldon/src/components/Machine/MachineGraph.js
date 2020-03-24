import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from 'react-redux'

export function MachineGraph(props) {
  const store = useStore()
  const { id } = useParams()
  let times = []
  const canvasRef = useRef(null)
  let values = []

  // calculating last five values, times
  store
    .getState()
    .lastFiveCalculations.filter(v => {
      return v.machineId === id
    })
    .forEach(v => {
      Array(v.cpu.length)
        .fill('')
        .forEach((a, i) => {
          if (!values[i]) {
            values[i] = 0
            times[i] = null
          }
          times[i] = v.time[i]
          values[i] = parseFloat(
            (parseFloat(v[props.type][i]) + parseFloat(values[i])).toFixed(2),
          )
        })
    })

  // sorted values, used on the left side of the graph
  const valuesSorted = [...values].sort((a, b) => b - a)

  const maxVal = Math.max(...values)

  // creating the canvas graphs
  if (canvasRef.current) {
    const ctx = canvasRef.current.getContext('2d')
    const totalHeight = 100
    const totalWidth = 300
    ctx.fillStyle = '#f5f5f5'
    ctx.fillRect(0, 0, totalWidth, totalHeight)
    ctx.strokeStyle = 'black'
    values.forEach((v, i) => {
      const percentage = 1 - v / maxVal
      const individualWidth = totalWidth / 5
      ctx.strokeRect(
        2 + i * individualWidth,
        6 + percentage * 100,
        individualWidth - 7,
        totalHeight - 4,
      )
    })
  }

  // date times div of the graph
  const datesDiv = (
    <div>
      {times.map((v, i) => {
        return <span key={i}>{v}</span>
      })}
    </div>
  )

  const valuesDiv = (
    <div>
      {valuesSorted.map((v, i) => {
        const min = valuesSorted[valuesSorted.length - 1]
        const max = valuesSorted[0]
        const diff = max - min
        let val = ''
        if (i === 0 || i === valuesSorted.length - 1) {
          val = v
        } else {
          val = (max - (diff / 4) * i).toFixed(2)
        }
        return (
          <div key={i} className="values">
            {val}
          </div>
        )
      })}
    </div>
  )

  return (
    <div className={`${props.type}-graph`}>
      <div className="title">
        <span>{props.type === 'cpu' ? 'CPU' : 'Memory'} usage</span>
      </div>
      <div className={`${props.type}-container`}>
        <div className="left">
          <span>
            {props.type.toUpperCase()}{' '}
            {props.type === 'cpu' ? '(cores)' : 'bytes'}
          </span>
        </div>
        <div className="right">
          <div className="chart-wrapper">
            <div>{valuesDiv}</div>
            <div className="chart">
              <div>
                <canvas width="300px" height="100px" ref={canvasRef}></canvas>
              </div>
              <div className="times">{datesDiv}</div>
            </div>
          </div>
          <div className="time">Time</div>
        </div>
      </div>
    </div>
  )
}

export default MachineGraph
