import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from './Page/Login.js'
import Register from './Page/Register.js'


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
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
