import React, { useState, useEffect } from "react";
import Employee from "../components/Employee";
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container } from '@material-ui/core';
import SimpleAccordion from "../components/SimpleAccordion";
import EmployeeData from "../data/data.json";
import Sidenav from "./Sidenav";
import Grid from '@material-ui/core/Grid';
import EmployeeTable from "../components/EmployeeTable";

function Dashboard() {
    const [departments, setDepartments] = useState([]);
    const [departmentName, setDepartmentName] = useState("");
    const [teamHead, setTeamHead] = useState("");
    const [teamName, setTeamName] = useState("");
    const [employees, setEmployees] = useState([]);
    const [open, setOpen] = useState(false);
    const [alreadyExist, setAlreadyExist] = useState(false);
    const [teams, setTeams] = useState([]);
    const [currentPage, setCurrentPage] = useState("Employee");
    const [empName, setEmpName] = useState("");
    const [empMail, setEmpMail] = useState("");
    const [empPhone, setEmpPhone] = useState("");

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
    // console.log(EmployeeData);

    const addTeam = (departmentId, teamName, teamHead, employeeIds) => {
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
                employeeIds,
            };
            if (target.teams.length) {
                let id = +target.teams[target.teams.length - 1].teamId;
                team.teamId = ++id;
            } else {
                team.teamId = 1;
            }
            target.teams.push(team);
            setDepartments(departmentCollection);
        } else {
            // ToDo : Set error : Team alreaady exist
            setAlreadyExist(true);
        }
    };

    const fetchTeams = (deptId) => {
        let teamsCollection = departments.find(({ id }) => {
            return id === deptId;
        });
        if (teamsCollection.teams) {
            setTeams(teamsCollection.teams);
        }
    }

    return (
        <>
            <Grid container>
                <Grid item sm={3}>
                    <Sidenav departments={departments} fetchTeams={fetchTeams} departmentName={departmentName}
                        teams={teams} setTeams={setTeams}
                        addTeam={addTeam} setTeamName={setTeamName} setTeamHead={setTeamHead} teamHead={teamHead} teamName={teamName} alreadyExist={alreadyExist} setCurrentPage={setCurrentPage} employees={employees}/>
                </Grid>
                <Grid item sm={9} >
                    <Grid container item xs={6} sm={9} spacing={10}>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                                ADD DEPARTMENT
                            </Button>
                        </Grid>
                        <Grid item>
                            <Employee employees={employees} setEmployees={setEmployees} empName={empName} empMail={empMail} empPhone={empPhone} setEmpName={setEmpName} setEmpMail={setEmpMail} setEmpPhone={setEmpPhone}/>
                        </Grid>
                    </Grid>

                    <Grid item>
                        {
                            currentPage === "Employee" ?
                                <EmployeeTable employees={employees} setEmployees={setEmployees}/>
                                : (teams.length > 0) ? <SimpleAccordion teams={teams} setTeams={setTeams} employees={employees} key="_op_"/> : "No teams added.Please add teams"
                        }
                    </Grid>
                </Grid>
            </Grid>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
        </>
    );
}

export default Dashboard;