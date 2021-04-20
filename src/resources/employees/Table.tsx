import React, { useEffect, useState } from 'react';
import Employee, { EmployeePage } from '../../api/Employee';
import { Employees } from '../../api/Index';

interface EmployeeTypes {
    label: string,
    property: keyof Employee,
}

const EmployeeLabels: EmployeeTypes[] = [
    {label: "First Name", property: "first_name"},
    {label: "Last Name", property: "last_name"},
    {label: "Title", property: "title"},
    {label: "Date added", property: "created_at"}
]

export default function EmployeeTable({ title = "" }) {
    const [sort, setSort] = useState("created_at" as keyof Employee);
    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(1);
    const [employees, setEmployees] = useState( {} as EmployeePage );

    const setFilterFromInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    }

    useEffect(() => {
        Employees.index({sort, filter, page}).then(response => {
            setEmployees(response.data as EmployeePage);
        });
    }, [sort, filter, page]);

    return (
        <>
            <div className="table-top">
                <h2>{ title }</h2>
                    <input 
                        type="text" 
                        name="search"
                        onChange={setFilterFromInput}
                        aria-label="Search Employees"
                        placeholder="Search Employees"
                    />
            </div>
            <table>
                <thead>
                    <tr>
                        { EmployeeLabels.map(datatype => {
                            return (
                                <th key={datatype.property}>
                                    <button
                                        disabled={datatype.property === sort}
                                        className={datatype.property === sort ? "active" : ""}
                                        onClick={() => setSort(datatype.property)}
                                    >{ datatype.label }</button>
                                </th>
                            )
                        }) }
                    </tr>
                </thead>
                <tbody>
                    { employees.data && employees.data.map(
                        employee => { return (
                                <tr key={employee.id} >
                                    { EmployeeLabels.map(datatype => {
                                        return <td key={ `${employee.id}.${datatype.property}` } >{ employee[datatype.property] }</td>
                                    }) }
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
            <div className="table-links">
                <a href="/employees/create">ADD A NEW EMPLOYEE</a>
                <div className="pagination">
                    <span>Page {employees.current_page} of {employees.last_page} </span>
                    <button 
                        disabled={employees.prev_page_url === null}
                        onClick={() => setPage(employees.current_page - 1)}
                    >Previous</button>
                    <button  
                        disabled={employees.first_page_url === "" || employees.current_page === 1}
                        onClick={() => setPage(1)}
                    >1</button>
                    <button 
                        disabled={employees.last_page_url === "" || employees.current_page === employees.last_page}
                        onClick={() => setPage(employees.last_page)}
                    >{employees.last_page}</button>
                    <button 
                        disabled={employees.next_page_url === ""}
                        onClick={() => setPage(employees.current_page + 1)}
                    >Next</button>
                </div>
            </div>
        </>
    )
}