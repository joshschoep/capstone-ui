import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { Auth } from '../../api/Index';
import { Routes } from '../../Router';
import User from '../../api/User';
import { NavLink } from 'react-router-dom';
import logo from '../../logo_dark_bg.png'

export default function Header() {
    const [user, setUser] = useState({} as User);

    useEffect(() => {
        Auth.user().then(response => {
            setUser(response.data as User);
        })
    }, []);

    return (
        <header>
            <div className={styles.title_bar}>
                <img src={logo} className={styles.logo} alt="Woodridge Logo" />
                    <h1 className={ styles.website_name }>TRAINING</h1>
                    <li className={ styles.auth + " dropdown" }>
                        <button className={styles.user}>{ user.full_name }</button>
                        <div className="dropdown-content">
                            <button onClick={Auth.logout} className="user-logout">Log out</button>
                        </div>
                    </li>
            </div>
            <nav className={styles.main_nav}>
                {
                    Routes.filter(route => {
                        return route.name
                    }).map(route => {
                        return (
                        <li key={route.name}>
                            <NavLink 
                                to={route.path}
                                exact={true}
                                className={styles.nav_button}
                                activeClassName={styles.nav_button_active}
                            >
                                {route.name}
                            </NavLink>
                        </li>
                    ) })
                }
            </nav>
        </header>
    )
}