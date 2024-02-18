import React, { useState } from "react";
import styled from "styled-components";
import {
  Search,
  NotificationsOutlined,
  KeyboardArrowDownOutlined,
  Menu,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { logout } from "../action/auth";
import { connect } from "react-redux";

const Wrapper = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: 0px) and (max-width: 568px) {
    width: 100%;
    height: 150px;
    position: relative;
    flex-direction: column-reverse;
  }
`;

const Input = styled.input`
  type: text;
  border: none;
  flex: 9;
  border-style: none;
  &:focus {
    outline: none;
    border-color: none;
    border: none;
  }
`;

const SearchIcon = styled.div`
  height: 100%;
  opacity: 0.5;
  background-color: #00ffff;
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: center;
`;

const SearchContainer = styled.div`
  border: 2px solid grey;
  border-radius: 6px;
  align-items: center;
  justify-content: flex-end;
  display: flex;
  height: 40px;
  width: 50%;
  margin-left: 0px;
  @media screen and (min-width: 0px) and (max-width: 568px) {
    margin-top: 5px;
    height: 30px;
    width: 100%;
    ${Input} {
      width: 80%;
    }
    ${SearchIcon} {
      width: 20%;
    }
  }
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin-right: 6px;
`;

export const DropDownHeader = styled.div`
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-family: Calibri;
  font-size: 15px;
  color: #00308f;
`;
export const DropDownListContainer = styled.div`
  position: absolute;
  margin-top: 120px;
  margin-left: 45px;
  background-color: whitesmoke;
  z-index: 9;
`;

export const DropDownList = styled.ul`
  margin-top: 10px;
  padding: 1em;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #00308f;

  font-size: 18px;
  font-weight: 500px;
  list-style-type: none;
  &:first-child {
    padding-top: 0.8em;
  }
`;

export const ListItem = styled.li`
  list-style: none;
  cursor: pointer;
  z-index: 9;
  width: 100%;
  border-bottom: 1px solid grey;

  &:hover {
    background-color: cyan;
    transform: scale(1.05);
    transition: 0.5s ease-in-out;
  }
`;

const Navlink = styled.div`
  display: flex;
  color: #00308f;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

export const DropDownContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  margin-left: 20px;
`;

const TopMenu = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  width: 50%;

  @media screen and (max-width: 568px) {
    width: 100%;
    ${Navlink} {
      width: 50%;
      margin-left: 10px;
    }
    ${DropDownContainer} {
      width: 30%;
    }
  }
`;

const NavBar = (props) => {
  const [toggle, setToggle] = useState(false);

  const handleDropDown = () => {
    setToggle(!toggle);
  };

  return (
    <Wrapper>
      <SearchContainer>
        <Input
          placeholder="search for anything.."
          value={props.searchValue}
          onChange={props.HandleInputChange}
        />
        <SearchIcon>
          <Search id="search-icon" />
        </SearchIcon>
      </SearchContainer>
      <TopMenu>
        <div className="hamburger">
          <Menu onClick={props.onMenuClick} />
        </div>
        <Navlink>
          <Link to="/">Docs</Link>
          <NotificationsOutlined
            style={{ height: 40, width: 40, marginRight: "6px" }}
          />
          <Image src="/static/icons/my_selfie.jpg" />
        </Navlink>

        <DropDownContainer>
          <div className="sidebar-link nav" onClick={handleDropDown}>
            {props.user}
            <span>
              {" "}
              <KeyboardArrowDownOutlined />{" "}
            </span>{" "}
          </div>
          <DropDownListContainer>
            <DropDownList
              className={toggle ? "show-dropdown" : "hide-dropdown"}
            >
              <ListItem>account</ListItem>
              <ListItem onClick={() => props.logout()}>logout</ListItem>
            </DropDownList>
          </DropDownListContainer>
        </DropDownContainer>
      </TopMenu>
    </Wrapper>
  );
};
const mapStateToProps = (state) => {
  if (state.auth.user) {
    return {
      user: state.auth.user.first_name,
    };
  } else {
    return { user: "" };
  }
};
export default connect(mapStateToProps, { logout })(NavBar);
