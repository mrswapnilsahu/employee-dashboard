import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


function Team({ teamHead, teamName, teams, setTeams, addTeam, setTeamHead, setTeamName, id, alreadyExist, employees }) {
    const [open, setOpen] = useState(false);
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


    return (
        <>
            <IconButton aria-label="delete" color="primary" onClick={handleClickOpen} >
                <AddIcon />
            </IconButton>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Team</DialogTitle>
                <Container maxWidth="lg">
                    <TextField fullWidth margin="normal" error={(!teamName)} id="outlined-basic" label="Team Name" value={teamName}
                        onChange={(e) => {
                            setTeamName(e.target.value);
                        }} variant="filled" helperText={!teamName ? 'Team name is required.' : (alreadyExist ? "Team already exist." : "")} />
                    <FormControl variant="filled" fullWidth margin="normal" error={(!teamHead)}>
                        <InputLabel id="demo-simple-select-filled-label">Team Head</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={teamHead}
                            onChange={(e) => {
                                setTeamHead(e.target.value);
                            }}
                        >
                            <MenuItem value="">
                                <em>Select Team Lead</em>
                            </MenuItem>
                            {employees.map(({ id, empName }) => {
                                return <MenuItem value={id}>{empName}</MenuItem>
                            })}
                        </Select>
                        {!teamHead && <FormHelperText>Team Head is required.</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth variant="filled" margin="normal" error={!employeeList.length}>
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
                    <Button onClick={() => {
                        addTeam(id, teamName, teamHead, employeeList);
                        setTeamName('');
                        setTeamHead('');
                        setEmployeeList([]);
                    }} variant="outlined" color="primary" disabled={!teamName}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Team;
