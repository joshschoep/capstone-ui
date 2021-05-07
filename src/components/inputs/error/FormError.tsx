import React from 'react';
import Error from '../../../api/Error';
import formStyles from '../../../Form.module.scss';

export interface FormErrorProps<ErrorType extends Error> {
    error: ErrorType,
    field: keyof ErrorType["errors"];
}

export default function FormError<T extends Error>(props: FormErrorProps<T>) {
    if(props.error.errors[props.field]) {
        return <p className={formStyles.error_text}>{ props.error.errors[props.field] }</p>
    }else{
        return <></>;
    }
}