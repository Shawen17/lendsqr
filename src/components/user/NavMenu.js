import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  NotificationsOutlined,
  KeyboardArrowDownOutlined,
} from "@material-ui/icons";
import { logout, get_portfolio } from "../../action/auth";
import { connect } from "react-redux";
import ProfilePicture from "../ProfilePicture";
import defaultPic from "../../components/asset/default_profile_pic.png";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: 0px) and (max-width: 568px) {
    width: 50%;
    position: relative;
  }
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

const NavMenu = (props) => {
  const [toggle, setToggle] = useState(false);
  const [profilePicture, setProfilePicture] = useState(defaultPic);

  useEffect(() => {
    if (
      props.details &&
      props.details.profile &&
      props.details.profile.avatar
    ) {
      const path = props.details.profile.avatar;
      const members = path.split("/").length;
      if (members === 4) {
        setProfilePicture(
          `${process.env.REACT_APP_MEDIA_URL}${props.details.profile.avatar}`
        );
      } else {
        setProfilePicture(`${props.details.profile.avatar}`);
      }
    }
  }, [props.details]);

  const handleDropDown = () => {
    setToggle(!toggle);
  };

  const handlePictureChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      setProfilePicture(reader.result);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      const body = { avatar: file, user_id: props.details._id };
      try {
        await axios
          .put(
            `${process.env.REACT_APP_LENDSQR_API_URL}/api/users/`,
            body,
            config
          )
          .then((response) => response)
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };
    props.get_portfolio(props.details.profile.email);
    reader.readAsDataURL(file);
  };

  return (
    <Wrapper>
      <TopMenu>
        <Navlink>
          <NotificationsOutlined
            className="notify"
            style={{ height: 30, width: 30, marginRight: 20 }}
          />
          <ProfilePicture
            currentPicture={profilePicture}
            onPictureChange={handlePictureChange}
          />
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
      details: state.auth.portfolio,
    };
  } else {
    return { user: "", details: "" };
  }
};
export default connect(mapStateToProps, { logout, get_portfolio })(NavMenu);
