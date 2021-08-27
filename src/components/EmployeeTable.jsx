import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { TextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container } from '@material-ui/core';

const columns = [
    { id: 'sno', label: 'S.no' },
    { id: 'name', label: 'Name' },
    {
        id: 'email',
        label: 'Email',
    },
    {
        id: 'phone',
        label: 'Phone',
    },
    {
        id: 'action',
        label: 'Action',
    },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function EmployeeTable({ employees, setEmployees, searchResults, filterEmployeeData }) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = useState(false);
    const [empId, setEmpId] = useState();
    const [empName, setEmpName] = useState("");
    const [empMail, setEmpMail] = useState("");
    const [empPhone, setEmpPhone] = useState("");
    let i=0;
    // const [employee,setEmployee] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    

    const editEmployee = (empId) => {
        const emp = employees.find(({ id }) => {
            return id === empId;
        })
        if (emp) {
            setEmpId(empId);
            setEmpName(emp.empName);
            setEmpMail(emp.empMail);
            setEmpPhone(emp.empPhone);
        }
    }

    const saveEditedEmployee = () => {
        let employeesCollection = employees
        const emp = employeesCollection.find(({ id }) => {
            return id === empId;
        })
        if (emp) {
            emp.empName = empName;
            emp.empMail = empMail;
            emp.empPhone = empPhone;
            setEmployees(
                employees.map((employee) => {
                    return employee.id === empId ? { ...emp } : employee;
                })
            );
        }

    }

    return (
        <>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Toolbar>
                        <Typography variant="h6" id="tableTitle" component="div" style={{ flexGrow: 1 }}>
                            Employees List
                        </Typography>
                        <TextField placeholder="Search" onChange={filterEmployeeData} />
                    </Toolbar>


                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.length > 0 ? employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={employee.id}>
                                        <TableCell>
                                            {++i}
                                        </TableCell>
                                        <TableCell>
                                            {employee.empName}
                                        </TableCell>
                                        <TableCell>
                                            {employee.empMail}
                                        </TableCell>
                                        <TableCell>
                                            {employee.empPhone}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton aria-label="delete" color="primary" onClick={() => editEmployee(employee.id)}>
                                                <EditIcon onClick={handleClickOpen} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            }) : <center>No Employees available</center>}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={employees.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Employee</DialogTitle>
                <Container maxWidth="lg">
                    <TextField fullWidth margin="normal" error={(!empName)} id="outlined-basic" label="Employee Name" value={empName}
                        onChange={(e) => {
                            setEmpName(e.target.value);
                        }} variant="filled" helperText={!empName ? 'Employee name is required.' : ""} />
                    <TextField fullWidth margin="normal" error={(!empPhone)} id="outlined-basic" label="Employee Phone" value={empPhone}
                        onChange={(e) => {
                            setEmpPhone(e.target.value);
                        }} variant="filled" helperText={!empPhone ? 'Employee phone is required.' : ""} />
                    <TextField fullWidth margin="normal" error={(!empMail)} id="outlined-basic" label="Employee Email" value={empMail}
                        onChange={(e) => {
                            setEmpMail(e.target.value);
                        }} variant="filled" helperText={!empMail ? 'Employee email is required.' : ""} />
                </Container>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                    <Button variant="outlined" color="primary" disabled={!empName} onClick={saveEditedEmployee}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
