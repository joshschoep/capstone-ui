import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Users } from '../../api/Index';
import User from '../../api/User';
import Loading from '../../components/loading/Loading';
import UserForm from './form/Form';

interface EditUserParams {
    id: string;
}

export default function EditUser() {
    const { id } = useParams<EditUserParams>();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        Users.get(parseInt(id)).then(response => {
            setUser(response.data);
        });
    }, [id]);
    
    if(user){
        return <main><UserForm title="EDIT EMPLOYEE" user={user} method="PUT" route={`/users/${user.id}`} /></main>
    }else{
        return <Loading />
    }
}