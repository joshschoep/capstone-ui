import React, { useEffect, useState } from 'react';
import { EmployeePage } from '../../api/Employee';
import { Employees } from '../../api/Index';

export default function EmployeeIndex() {
    const [employees, setEmployees] = useState( {} as EmployeePage );
    // useEffect(() => {
    //     Employees.index(1).then(response => {
    //         setEmployees(response.data as EmployeePage);
    //     });
    // }, []);
    return (
        <ul>
            { employees.data && employees.data.map(
                employee => { return (
                        <li>
                            <span>{`${employee.first_name} ${employee.last_name}` }</span>
                            <p>{ employee.title }</p>
                            <p>{ employee.notes }</p> 
                        </li>
                    )
                }
            )}
        </ul>
    )
}