import React, { useContext, useEffect } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import MachineContext from '~/context/MachineContext'
import { useParams } from 'react-router-dom'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const headCells = [
  {
    id: 'name',
    disablePadding: true,
    label: 'Name',
  },
  { id: 'node', disablePadding: false, label: 'Node' },
  { id: 'status', disablePadding: false, label: 'Status' },
  { id: 'restarts', disablePadding: false, label: 'Restarts' },
  { id: 'age', disablePadding: false, label: 'Age' },
  { id: 'cpu', disablePadding: false, label: 'CPU (cores)' },
  {
    id: 'memory',
    disablePadding: false,
    label: 'Memory (bytes)',
  },
]

function EnhancedTableHead(props) {
  const { orderBy, order, onRequestSort } = props
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={
                headCell.id === 'name' ||
                headCell.id === 'age' ||
                headCell.id === 'status'
              }
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
const EnhancedTableToolbar = props => {
  return (
    <Toolbar>
      <Typography variant="h6" id="tableTitle">
        {props.name}
      </Typography>
    </Toolbar>
  )
}

export default function MachineProgramsTable() {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const machines = useContext(MachineContext)
  const { id } = useParams()
  const machine = machines[id]

  useEffect(() => {
    return () => {
      setPage(0)
      setRowsPerPage(5)
    }
  }, [id])
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  function createData({ id, name, node, status, restarts, age, cpu, memory }) {
    return { id, name, node, status, restarts, age, cpu, memory }
  }
  const machinePrograms = machine.programs
  const rows = machinePrograms.map(data => {
    return createData(data)
  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows = () => {
    const length = rows.length > rowsPerPage ? rowsPerPage : rows.length
    return length - Math.min(rowsPerPage, rows.length - page * length)
  }

  const rowsPerPageOptions = rowsLength => {
    if (rowsLength >= 25) return [5, 10, 25]
    else if (rowsLength >= 10) return [5, 10]
    else return [rowsLength]
  }

  return (
    <div>
      <Paper>
        <EnhancedTableToolbar name={machine.name} />
        <TableContainer>
          <Table aria-labelledby="tableTitle" aria-label="enhanced table">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.node}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.restarts}</TableCell>
                      <TableCell>{row.age}</TableCell>
                      <TableCell>{row.cpu}</TableCell>
                      <TableCell>{row.memory}</TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows() > 0 && (
                <TableRow style={{ height: 45 * emptyRows() }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          key={page}
          rowsPerPageOptions={rowsPerPageOptions(rows.length)}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}
