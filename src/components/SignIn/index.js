import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import TextField from "@material-ui/core/TextField";
import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import UoN from "../../images/UoN.jpg";
import "./index.css";

const SignInPage = () => (
  <div>
    <h1> </h1>
    <SignInForm />
    {/*<SignUpLink />*/}
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <Container component="main" maxWidth="xs">
        <div className="TestComp">
          <img src={UoN} alt="Uon pic" width="30%" align="middle" />

          <h2 className="Title">Sign In</h2>

          <form onSubmit={this.onSubmit}>
            {/* <input
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            /> */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              autoFocus
              onChange={this.onChange}
              type="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isInvalid}
              size="large"
              align="right"
            >
              Sign In
            </Button>
            {error && <p>{error.message}</p>}
          </form>
        </div>
      </Container>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
