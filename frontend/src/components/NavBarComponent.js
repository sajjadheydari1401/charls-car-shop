import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = styled.div`
  width: 100%;
  height: 70px;
  background-color: gray;
`;

const NavList = styled.ul`
  width: 100%;
  height: 100%;
  padding: 0 50px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  background-color: #bde0fe;
`;

const NavItemsBox = styled.div`
  display: flex;
`;

const NavItem = styled.li`
  margin-left: 20px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }

  & a {
    font-size: 16px;
    font-weight: bold;
    color: #292828;
  }
`;

const Logo = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #292828;
`;

const NavBarComponent = () => {
  const user = false;
  return (
    <Navbar>
      <NavList>
        <NavItemsBox>
          {user && (
            <NavItem>
              <Link to="/login">Log Out</Link>
            </NavItem>
          )}
          {!user && (
            <React.Fragment>
              <NavItem>
                <Link to="/login">Login</Link>
              </NavItem>
              <NavItem>
                <Link to="/register">Sign Up</Link>
              </NavItem>
            </React.Fragment>
          )}
        </NavItemsBox>
        <Logo>Charles Car Shop</Logo>
      </NavList>
    </Navbar>
  );
};

export default NavBarComponent;