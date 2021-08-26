import React, { useState } from "react";
import Team from "./Team";

const Department = ({ id, departmentName, teams, addTeam }) => {
    const [teamHead, setTeamHead] = useState("");
    const [teamName, setTeamName] = useState("");
    return (
        <li key={id}>
            {departmentName}
            <Team teamHead={teamHead} teamName={teamName} setTeamHead={setTeamHead} setTeamName={setTeamName} teams={teams} addTeam={addTeam} id={id} />
        </li>
    );
};

export default Department;