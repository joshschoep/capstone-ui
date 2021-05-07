import React from 'react';
import styles from './Breadcrumb.module.scss'; 

export interface BreadcrumbProps {
    crumbs: string[]
}

export default function Breadcrumbs(props: BreadcrumbProps) {
    let depth = 1;
    return (
        <div className={styles.breadcrumbs}>
            { props.crumbs.map(crumbText => {
                return <span key={depth++} className={styles.crumb}>{ crumbText }</span>
            })}
        </div>
    )
}