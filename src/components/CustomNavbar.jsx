import React, { useContext, useEffect, useState } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
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
} from "reactstrap";
import { doLogout, getCurrentUserDetail, isLoggedIn } from "../auth";
import userContext from "../context/userContext";
import { loadAllCategories } from "../services/category-service";

const CustomNavbar = () => {
  const userContextData = useContext(userContext);
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());

    // Fetch categories
    loadAllCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.log("Error fetching categories:", error));
  }, [login]);

  const logout = () => {
    doLogout(() => {
      //logged out
      setLogin(false);
      userContextData.setUser({
        data: null,
        login: false,
      });
      navigate("/login");
    });
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md" className="px-5">
        <NavbarBrand tag={ReactLink} to="/">
          MyBlogs
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
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
              <NavLink tag={ReactLink} to="/createpost">
                Create Post
              </NavLink>
            </NavItem>
            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav>
                Categories
              </DropdownToggle>
              <DropdownMenu end>
                {categories.map((category, index) => (
                  <DropdownItem
                    key={index}
                    tag={ReactLink}
                    to={"/categories/" + category.categoryId}
                  >
                    {category.categoryTitle}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {login ? (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to={`/user/profile/${user.id}`}>
                    Profile Info
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
            ) : (
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
    </div>
  );
};

export default CustomNavbar;
