import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import TestDB from "../TestFolder/testDB";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import { withAuthentication } from "../Session";
import RegistrationPage from "../Registration";
import TimesList from "../TestFolder/testList";
import ConfirmationPage from "../Registration/confirmation";
import AdminDash from "../Admin/adminDash";
import ApplicationDetails from "../ApplicationDetails";

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        {/* <Route exact path={ROUTES.LANDING} component={LandingPage} /> */}
        <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route
          exact
          path={ROUTES.PASSWORD_FORGET}
          component={PasswordForgetPage}
        />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route exact path={ROUTES.ADMIN} component={AdminPage} />
        <Route exact path={ROUTES.REGISTRATION} component={RegistrationPage} />
        <Route exact path="/testdb" component={TestDB} />
        <Route exact path="/list" component={TimesList} />
        <Route
          exact
          path={ROUTES.CONFIIRMATION_PAGE}
          component={ConfirmationPage}
        />
        <Route exact path={ROUTES.ADMIN_DASH} component={AdminDash} />
        <Route
          exact
          path={ROUTES.APPLICATION_DETAILS}
          component={ApplicationDetails}
        />
      </div>
    </Router>
  );
}

export default withAuthentication(App);
