import React from 'react';
import styles from './Loading.module.scss';
import loader from '../../logo_light_bg.png';

export default function Loading() {
    return (
        <article className={styles.centerpiece} >
            <img className={styles.loading_logo} src={loader} width={240} alt="Website logo"/>
            <p className={styles.loading_text}>Loading...</p>
        </article>
    );
}