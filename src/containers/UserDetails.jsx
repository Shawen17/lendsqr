import { useState } from "react";
import {
  KeyboardBackspaceOutlined,
  StarOutlined,
  StarOutlineOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { useLocation } from "react-router-dom";
import { StatusUpdate } from "../components/utility/AdminAction";
import axios from "axios";
import displayGeneral from "../components/menu/GeneralDetails";
import AccountDetails from "../components/menu/AccountDetails";
import Documents from "../components/menu/Documents";
import SystemApp from "../components/menu/SystemApp";
import Loan from "../components/menu/Loan";
import Savings from "../components/menu/Savings";
import { motion } from "framer-motion";
import {
  UserActionButton,
  UserAction,
  Right,
  Left,
  Container,
  Info,
  Wrapper,
  VerticalLine,
  Rating,
  ProfilePic,
  Tabs,
  TabDesc,
} from "../components/menu/StyledMenu";

const UserDetails = () => {
  window.title = "User-details";
  const location = useLocation();
  const user = location.state;
  const data = [
    { id: 1, title: "General Details", comp: displayGeneral(user) },
    { id: 2, title: "Documents", comp: Documents() },
    { id: 3, title: "Bank Details", comp: AccountDetails(user) },
    { id: 4, title: "Loans", comp: Loan() },
    { id: 5, title: "Savings", comp: Savings() },
    { id: 6, title: "App and System", comp: SystemApp() },
  ];

  const [display, setDisplay] = useState(false);
  const [sliderdata, setSliderdata] = useState(data[0].comp);

  const onMenuClick = () => {
    setDisplay(!display);
  };

  const onTabChange = (index) => {
    const item = data[index].comp;
    setSliderdata(item);
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <Container>
        <Left className={display ? "appear" : "disappear"}>
          <SideBar />
        </Left>
        <Right>
          <NavBar onMenuClick={onMenuClick} />
          <div
            style={{
              backgroundColor: "whitesmoke",
              marginTop: "10px",
              height: "100%",
            }}
          >
            <Link className="dashboard-link" to="/dashboard">
              <KeyboardBackspaceOutlined className="menu-bar" />
              <span>Back to Users</span>
            </Link>
            <UserAction>
              <h3 style={{ color: "#00308f" }}>User Details</h3>
              <UserActionButton
                style={{ marginLeft: "auto" }}
                onClick={() => {
                  StatusUpdate(axios, "blacklist", user._id);
                }}
                color="red"
              >
                BLACKLIST USER
              </UserActionButton>
              <UserActionButton
                onClick={() => {
                  StatusUpdate(axios, "activate", user._id);
                }}
                color="aqua"
              >
                ACTIVATE USER
              </UserActionButton>
            </UserAction>
            <Info>
              <Wrapper>
                <ProfilePic
                  src={
                    user.profile.avatar.split("/").length === 4
                      ? `${process.env.REACT_APP_MEDIA_URL}${user.profile.avatar}`
                      : user.profile.avatar
                  }
                  alt="avatar"
                />
                <div className="info">
                  <h3>{`${user.profile.firstName} ${user.profile.lastName}`}</h3>
                  <p>{user.account.accountName}</p>
                </div>
                <VerticalLine className="info-v" />
                <div className="info-u">
                  <p>User's Tier</p>
                  <Rating>
                    <StarOutlined />
                    <StarOutlineOutlined />
                    <StarOutlineOutlined />{" "}
                  </Rating>
                </div>
                <VerticalLine className="info-v" />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                  }}
                >
                  <p className="acc-bal-p">₦{user.account.accountBalance}</p>
                  <div
                    style={{
                      fontSize: "12px",
                      fontFamily: "Work Sans",
                      fontStyle: "normal",
                      fontWeight: 400,
                      direction: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {`${user.account.accountNumber}/${user.account.bank}`}
                  </div>
                </div>
              </Wrapper>
              <Tabs>
                {data.map((item, index) => (
                  <TabDesc key={item.id} onClick={() => onTabChange(index)}>
                    {item.title}
                  </TabDesc>
                ))}
              </Tabs>
            </Info>
            {sliderdata}
          </div>
        </Right>
      </Container>
    </motion.div>
  );
};

export default UserDetails;
