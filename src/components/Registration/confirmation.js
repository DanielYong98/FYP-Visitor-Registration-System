import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import "./confirmation.css";

function ConfirmationPage(props) {
  return (
    <div className="container">
      <div className="head">
        <p>New Application</p>
      </div>
      <div className="submitted">
        <h2>APPLICATION SUBMITTED</h2>
        <p>
          A confirmation email will be sent to {props.location.state.email} once
          approved
        </p>
        <br></br>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={ROUTES.HOME}
        >
          New application
        </Button>
      </div>
    </div>
  );
}

export default ConfirmationPage;
