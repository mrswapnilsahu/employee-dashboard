// import React, { useState } from 'react';
// import { Button } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import { Container } from '@material-ui/core';

// function Sidenav() {
//     const [open, setOpen] = useState(false);
//     const [fullWidth, setFullWidth] = useState(true);
//     const [maxWidth, setMaxWidth] = useState('sm');

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };
//     return (
//         <>
//             <Button variant="contained" color="primary" onClick={handleClickOpen}>
//                 ADD DEPARTMENT
//             </Button>
//             <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//                 <DialogTitle id="form-dialog-title">Add Department</DialogTitle>
//                 <Container maxWidth="md">
//                     <TextField error id="outlined-basic" label="Deparment Name" variant="outlined" helperText="Incorrect entry." />
//                 </Container>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleClose} color="primary">
//                         Save
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     )
// }

// export default Sidenav
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

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

export default function Sidenav({departments}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Department List
                </ListSubheader>
            }
            className={classes.root}
        >
            {
                departments.map(({ id, departmentName }) => {
                    return <ListItem button>
                        <ListItemText primary={departmentName} />
                    </ListItem>
                })
            }

            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
}

