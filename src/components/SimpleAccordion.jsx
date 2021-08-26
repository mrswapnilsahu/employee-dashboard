import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { FormHelperText } from '@material-ui/core';

export default function SimpleAccordion({ teams, employees, setTeams }) {
  // const [employeeMapped, setEmployeeMapped] = useState({})
  const [open, setOpen] = useState(false);
  // const [alreadyExist, setAlreadyExist] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);

  const handleChange = (event) => {
    setEmployeeList(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mapEmployeeData = (employeeId) => {
    let employeeData = employees.find(({ id }) => {
      return +id === +employeeId;
    })
    if (employeeData) {
      return `${employeeData.empName}`;
    }
  }

  const removeMember = (teamId, employeeId) => {
    console.log(teamId, employeeId);
    let teamsCollection = teams;
    const team = teamsCollection.find((team) => {
      return team.teamId === teamId;
    })
    team.employeeIds = team.employeeIds.filter((empId) => {
      return empId !== employeeId;
    });
    setTeams(teamsCollection);
  }

  const addEmployeeToTeam = (teamId) => {
    // console.log(teamId)
    let teamsCollection = teams;
    const team = teamsCollection.find((team) => {
      return team.teamId === teamId;
    })
    if (team) {
      employeeList.forEach((emp)=>{
        if(team.employeeIds.indexOf(emp) === -1){
          team.employeeIds.push(emp);
        }
      })
      setTeams(teamsCollection);
      setEmployeeList([]);
    }
  }

  return (
    <>
      {teams.map(({ teamId, teamName, teamHead, employeeIds }) => {
        return (
          <>
            <Accordion key={teamId}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="button" display="block" gutterBottom>{teamName} - {mapEmployeeData(teamHead)}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {employeeIds ? employeeIds.map((employeeId) => {
                    return <li key={employeeId}>{mapEmployeeData(employeeId)} <button onClick={() => removeMember(teamId, employeeId)}>X</button></li>
                  }) : "No employees added to the team. Please add employees."}
                  <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    ADD Employees
                  </Button>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title" key={teamName}>
              <DialogTitle id="form-dialog-title">Add Employees</DialogTitle>
              <Container maxWidth="lg">
                <FormControl fullWidth variant="filled" error={!employeeList.length}>
                  <InputLabel>Employees</InputLabel>
                  <Select
                    multiple
                    value={employeeList}
                    onChange={handleChange}
                  >
                    {employees.map(({ empName, id }) => (
                      <MenuItem key={empName} value={id}>
                        {empName}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{!employeeList.length ? 'Select Employees.' : ""}</FormHelperText>
                </FormControl>
              </Container>
              <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="secondary">
                  Cancel
                </Button>
                <Button onClick={() => addEmployeeToTeam(teamId)} variant="outlined" color="primary" disabled={employeeList.length===0}>
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )
      })}
    </>

  );
}
