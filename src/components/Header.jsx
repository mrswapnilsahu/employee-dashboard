import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

function Header() {
    return (
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit">
                        <AssignmentIndIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Employee Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
    )
}

export default Header;
