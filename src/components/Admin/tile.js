import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import "./tile.css";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import SearchIcon from "@material-ui/icons/Search";
import ListIcon from "@material-ui/icons/List";
import { ListItemIcon } from "@material-ui/core";

function TilePage() {
  return (
    <div className="bigDiv">
      <div className="tile1">
        <Link
          to={{
            pathname: ROUTES.SEARCH,
          }}
          style={{ textDecoration: "none" }}
        >
          <SearchIcon
            classNmae="search"
            style={{ textAlign: "center", fontSize: 200, fill: "lightgray" }}
          />
          <p>Search Vehicle</p>
        </Link>
      </div>
      <div className="tile2">
        <Link
          to={{
            pathname: ROUTES.ADMIN_DASH,
          }}
          style={{ textDecoration: "none" }}
        >
          <ListIcon
            className="icon"
            style={{ fontSize: 200, fill: "lightgray", alignItems: "center" }}
          />
          <p>View Applications</p>
        </Link>
      </div>
    </div>
  );
}

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(withAuthorization(condition), withFirebase)(TilePage);
