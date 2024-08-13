import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { doLogout } from "../auth";
import { useEffect, useState } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../auth";
import { getCurrentUserDetail } from "../auth";
function CustomNavbar(args) {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toogle = () => setIsOpen(!isOpen);

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());
  }, [login]);

  const logout = () => {
    doLogout(() => {
      //logged out
      setLogin(false);
      navigate("/login");
    });
  };

  return (
    <Navbar className="px-5" color="dark" dark expand="md" fixed="">
      <NavbarBrand tag={ReactLink} to="/">
        MyBlogs
      </NavbarBrand>
      <NavbarToggler onClick={() => toogle()} />

      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink tag={ReactLink} to="/">
              New Feed
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={ReactLink} to="/about">
              About
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={ReactLink} to="/services">
              Services
            </NavLink>
          </NavItem>
          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
              More
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag={ReactLink} to="/contact">
                Contact Us
              </DropdownItem>
              <DropdownItem>Facebook</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Nav navbar>
          {login && (
            <>
              <NavItem>
                <NavLink tag={ReactLink} to="/user/profile">
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/user/dashboard">
                  {user.email}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={logout}>Logout</NavLink>
              </NavItem>
            </>
          )}
          {!login && (
            <>
              <NavItem>
                <NavLink tag={ReactLink} to="/login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/signup">
                  Signup
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
