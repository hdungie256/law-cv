import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { IconButton } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#dfe8f5',
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CusomizedTable = (props) => {
  const [vh, setVh] = React.useState(Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0))
  const [numRowsPerPage, setNumRowsPerPage] = React.useState(Math.floor((vh-100)/68 -1))
  
  const [pg, setpg] = React.useState(0); 

  function handleChangePage(e, newpage) { 
      setpg(newpage); 
  }

  return (
    <>
    <TableContainer>
      <Table hoverRow aria-label="customized table" 
        sx={{width: '100%',
          // "& .MuiTableRow-root:hover": {
          //   backgroundColor: "#f5f5f5"
          // }
        }}>
        <TableHead>
          <TableRow>
            {props.columnName.map((name) => (<StyledTableCell style={{backgroundColor: '#fbcca1',color:'black'}} sx={{ paddingLeft:1, paddingRight: 1, paddingTop: 2, paddingBottom: 2}}><b>{name}</b></StyledTableCell>))}
            <StyledTableCell style={{backgroundColor: '#fbcca1',color:'black'}} sx={{width: 80}} align='center'></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.slice(pg * numRowsPerPage, pg * numRowsPerPage + numRowsPerPage).map((row) => (
            <TableRow key={row.id} hover sx={{cursor: 'pointer'}} onClick={() => props.onClick(row.id)} >
              {Object.values(row).slice(1).map((cell, index) => <StyledTableCell sx={{minWidth: 120, paddingLeft:1, paddingRight: 1.5, paddingTop: 3, paddingBottom: 3}} key={index} component="th" scope="row">{cell}</StyledTableCell>)}
              <StyledTableCell align='center' sx={{padding: 1, height: 2.5}}>
                <div style={{width: '100%'}}>
                <IconButton aria-label="edit" onClick={(e) => {e.stopPropagation();props.handleEditButton(row.id)}}><ModeEditIcon /></IconButton>
                <IconButton aria-label="delete" onClick={(e) => {e.stopPropagation();props.handleDeleteButton(row.id, row.name)}}><DeleteIcon /></IconButton>
                </div>
              </StyledTableCell>
            </TableRow> 
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination 
      rowsPerPageOptions={[numRowsPerPage]} 
      component="div"
      count={props.rows.length} 
      rowsPerPage={numRowsPerPage} 
      page={pg} 
      onPageChange={handleChangePage} 
    /> 
    </>
  );
}

export default CusomizedTable;