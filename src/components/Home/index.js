import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import * as ROUTES from "../../constants/routes";
import { withAuthorization } from "../Session";
import "./index.css";

const handleOnClick = () => console.log("handleOnLcik lol");
const Home = () => (
  <div className="HomeComponents">
    <h1>Home</h1>
    <h2>Terms and Conditions</h2>
    <p>
      This Vehicle Registration System is for registering guest visitors only.
    </p>
    <p>Please fill in the form and provide sufficient details</p>
    <Button
      variant="contained"
      color="primary"
      component={Link}
      to={ROUTES.REGISTRATION}
      onClick={handleOnClick}
    >
      New application
    </Button>
  </div>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Home);
