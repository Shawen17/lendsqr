import React, { useState, useMemo, useEffect } from "react";
import { Table } from "reactstrap";
import { MoreVertOutlined, FilterListOutlined } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import FilterForm from "./FilterForm";
import Pagination from "./Pagination";

let PageSize = 10;

const Users = (props) => {
  var data = props.currentData;

  const [menu, setMenu] = useState();
  const [submenu, setSubmenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [inputs, setInputs] = useState({});
  var [result, setResult] = useState(props.currentData);
  const navigate = useNavigate();

  useEffect(() => {
    setResult(props.currentData);
  }, [props.currentData]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onFilter = () => {
    var filteredResult;
    filteredResult = result;
    if (inputs) {
      const filteredInputs = Object.fromEntries(
        Object.entries(inputs).filter(([key, value]) => value !== "")
      );

      filteredResult = result.filter((item) =>
        Object.entries(filteredInputs).every(
          ([key, value]) =>
            value !== "" && value !== undefined && item[key] === value
        )
      );
    }
    setResult(filteredResult);
  };

  const onReset = () => {
    setInputs({});
    setResult(props.currentData);
  };

  const filterClick = () => {
    setClicked(!clicked);
    if (clicked) {
      onReset();
    }
  };

  const displayDetails = (id) => {
    const Data = [...result];
    const user = Data.splice(id, 1);
    localStorage.setItem("user", JSON.stringify(user));
    setMenu();
    navigate("/user-details");
  };

  const blacklistUser = (id, user) => {
    props.decrement(user.status);
    data[id].status = "Blacklisted";
    const userIndex = data.findIndex((obj) => {
      return obj.id === user.id;
    });
    data[userIndex].status = "Blacklisted";
    localStorage.setItem("data", JSON.stringify(data));
    setResult(JSON.parse(localStorage.getItem("data")));
  };

  const activateUser = (id, user) => {
    props.increment(user.status);
    data[id].status = "Active";
    const userIndex = data.findIndex((obj) => {
      return obj.id === user.id;
    });
    data[userIndex].status = "Active";
    localStorage.setItem("data", JSON.stringify(data));
    setResult(JSON.parse(localStorage.getItem("data")));
  };

  const displayMenu = (index) => {
    setMenu(index);
  };

  const customStatus = (status) => {
    if (status === "Active") {
      return <span id="active-status">Active</span>;
    } else if (status === "Inactive") {
      return <span id="inactive-status">Inactive</span>;
    } else if (status === "Pending") {
      <span id="pending-status">Pending</span>;
    } else {
      return <span id="blacklisted-status">Blacklisted</span>;
    }
  };

  const formatDate = (str) => {
    let date = new Date(str);
    return date.toDateString();
  };

  var currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return result.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, result]);

  return (
    <div style={{ borderRadius: "6px", backgroundColor: "white" }}>
      {clicked ? (
        <FilterForm
          handleChange={handleChange}
          onFilter={onFilter}
          onReset={onReset}
          inputs={inputs}
        />
      ) : (
        ""
      )}

      <Table borderless style={{ position: "relative", maxWidth: "100vw" }}>
        <thead>
          <tr>
            <th onClick={filterClick}>
              ORGANIZATION <FilterListOutlined />{" "}
            </th>
            <th onClick={filterClick}>
              USERNAME <FilterListOutlined />
            </th>
            <th onClick={filterClick}>
              EMAIL <FilterListOutlined />
            </th>
            <th onClick={filterClick}>
              PHONE NUMBER <FilterListOutlined />
            </th>
            <th onClick={filterClick}>
              DATE JOINED <FilterListOutlined />
            </th>
            <th onClick={filterClick}>
              STATUS <FilterListOutlined />
            </th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {currentData.map((user, index) => {
            return (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid #ccc",
                  height: "60px",
                  opacity: 1,
                  justifyContent: "center",
                }}
              >
                <td>{user.orgName}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td>{customStatus(user.status)}</td>
                <td>
                  <button
                    onClick={() => {
                      displayMenu(index);
                      setSubmenu(!submenu);
                    }}
                    style={{ border: "none", backgroundColor: "white" }}
                  >
                    <MoreVertOutlined className="menu-bar" />
                    <ul
                      className={
                        menu === index && submenu
                          ? "show-menu-options"
                          : "hide-menu-options"
                      }
                    >
                      <li
                        onClick={() => {
                          displayDetails(index);
                        }}
                      >
                        View Details
                      </li>
                      <li
                        onClick={() => {
                          blacklistUser(index, user);
                        }}
                      >
                        Blacklist
                      </li>
                      <li
                        onClick={() => {
                          activateUser(index, user);
                        }}
                      >
                        Activate
                      </li>
                    </ul>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div style={{ marginLeft: "500px" }}>
        <Pagination
          key={currentPage}
          className="pagination mt-4"
          currentPage={currentPage}
          totalCount={result.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Users;
