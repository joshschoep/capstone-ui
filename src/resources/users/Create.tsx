import React from 'react';
import User from '../../api/User';
import UserForm from './form/Form';

export default function CreateUser() {
    return <main><UserForm title="ADD A NEW EMPLOYEE" user={{} as User} method="POST" route="/users" /></main>
}