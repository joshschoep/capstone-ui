import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import ShowArticle from './resources/articles/Show';
import News from './routes/News';
import Root from './routes/Root';

interface RouteData {
    name?: string;
    exact?: boolean;
    path: string;
    component: typeof React.Component | (() => JSX.Element);
}

interface RouterProps {
    children: React.ReactNode;
}

export const Routes: RouteData[] = [
    {name: "Home", path: "/", exact: true, component: Root},
    {name: "News", path: "/news", component: News},
    {name: "Nav Item Three", path: "/nav3", component: () => {return <span>undefined</span>}},
    {name: "Nav Item Four", path: "/nav4", component: () => {return <span>undefined</span>}},
    {name: "Nav Item Five", path: "/nav5", component: () => {return <span>undefined</span>}},
    
    {path: "/articles/:id", component: ShowArticle }
]

export default function AppRouter(props: RouterProps) {
    return (
        <Router>
            { props.children }
            <Switch>
                {
                    Routes.map(route => {
                        return <Route exact={route.exact} key={route.path} path={route.path} component={route.component} />
                    })
                }
            </Switch>
        </Router>
    )
}