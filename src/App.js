import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from './Page/Login.js'
import Register from './Page/Register.js'
import Profile from './Page/Profile.js'
import Editor from './Page/Editor.js'
import Viewer from './Page/Viewer.js'


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/edit/:id" exact component={Editor} />
        <Route path="/preview/:id" exact component={Viewer} />
        <Route path="/view/:token/:id" exact component={Viewer} />
        {/*<PrivateRoute path="/dummy" component={Login} />*/}
        <Route render={props => <Redirect to={{pathname: "/",}}/>} />
      </Switch>
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
