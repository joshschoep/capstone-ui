import React, { MouseEventHandler } from 'react';
import styles from './Button.module.scss';

export interface ButtonProps {
    children: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    type?: "button" | "submit" | "reset"
    href?: string
}

export default function Button(props: ButtonProps) {
    if(props.onClick || props.type){
        return ( 
            <button 
                className={styles.button} 
                onClick={props.onClick}
                type={props.type}
            >
                { props.children }
            </button>
        )
    }else{
        return <a className={styles.button} href={props.href}>{ props.children }</a>
    }
}