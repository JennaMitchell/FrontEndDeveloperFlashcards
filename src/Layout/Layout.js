import { Fragment } from "react";

import LocalDatabaseSetup from "../Main/LocalDatabaseSetup";
import { useSelector } from "react-redux";

const Layout = (props) => {
  return (
    <Fragment>
      <LocalDatabaseSetup></LocalDatabaseSetup>

      {props.children}
    </Fragment>
  );
};

export default Layout;
