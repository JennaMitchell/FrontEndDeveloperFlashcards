import { Fragment } from "react";

import NavBar from "../Navigation/Header";
import LocalDatabaseSetup from "../Main/LocalDatabaseSetup";

const Layout = (props) => {
  return (
    <Fragment>
      <LocalDatabaseSetup></LocalDatabaseSetup>

      <NavBar />
      {props.children}
    </Fragment>
  );
};

export default Layout;
