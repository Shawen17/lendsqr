import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import Users from "../components/Users";
import NavBar from "../components/NavBar";
import axios from "axios";
import { motion } from "framer-motion";
import Loading from "../components/Loading";

const Container = styled.div`
  padding: 8px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  overflow-x: hidden;
  @media screen and (max-width: 568px) {
    overflow-x: auto;
  }
`;

const Left = styled.div`
  position: relative;
`;

const Right = styled.div`
  width: 75%;
  @media screen and (max-width: 568px) {
    width: 100%;
    margin: 5px;
  }
`;

const Dashstats = styled.div`
margin-left:0px;
margin-bottom:20px;
margin-top:20px;
display:flex;
align:items:center;
justify-content:center;
flex-wrap:wrap;
padding:10px;
flex:12;
@media screen and (min-width:0px) and (max-width:568px){
    flex-wrap:nowrap;
    flex-basis:24%;
}
`;

const Stats = styled.div`
  background-color: white;
  height: 160px;
  width: 240px;
  border: 1px solid rgba(33, 63, 125, 0.06);
  box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  flex: 3;
  justify-content: flex-start;
  align-items: left;
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 12px 10px;
`;

const StatIcon = styled.img`
  height: 25%;
  width: 25%;
  border-radius: 50%;
`;

const StatDesc = styled.h5`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  color: #0050b5;
  margin-top: 5px;
`;
const StatNum = styled.h5`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  text-transform: uppercase;
  margin-top: 3px;
  color: #0050b5;
  opacity: 1;
`;

let PageSize = 20;

const Dashboard = () => {
  window.title = "Dashboard";
  const [searchValue, setSearchValue] = useState([]);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const [filterInProgress, setFilterInProgress] = useState(false);
  const [statusUpated, setStatusUpdated] = useState(false);
  const [raw, setRaw] = useState({
    items: {
      users_paginated: [],
      all_users: 0,
      active: 0,
      loan: 0,
      savings: 0,
    },
  });

  const [display, setDisplay] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(raw.items.users_paginated);

  const onMenuClick = () => {
    setDisplay(!display);
  };

  const updateStatus = () => {
    setStatusUpdated(!statusUpated);
  };

  const nextPage = () => {
    if (page < Math.ceil(raw.items.all_users / PageSize)) {
      setModal(true);
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setModal(true);
      setPage(page - 1);
    }
  };

  const HandleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    try {
      axios
        .get(
          `${process.env.REACT_APP_LENDSQR_API_URL}/api/users/?page=${page}`,
          config
        )
        .then((res) => {
          setModal(false);
          setRaw({ items: res.data });
        })
        .catch((error) => {
          setModal(false);
          setError(error);
        });
    } catch (error) {
      setModal(false);
      setError(error);
    }
  }, [page, statusUpated]);

  useEffect(() => {
    if (searchValue.length > 4) {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };
      setFilterInProgress(true);
      try {
        axios
          .get(
            `${process.env.REACT_APP_LENDSQR_API_URL}/api/filter-users/`,
            {
              params: { search: searchValue },
            },
            config
          )
          .then((res) => setFilteredUsers(res.data))
          .catch((error) => setError(error));
      } catch (error) {
        setError(error);
      }
      setPage(1);
    } else {
      setFilterInProgress(false);
      setFilteredUsers(raw.items.users_paginated);
    }
  }, [searchValue, raw.items.users_paginated]);

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
          <NavBar
            searchValue={searchValue}
            HandleInputChange={HandleInputChange}
            onMenuClick={onMenuClick}
          />
          <div style={{ backgroundColor: "whitesmoke" }}>
            <h3
              style={{
                color: "#0050B5",
                marginLeft: "10px",
                paddingTop: "25px",
              }}
            >
              Users
            </h3>
            <Dashstats>
              <Stats>
                <StatIcon src="/static/icons/user.png" alt="user" />
                <StatDesc>users</StatDesc>
                <StatNum>{raw.items.all_users}</StatNum>
              </Stats>
              <Stats>
                <StatIcon
                  src="/static/icons/user_active.png"
                  alt="active icon"
                />
                <StatDesc>ACTIVE USERS</StatDesc>
                <StatNum>{raw.items.active}</StatNum>
              </Stats>
              <Stats>
                <StatIcon src="/static/icons/user_loan.png" alt="loan icon" />
                <StatDesc>USERS WITH LOANS</StatDesc>
                <StatNum>{raw.items.loan}</StatNum>
              </Stats>
              <Stats>
                <StatIcon
                  src="/static/icons/user_savings.png"
                  alt="savings icon"
                />
                <StatDesc>USERS WITH SAVINGS</StatDesc>
                <StatNum>{raw.items.savings}</StatNum>
              </Stats>
            </Dashstats>
            {error}
            {modal ? Loading() : ""}
            <Users
              page={page}
              filterInProgress={filterInProgress}
              PageSize={PageSize}
              totalCount={raw.items.all_users}
              prevPage={prevPage}
              nextPage={nextPage}
              currentData={filteredUsers}
              updateStatus={updateStatus}
            />
          </div>
        </Right>
      </Container>
    </motion.div>
  );
};

export default Dashboard;
