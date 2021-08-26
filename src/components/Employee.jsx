import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container } from '@material-ui/core';

function Employee({employees, setEmployees}) {
    const [open, setOpen] = useState(false);
    const [empName, setEmpName] = useState("");
    const [empMail, setEmpMail] = useState("");
    const [empPhone, setEmpPhone] = useState("");
    const [alreadyExist, setAlreadyExist] = useState(false);
    // const [employees, setEmployees] = useState([]);

    const saveEmployee = () => {
        let employeesCollection = employees;
        // debugger;
        if (employeesCollection.length === 0) {
            employeesCollection = [
                {
                    id: 1,
                    empName,
                    empPhone,
                    empMail
                },
            ];
        } else {
            const isEmployeeExist = employeesCollection.some(
                (employee) => {
                    return (
                        employee.empMail.toLowerCase() ===
                        empMail.toLowerCase()
                    );
                }
            );
            if (isEmployeeExist) {
                setAlreadyExist(true);
                return;
            } else {
                let id =
                    +employeesCollection[employeesCollection.length - 1].id;
                const employee = {
                    id: ++id,
                    empName,
                    empPhone,
                    empMail
                };
                employeesCollection.push(employee);
            }
        }
        console.log(employeesCollection);
        setEmployees(employeesCollection);
        setEmpName("");
        setEmpPhone("");
        setEmpMail("");
        setAlreadyExist(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                ADD EMPLOYEE
            </Button>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
                <Container maxWidth="lg">
                    <TextField fullWidth margin="normal" error={(!empName)} id="outlined-basic" label="Employee Name" value={empName}
                        onChange={(e) => {
                            setEmpName(e.target.value);
                        }} variant="filled" helperText={!empName ? 'Employee name is required.' : (alreadyExist && "")} />
                    <TextField fullWidth margin="normal" error={(!empPhone)} id="outlined-basic" label="Employee Phone" value={empPhone}
                        onChange={(e) => {
                            setEmpPhone(e.target.value);
                        }} variant="filled" helperText={!empPhone ? 'Employee phone is required.' : (alreadyExist && "")} />
                    <TextField fullWidth margin="normal" error={(!empMail)} id="outlined-basic" label="Employee Email" value={empMail}
                        onChange={(e) => {
                            setEmpMail(e.target.value);
                        }} variant="filled" helperText={!empMail ? 'Employee email is required.' : (alreadyExist ? "Employee already exist." : "")} />
                </Container>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={saveEmployee} variant="outlined" color="primary" disabled={!empName}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Employee;
