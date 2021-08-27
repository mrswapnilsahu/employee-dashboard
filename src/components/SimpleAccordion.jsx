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
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

export default function SimpleAccordion({ teams, employees, setTeams }) {
  // const [employeeMapped, setEmployeeMapped] = useState({})
  const [open, setOpen] = useState(false);
  const [teamID, setTeamID] = useState();
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
    // console.log(teamId, employeeId);
    // debugger;
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
      employeeList.forEach((emp) => {
        if (team.employeeIds.indexOf(emp) === -1) {
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
          <div key={teamId}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" gutterBottom>
                  Team Name: {teamName} <br/> Team Head: {mapEmployeeData(teamHead)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* <Typography style={{ width: "30%" }}> */}
                <div key={`${teamId}`} style={{ display: 'flex', justifyContent: 'left', flexWrap: 'wrap', }}>
                <div><Button color="secondary" variant="outlined" disableElevation onClick={()=>{handleClickOpen();setTeamID(teamId)}}>Add Employee</Button></div>
                  {employeeIds ? employeeIds.map((employeeId) => {
                    return (
                      <Chip
                        icon={<FaceIcon />}
                        label={mapEmployeeData(employeeId)}
                        key={employeeId}
                        color="primary"
                        onDelete={() => removeMember(teamId, employeeId)}
                        style={{margin: 5}}
                      />
                    )
                  }) : "No employees added to the team. Please add employees."}
                  </div>
                  
                {/* </Typography> */}
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
                <Button onClick={() => addEmployeeToTeam(teamID)} variant="outlined" color="primary" disabled={employeeList.length === 0}>
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )
      })}
    </>

  );
}