import React, { Fragment } from 'react';
import { Route, Redirect, } from "react-router-dom";
import Login from './Page/Login'
import Register from './Page/Register';
import Profile from './Page/Profile';
import Editor from './Page/Editor';
import Viewer from './Page/Viewer';


function PrivateBundle() {
    return (
        <Fragment>
            <AutoLogin path="/" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <PrivateRoute path="/profile" exact component={Profile} />
            <PrivateRoute path="/edit/:id" exact component={Editor} />
            <PrivateRoute path="/preview/:id" exact component={Viewer} />
        </Fragment>
    );
}

/**
 * Redirect to Profile page if token and id exist
 */
class AutoLogin extends React.Component {

    render() {
        const { component: Component, ...rest } = this.props;

        return (
            <Route
                {...rest}
                render={props => {
                    const token = localStorage.LoginToken || sessionStorage.LoginToken;
                    const id = localStorage.user_id || sessionStorage.user_id;

                    return token && id ?
                        <Redirect to={{ pathname: "/profile", }} />:
                        <Component {...props} />
                }}
            />
        );
    }
}

/**
 * Redirect to Login page if token or id does not exists
 */
class PrivateRoute extends React.Component {

    render() {
        const { component: Component, ...rest } = this.props;

        return (
            <Route
                {...rest}
                render={props => {
                    const token = localStorage.LoginToken || sessionStorage.LoginToken;
                    const id = localStorage.user_id || sessionStorage.user_id;

                    return token && id ?
                        <Component {...props} /> :
                        <Redirect to={{ pathname: "/", }} />
                }}
            />
        );
    }
}

export default PrivateBundle;