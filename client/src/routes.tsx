import {Switch, Route, Redirect} from "react-router-dom";
import Finish from "./Components/Finish";
import Main from "./Components/Main";
import QuizComponent from "./Components/QuizComponent";

type routeItem = {
    path: string,
    exact?: boolean,
    component: React.FunctionComponent<any> | React.ComponentClass<any, any>, 
}

const routes: routeItem[] = [
    {
        path: '/',
        exact: true,
        component: Main,
    },
    {
        path: '/quiz',
        exact: false,
        component: QuizComponent,
    },
    {
        path: '/finish',
        exact: false,
        component: Finish,
    }
];

export const Routes: React.FC = () => {
    return (
        <Switch>
            {routes.map(route => {
                return <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />
            })}
            <Redirect to={'/'} />
        </Switch>
    );
};

