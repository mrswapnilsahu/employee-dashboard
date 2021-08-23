import React from 'react';
import Dashboard from './pages/Dashboard';
import Sidenav from './pages/Sidenav';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';

function App() {
	return (
		<div className="App">
			<Grid container spacing={3}>
				<Grid item xs={6} sm={3}>
					<Container maxWidth="md">
						<Sidenav />
					</Container>
				</Grid>
				<Grid item xs={6} sm={9}>
					<Dashboard />
				</Grid>
			</Grid>
		</div>
	);
}

export default App;