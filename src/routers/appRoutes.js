import React, { Component, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
const LoginComponent = React.lazy(() => import("../components/Login"));
const MovieSearchComponent = React.lazy(() =>
  import("../components/MovieSearch")
);
const MyMoviesComponent = React.lazy(() => import("../components/MyMovies"));
const LogoutComponent = React.lazy(() => import("../components/Logout"));

const checkAuth = () => {
  let user = JSON.parse(localStorage.getItem("user"))|| {};
  if (user && user.username) {
    return true;
  } else {
    return false;
  }
};

class AppRoute extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Suspense fallback={<div>Loading</div>}>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route
              exact
              path="/login"
              render={(props) =>
                checkAuth() ? (
                  <Redirect to="/search" />
                  
                ) : (
                  <LoginComponent {...props} />
                )
              }
            />
            <Route
              exact
              path="/search"
              render={(props) =>
                checkAuth() ? (
                  <MovieSearchComponent {...props} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/mymovies"
              render={(props) =>
                checkAuth() ? (
                  <MyMoviesComponent {...props} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route exact path="/logout" component={LogoutComponent} />
          </Suspense>
        </Switch>
      </Router>
    );
  }
}
export default AppRoute;
