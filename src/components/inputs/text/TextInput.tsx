import React from 'react';
import Error from '../../../api/Error';
import FormError from '../error/FormError';

export interface TextInputProps<ObjectType, ErrorType extends Error> {
    title: string,
    name: keyof ObjectType,
    type: "text" | "email" | "password",
    value: string,
    callback: React.ChangeEventHandler<HTMLInputElement>
    error: ErrorType
}

export default function TextInput<ObjectType, ErrorType extends Error>(props: TextInputProps<ObjectType, ErrorType>) {
    return (
        <label>{props.title}
            <input name={props.name as string} type={props.type} value={props.value as string || ""} onChange={props.callback}/>
            <FormError<ErrorType> error={props.error} field={props.name} />
        </label>
    )
}