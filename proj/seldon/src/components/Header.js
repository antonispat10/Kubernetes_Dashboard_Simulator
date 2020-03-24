import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Header() {
  const history = useHistory()

  return (
    <div className="header">
      <div className="title" onClick={() => history.push('/')}>
        Home
      </div>
    </div>
  )
}
