import React from 'react';
import styles from './Error.module.scss';
import logo from '../../logo_light_bg.png';

export default function ErrorPage() {
    return (
        <div className={styles.centerpiece}>
            <img className={styles.error_logo} src={logo} width={240} alt="Woodridge Logo" />
            <div className={styles.error_text}>
                <span>404</span>
                <span>This resource is not available</span>
            </div>
        </div>
    )
}