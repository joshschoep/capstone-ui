import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    RouteProps,
  } from "react-router-dom";
import ShowArticle from './resources/articles/show/Show';
import Login from './routes/login/Login';
import News from './routes/News';
import Root from './routes/Root';
import CreateUser from './resources/users/Create'
import EditUser from './resources/users/Edit';
import ErrorPage404 from './routes/error/Error';

interface RouteData extends RouteProps<string> {
    name?: string;
    path: string;
}

interface RouterProps {
    children: React.ReactNode;
}

export const Routes: RouteData[] = [
    {name: "Home", path: "/", exact: true, component: Root},
    {name: "News", path: "/news", component: News},
    {name: "Nav Item Three", path: "/nav3", component: ErrorPage404},
    {name: "Nav Item Four", path: "/nav4", component: ErrorPage404},
    {name: "Nav Item Five", path: "/nav5", component: ErrorPage404},

    {path: "/login", component: Login},
    
    {path: "/articles/:id", component: ShowArticle },

    {path: "/users/create", component: CreateUser},
    {path: "/users/:id/edit", component: EditUser}
];

export default function AppRouter(props: RouterProps) {
    return (
        <Router>
            { props.children }
            <Switch>
                {
                    Routes.map(route => {
                        return <Route key={route.path} {...route} />
                    })
                }
                <Route key={404} path="/" component={ErrorPage404} />
            </Switch>
        </Router>
    )
}