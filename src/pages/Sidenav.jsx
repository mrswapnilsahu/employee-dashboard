import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Team from "../components/Team";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function Sidenav({ departments, fetchTeams, teams, setTeams, addTeam, setTeamHead, setTeamName, teamHead, teamName, alreadyExist, setCurrentPage, employees }) {
    const classes = useStyles();

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
        >
            <ListItem button onClick={() => { setCurrentPage("Employee") }}>
                <ListItemText>Employees List</ListItemText>
            </ListItem>
            <ListSubheader component="div" id="nested-list-subheader">
                Department List
            </ListSubheader>
            {
                departments.map(({ id, departmentName }) => {
                    return <ListItem button key={id}>
                        <ListItemText key={`list_item_${id}`} primary={departmentName} onClick={() => { fetchTeams(id); setCurrentPage("Teams") }} />
                        <Team key={`team_${id}`} teamHead={teamHead} teamName={teamName} setTeamHead={setTeamHead} setTeamName={setTeamName} teams={teams} setTeams={setTeams} addTeam={addTeam} id={id} alreadyExist={alreadyExist} employees={employees} />
                    </ListItem>
                })
            }
        </List>
    );
}

