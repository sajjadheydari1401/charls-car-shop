import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../redux/slices/userSlice";
import { clearCars } from "../redux/slices/carSlice";
import { clearInvoices } from "../redux/slices/invoiceSlice";

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

const Username = styled.span`
  color: gray;
  margin-left: 20px;
`;

const NavBarComponent = () => {
  const user = useSelector((state) => state.userSlice?.user);
  const dispatch = useDispatch();
  return (
    <Navbar>
      <NavList>
        <NavItemsBox>
          {user && (
            <React.Fragment>
              {user.isAdmin && (
                <React.Fragment>
                  <NavItem>
                    <Link to="/admin">Add New Car</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/soldcars">Sales Records</Link>
                  </NavItem>
                </React.Fragment>
              )}
              {!user.isAdmin && (
                <NavItem>
                  <Link to="/mycars">My Cars</Link>
                </NavItem>
              )}
              <NavItem>
                <Link to="/">For Sale</Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/login"
                  onClick={() => {
                    dispatch(clearCars());
                    dispatch(clearInvoices());
                    dispatch(logout());
                    localStorage.removeItem("persist:root");
                  }}
                >
                  Log Out
                </Link>
              </NavItem>
              <Username>Hi {user.name}!</Username>
            </React.Fragment>
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
