import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

function ConfirmationPage(props) {
  return (
    <div>
      <h1>APPLICATION COMFIRMED</h1>
      <p>Email will be sent to {props.location.state.email} once approved</p>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={ROUTES.HOME}
      >
        New application
      </Button>
    </div>
  );
}

export default ConfirmationPage;
