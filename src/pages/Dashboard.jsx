import React, { useState, useEffect } from "react";
import Department from "../components/Department";
import Employee from "../components/Employee";
import Team from "../components/Team";
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container } from '@material-ui/core';
import { Typography } from "@material-ui/core";
import SimpleAccordion from "../components/SimpleAccordion";
import EmployeeData from "../data/data.json";
import Sidenav from "./Sidenav";
import Grid from '@material-ui/core/Grid';

function Dashboard() {
    const [departments, setDepartments] = useState([]);
    const [departmentName, setDepartmentName] = useState("");
    const [employees, setEmployees] = useState([]);
    const [open, setOpen] = useState(false);
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');
    const [alreadyExist, setAlreadyExist] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    useEffect(() => {
        localStorage.setItem("department", JSON.stringify(EmployeeData.departments));
        localStorage.setItem("employees", JSON.stringify(EmployeeData.employees));
        const departmentCollection = localStorage.getItem("department")
            ? JSON.parse(localStorage.getItem("department"))
            : [];
        const employeeCollection = localStorage.getItem("employees")
            ? JSON.parse(localStorage.getItem("employees"))
            : [];
        // console.log(departmentCollection);
        setEmployees(employeeCollection);
        setDepartments(departmentCollection);
    }, []);

    const saveDepartment = () => {
        let departmentCollection = departments;
        // debugger;
        if (departmentCollection.length === 0) {
            departmentCollection = [
                {
                    id: 1,
                    departmentName: departmentName,
                    teams: [],
                },
            ];
        } else {
            const isDepartmentExist = departmentCollection.some(
                (department) => {
                    return (
                        department.departmentName.toLowerCase() ===
                        departmentName.toLowerCase()
                    );
                }
            );
            if (isDepartmentExist) {
                // ToDo: Set error 'Department already exists'.
                setAlreadyExist(true);
                return;
            } else {
                let id =
                    +departmentCollection[departmentCollection.length - 1].id;
                const department = {
                    id: ++id,
                    departmentName: departmentName,
                    teams: [],
                };
                departmentCollection.push(department);
            }
        }
        setDepartments(departmentCollection);
        setDepartmentName("");
        setAlreadyExist(false);
    };
    console.log(EmployeeData);

    const addTeam = (departmentId, teamName, teamHead) => {
        // debugger;
        let departmentCollection = departments;
        const target = departmentCollection.find(({ id }) => {
            return id === departmentId;
        });
        const isTeamExist = target.teams.some((team) => {
            return team.teamName.toLowerCase() === teamName.toLowerCase();
        });

        if (!isTeamExist) {
            const team = {
                teamName,
                teamHead,
                employees: [],
            };
            if (target.teams.length) {
                let id = +target.teams[target.teams.length - 1].teamId;
                team.teamId = ++id;
            } else {
                team.teamId = 1;
            }
            target.teams.push(team);
            setDepartments(departmentCollection);
            console.log(departments);
        } else {
            // ToDo : Set error : Team alreaady exist
        }
    };

    const addEmployee = (teamId, empName, empMail, empPhone) => {
        // let departmentCollection = departments;
        debugger;
        // const target = departmentCollection.teams.find(({ teamId }) => {
        //     return teamId === teamId;
        // });
    };

    return (
        <>
            <Grid container>
                <Grid item xs={6} sm={3}>
                    <Sidenav departments={departments} />
                </Grid>
                <Grid item xs={6} sm={9}>
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>
                        ADD DEPARTMENT
                    </Button>
                    <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Add Department</DialogTitle>
                        <Container maxWidth="lg">
                            <TextField fullWidth error={(!departmentName || alreadyExist)} id="outlined-basic" label="Department Name" value={departmentName}
                                onChange={(e) => {
                                    setDepartmentName(e.target.value);
                                }} variant="outlined" helperText={!departmentName ? 'Department name is required.' : (alreadyExist ? "Department already exist." : "")} />
                        </Container>
                        <DialogActions>
                            <Button onClick={handleClose} variant="outlined" color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={saveDepartment} variant="outlined" color="primary" disabled={!departmentName}>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {/* <small>Department Name: </small>
            <input
                label="Department Name"
                name="departmentName"
                value={departmentName}
                onChange={(e) => {
                    setDepartmentName(e.target.value);
                }}
            />
            <button onClick={saveDepartment}>Save Department</button> */}
                    {/* {!departmentName && <small>Department name is required.</small>} */}

                    <h2>Department</h2>
                    <ul>
                        {departments.map(({ id, departmentName, teams }) => {
                            return (
                                <Department
                                    key={id}
                                    id={id}
                                    departmentName={departmentName}
                                    teams={teams}
                                    addTeam={addTeam}
                                    addEmployee={addEmployee}
                                />
                            );
                        })}
                    </ul>
                    <Employee employees={employees} setEmployees={setEmployees} />
                    {/* {departments.map(({ departmentName, id, teams }) => {
                return <SimpleAccordion key={id} id={id}
                    departmentName={departmentName}
                    teams={teams}
                    addTeam={addTeam} />;
            })} */}
                </Grid>
            </Grid>
        </>
    );
}

export default Dashboard;