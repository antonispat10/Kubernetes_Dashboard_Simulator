import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { useParams, useHistory } from 'react-router-dom'

export function Sidebar(props) {
  const { id } = useParams()
  const machines = props.machines
  const history = useHistory()
  const items = (
    <div>
      <List>
        {machines.map((text, index) => (
          <div key={text.id}>
            <ListItem
              key={text.id}
              onClick={() => history.push(`/machine/${text.id}`)}
              button
              className={`item ${parseInt(id) === index ? 'active' : ''}`}>
              <ListItemText primary={text.name} />
              <Divider />
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  )
  const sidebar = (
    <nav>
      <Drawer variant="permanent">{items}</Drawer>
    </nav>
  )

  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">{sidebar}</div>
    </div>
  )
}

export default Sidebar
