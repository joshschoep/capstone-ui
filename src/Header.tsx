import React from 'react';
import { NavLink } from 'react-router-dom';
import { Routes } from './Routers';

export default function Header() {
    return (
        <header>
            <h1>{ process.env.REACT_APP_WEBSITE_NAME }</h1>
            <nav>
                {
                    Routes.filter(route => {
                        return route.name
                    }).map(route => {
                        return (
                        <li key={route.path}>
                            <NavLink 
                                to={route.path}
                                exact={true}
                                activeClassName="active"
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