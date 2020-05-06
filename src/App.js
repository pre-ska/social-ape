import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode"; // lib za dekodiranje web tokena
import axios from "axios";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

//MUI stuff
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

//components
import Navbar from "./components/layout/Navbar";
import AuthRoute from "./util/AuthRoute";
import themeObject from "./util/theme";

//pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";

const theme = createMuiTheme(themeObject);

axios.defaults.baseURL =
  "https://europe-west1-social-ape-5af85.cloudfunctions.net/api";

const token = localStorage.FBIdToken;

if (token) {
  //dekodiram token da bi dobio koristan objekt
  const decodedToken = jwtDecode(token);

  //testiram dali je token expired (exp)
  if (decodedToken.exp * 1000 < Date.now()) {
    //window.location.href = "/login"; // preusmjerim na login page

    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                {/* provjeravam dali je korisnik logiran sa AuthRoute, 
              ako je, ne može ići na LOGIN i SIGNUP stranice */}
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <Route exact path="/users/:handle" component={user} />
                <Route
                  exact
                  path="/users/:handle/scream/:screamId"
                  component={user}
                />
              </Switch>
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
