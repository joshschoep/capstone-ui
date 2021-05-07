import React, { useEffect, useState } from 'react';
import User, { UserPage } from '../../../api/User';
import { Auth, Users } from '../../../api/Index';
import styles from './Table.module.scss';
import Paginator from '../../../components/paginator/Paginator';
import Button from '../../../components/inputs/button/Button';
import { Link } from 'react-router-dom';
import { convertUnixToString } from '../../../api/Date';

interface UserTypes {
    label: string,
    property: keyof User,
    transformer?: ((data: any) => string)
}

const UserLabels: UserTypes[] = [
    {label: "First Name", property: "first_name"},
    {label: "Last Name", property: "last_name"},
    {label: "Title", property: "title"},
    {label: "Date Added", property: "created_at", transformer: (data) => { return convertUnixToString(parseInt(data)) }}
]

export default function UserTable({ title = "" }) {
    const [sort, setSort] = useState("created_at" as keyof User);
    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState( {} as UserPage );
    const [currentUser, setCurrentUser] = useState( {} as User );

    const setFilterFromInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    }

    const deleteUser = (id: number) => {
        var result = window.confirm("Are you sure you want to delete this user?");
        if(result) {
            Users.delete(id).then(response =>
                { setPage(1) }
            )
        }
    }

    useEffect(() => {
        Users.index({sort, filter, page}).then(response => {
            setUsers(response.data as UserPage);
        });
    }, [sort, filter, page]);

    useEffect(() => {
        Auth.user().then(response => {
            setCurrentUser(response.data as User);
        });
    }, []);

    return (
        <>
            <div className={styles.table_top}>
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
                    <tr className={styles.row}>
                        { UserLabels.map(datatype => {
                            return (
                                <th key={datatype.property}>
                                    <button
                                        disabled={datatype.property === sort}
                                        className={datatype.property === sort ? styles.th_active : "" }
                                        onClick={() => setSort(datatype.property)}
                                    >{ datatype.label }</button>
                                </th>
                            )
                        }) }
                        { currentUser && currentUser.role === 'admin' && 
                            <th aria-label="User Tools"></th>
                        }
                    </tr>
                </thead>
                <tbody>
                    { users.data && users.data.map(
                        user => { return (
                                <tr key={user.id} className={styles.row}>
                                    { UserLabels.map(datatype => {
                                        return <td key={ `${user.id}.${datatype.property}` } >
                                            { datatype.transformer ? datatype.transformer(user[datatype.property]) : user[datatype.property] }
                                        </td>
                                    }) }
                                    { currentUser && currentUser.role === "admin" && 
                                        <td key={ `${user.id}.tools` } className={styles.user_tools}>
                                            <Link to={ `/users/${user.id}/edit` }>Edit</Link> | <button onClick={() => deleteUser(user.id)} >Delete</button>
                                        </td>
                                    }
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
            <div className="table-links">
                { currentUser && currentUser.role === "admin" && <Button href="/users/create">ADD A NEW EMPLOYEE</Button> }
                <Paginator data={users} setter={setPage} />
            </div>
        </>
    )
}