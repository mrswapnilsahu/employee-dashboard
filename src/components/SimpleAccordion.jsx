import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Team from './Team';

export default function SimpleAccordion({id, departmentName, teams, addTeam}) {
    const [teamHead, setTeamHead] = useState("");
    const [teamName, setTeamName] = useState("");

    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography  variant="button" display="block" gutterBottom>{departmentName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Team teamHead={teamHead} teamName={teamName} setTeamHead={setTeamHead} setTeamName={setTeamName} teams={teams} addTeam={addTeam} id={id}/>
          </Typography>
        </AccordionDetails>
      </Accordion>
  );
}
