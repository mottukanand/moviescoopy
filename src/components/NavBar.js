import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from "reactstrap";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const user_name = JSON.parse(localStorage.getItem("user")) || {};

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="dark" light expand="md">
      <NavbarBrand
        href="#"
        onClick={(e) => {
          e.preventDefault();
          history.push("/search");
        }} style={{ color: "white" }}>Movie Scoopy</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                history.push("/search");
              }}
              style={{ color: "white" }}
            >
              Movies Search
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                history.push("/mymovies");
              }}
              style={{ color: "white" }}
            >
              My Movies
            </NavLink>
          </NavItem>
        </Nav>
        <NavbarText
          style={{ color: "white" }}
        >
          <h6><b>{user_name && user_name.name ? `Hi, ${user_name.name}` : `Hi, User`}</b></h6>
          <h6
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/logout")}>Logout</h6>
        </NavbarText>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
