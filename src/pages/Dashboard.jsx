import React, {useState, useEffect} from 'react';

function Dashboard() {

    const [departments, setDepartments] = useState([]);
    const [departmentName, setDepartmentName] = useState('');

    useEffect(() => {
        const departmentCollection = localStorage.getItem('department') ? JSON.parse(localStorage.getItem('department')) : [];
        // console.log(departmentCollection);
        setDepartments(departmentCollection);
    }, []);

    const saveDepartment = () => {
        let departmentCollection = departments;
        // debugger;
        if (departmentCollection.length === 0) {
            departmentCollection = [{
                id: 1,
                departmentName: departmentName,
                teams: []
            }];
        } else {
            const isDepartmentExist = departmentCollection.some(department => {
                return department.departmentName.toLowerCase() === departmentName.toLowerCase()
            });
            if (isDepartmentExist) {
                return;
                // ToDo: Set error 'Department already exists'.
            } else {
                let id = +departmentCollection[departmentCollection.length - 1].id;
                const department = {
                    id: ++id,
                    departmentName: departmentName,
                    teams: []
                };
                departmentCollection.push(department);
            }
        }
        setDepartments(departmentCollection);
        setDepartmentName('');
    };

    return (
        <>
            <small>Department Name: </small>
            <input label="Department Name"
                name="departmentName" value={departmentName} onChange={(e) => {
                    setDepartmentName(e.target.value)
                }} />
            <button onClick={saveDepartment}>Save Department</button>
            {!departmentName && <small>Department name is required.</small>}

            <h2>Department</h2>
            <ul>
                {departments.map(({ id, departmentName }) => {
                    return <li key={id}>{departmentName}</li>
                })}
            </ul>
        </>
    )
}

export default Dashboard
