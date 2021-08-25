import React, { useState } from "react";
import Team from "./Team";

const Department = ({ id, departmentName, teams, addTeam, addEmployee }) => {
    const [teamHead, setTeamHead] = useState("");
    const [teamName, setTeamName] = useState("");
    return (
        <li key={id}>
            {departmentName}
            <Team teamHead={teamHead} teamName={teamName} setTeamHead={setTeamHead} setTeamName={setTeamName} teams={teams} addTeam={addTeam} addEmployee={addEmployee} id={id} />
        </li>
    );
};

export default Department;