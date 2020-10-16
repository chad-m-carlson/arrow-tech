import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Menu } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";

const NavBar = (props) => {
  const { handleLogout, admin, authenticated } = useContext(AuthContext);

  const adminControls = () => (
    <NavLink
      to="/admin"
      activeStyle={{ textDecoration: "underline" }}
      align="center"
      style={{ color: "black" }}
    >
      Admin
    </NavLink>
  );

  return (
    <>
      <Menu id="navbar" fixed="top" style={{ maxWidth: "{dimensions.width}" }}>
        <>
          <Menu.Menu position="right">
            {authenticated && (
              <>
                <Menu.Item as={NavLink} to="/" content="Home" exact />
                <Menu.Item
                  as={NavLink}
                  to="/calform"
                  content="Calibration Form"
                  exact
                />
                <Menu.Item
                  as={NavLink}
                  to={{ pathname: "/batchreport", state: { caldata: false } }}
                  content="Batch Reports"
                  exact
                />
                <Menu.Item
                  as={NavLink}
                  to="/customers"
                  content="Customers"
                  exact
                />
              </>
            )}
            {!authenticated && (
              <>
                <Menu.Item as={NavLink} to="/login" content="Login" exact />
                {/* <Menu.Item
                  as={NavLink}
                  to="/register"
                  content="Register"
                  exact
                /> */}
              </>
            )}
            {authenticated && (
              <Menu.Item
                as={Link}
                to="/"
                content="Logout"
                onClick={() => handleLogout(props.history)}
              />
            )}
          </Menu.Menu>
        </>
      </Menu>
    </>
  );
};

export default NavBar;
