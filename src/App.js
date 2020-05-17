import React, { Suspense, lazy } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
const Login = lazy(() => import('./Page/Login.js'));
const Register = lazy(() => {
  console.log('./Page/Register.js')
  return import('./Page/Register.js')
});
const Profile = lazy(() => import('./Page/Profile.js'));
const Editor = lazy(() => import('./Page/Editor.js'));
const Viewer = lazy(() => import('./Page/Viewer.js'));


function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Suspense fallback={<LinearProgress/>}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/edit/:id" exact component={Editor} />
          <Route path="/preview/:id" exact component={Viewer} />
          <Route path="/view/:token/:id" exact component={Viewer} />
          {/*<PrivateRoute path="/dummy" component={Login} />*/}
          <Route render={props => <Redirect to={{ pathname: "/", }} />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

/*class PrivateRoute extends React.Component {

  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props => {
          let authToken = null;
          const a = sessionStorage.a;
          if (a) {
            try {
              const authData = JSON.parse(a);
              authToken = authData.auth_token;
            } catch (e) {
              sessionStorage.clear();
            }
          }

          //console.log(authToken);
          return authToken ? (
            <Component authToken={authToken} {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: "/",
                }}
              />
            )
        }
        }
      />
    );
  }
}*/

export default App;
