import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

function Team({ teamHead, teamName, teams, addTeam, setTeamHead, setTeamName, id, addEmployee }) {
    const [empName, setEmpName] = useState("")
    const [empMail, setEmpMail] = useState("")
    const [empPhone, setEmpPhone] = useState("")
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


    return (
        <>
            <Button variant="contained" color="primary" onClick={handleClickOpen} size="small">
                <AddIcon />
            </Button>
            <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Team</DialogTitle>
                <Container maxWidth="lg">
                    <TextField fullWidth margin="normal" error={(!teamName)} id="outlined-basic" label="Team Name" value={teamName}
                        onChange={(e) => {
                            setTeamName(e.target.value);
                        }} variant="filled" helperText={!teamName ? 'Team name is required.' : (alreadyExist ? "Team already exist." : "")} />
                    <TextField fullWidth margin="normal" error={(!teamHead)} id="outlined-basic" label="Team Head" value={teamHead}
                        onChange={(e) => {
                            setTeamHead(e.target.value);
                        }} variant="filled" helperText={!teamHead ? 'Team Head is required.' : ""} />
                </Container>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        addTeam(id, teamName, teamHead);
                        setTeamName('');
                        setTeamHead('');
                    }} variant="outlined" color="primary" disabled={!teamName}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            
            <ul>
                {teams && teams.map(({ teamId, teamName, teamHead, employees }) => {
                    return <li key={teamId}>{teamName}-{teamHead}
                        <input
                            placeholder="Employee Name"
                            name="empName"
                            value={empName}
                            onChange={(e) => {
                                setEmpName(e.target.value);
                            }}
                        />
                        <input
                            placeholder="Employee Mail"
                            name="empMail"
                            value={empMail}
                            onChange={(e) => {
                                setEmpMail(e.target.value);
                            }}
                        />
                        <input
                            placeholder="Employee Phone"
                            name="empPhone"
                            value={empPhone}
                            onChange={(e) => {
                                setEmpPhone(e.target.value);
                            }}
                        />
                        <span>
                            <button
                                onClick={() => {
                                    addEmployee(teamId, empName, empMail, empPhone);
                                    setEmpName('');
                                    setEmpMail('');
                                    setEmpPhone('');
                                }}
                            >
                                Add Employee
                            </button>
                        </span>
                    </li>
                })}
            </ul>
        </>
    )
}

export default Team;
