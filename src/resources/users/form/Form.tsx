import React, { useEffect, useState } from 'react';
import formStyles from '../../../Form.module.scss';
import styles from './Form.module.scss';
import User, { EmployeeCapacities, CAPACITY_FULL_TIME, CAPACITY_PART_TIME, EmployeeRoles, EmployeeTitles, ROLE_ADMIN, ROLE_USER, UserError, UserFieldMessages } from '../../../api/User';
import Button from '../../../components/inputs/button/Button';
import { Auth, Users } from '../../../api/Index';
import { AxiosError, AxiosResponse } from 'axios';
import TextInput from '../../../components/inputs/text/TextInput';

interface UserFormProps {
    title: string;
    user: User;
    method: "PUT" | "POST";
    route: string;
}

export default function UserForm(props: UserFormProps) {
    const [user, setUser] = useState<User>(props.user);
    const [currentUser, setCurrentUser] = useState<User>({} as User);
    const [error, setError] = useState<UserError>({ message: "", errors: {} as UserFieldMessages });

    useEffect(() => {
        Auth.user().then(response => {
            setCurrentUser(response.data);
        });
    }, []);


    const handleTextChange = (
        event: React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const name = event.target.name;

        if(
            name === "first_name" ||
            name === "last_name" ||
            name === "email" || 
            name === "mobile" || 
            name === "notes"
        ){
            let newUser = {...user};
            newUser[name] = event.target.value;
            setUser(newUser);
        }
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(
            (event.target.name === "title" && EmployeeTitles.includes(event.target.value)) ||
            (event.target.name === "role" && EmployeeRoles.includes(event.target.value))
        ) {
            let newUser = {...user};
            newUser[event.target.name] = event.target.value;
            setUser(newUser);
        }
    }

    const handleRadioChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.name === "capacity" && EmployeeCapacities.includes(event.target.value)) {
            let newUser = {...user};
            newUser[event.target.name] = event.target.value;
            setUser(newUser);
        }
    }

    const handleCheckboxChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.name === "notify"){
            let newUser = {...user};
            newUser[event.target.name] = event.target.checked;
        }
    }

    const handleSubmit = (event: React.FormEvent ) => {
        if(!user.notify) user.notify = false;

        event.preventDefault();
        let callback = (response: AxiosResponse) => {
            window.location.replace('/');
        };
        let errorCallback = (err: AxiosError<UserError>) => {
            if(err.response && err.response.status === 422 && err.response.data){
                setError(err.response.data);
            }
        };
        Auth.startSession().then(session => {
            if(props.method === "POST"){
                Users.post(user).then(callback).catch(errorCallback);
            }else{
                Users.put(user.id, user).then(callback).catch(errorCallback);
            }
        });
    }

    const errorText = (name: keyof UserFieldMessages) => {
        if(error.errors[name]) {
            return <p className={formStyles.error_text}>{ error.errors[name] }</p>
        }else{
            return "";
        }
    }

    return (
        <section className={formStyles.centerpiece}>
            <h2>{ props.title }</h2>
            <form onSubmit={handleSubmit} >
                <TextInput<User, UserError> 
                    title="First Name" 
                    type="text" 
                    name="first_name" 
                    value={user.first_name} 
                    callback={handleTextChange} 
                    error={error}
                />
                <TextInput<User, UserError> 
                    title="Last Name" 
                    type="text" 
                    name="last_name" 
                    value={user.last_name} 
                    callback={handleTextChange} 
                    error={error}
                />
                <label>Title
                    <select placeholder="Select a Title" name="title" value={user.title} onChange={handleSelectChange} >
                        <option disabled hidden value=""></option>
                        {
                            EmployeeTitles
                                .map(title => {
                                    return <option key={title} value={title}>{title}</option>
                                })
                        }
                    </select>
                    { errorText("title") }
                </label>
                <label>Role
                    <select disabled={currentUser.role !== ROLE_ADMIN} name="role" value={user.role} onChange={handleSelectChange} >
                        <option value={ROLE_USER}>User</option>
                        <option value={ROLE_ADMIN}>Admin</option>
                    </select>
                    { errorText("title") }
                </label>
                <section className={formStyles.radiosection}>
                    <span>Work Capacity</span>
                    <label><input type="radio" name="capacity" checked={user.capacity === CAPACITY_PART_TIME} value={CAPACITY_PART_TIME} onChange={handleRadioChange}/> Part-Time</label>
                    <label><input type="radio" name="capacity" checked={user.capacity === CAPACITY_FULL_TIME} value={CAPACITY_FULL_TIME} onChange={handleRadioChange}/> Full-Time</label>
                    { errorText("capacity") }
                </section>
                <label>Notes &#38; Comments
                    <textarea name="notes" rows={5} onChange={handleTextChange}>{ user.notes }</textarea>
                    { errorText("notes") }
                </label>
                <TextInput<User, UserError> 
                    title="Mobile" 
                    type="text" 
                    name="mobile" 
                    value={user.mobile} 
                    callback={handleTextChange} 
                    error={error}
                />
                <TextInput<User, UserError> 
                    title="Personal Email" 
                    type="email" 
                    name="email" 
                    value={user.email} 
                    callback={handleTextChange} 
                    error={error}
                />
                <section className={styles.save_and_notify}>
                    <Button type="submit">Save</Button>
                    <label>
                        <input type="checkbox" name="notify" checked={user.notify} onChange={handleCheckboxChange} />
                        Notify Employee
                    </label>
                </section>
            </form>
        </section>
    )
} 