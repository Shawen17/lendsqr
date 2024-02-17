import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Brand,
  BrandName,
  BrandLogo,
  Item,
  SearchContainer,
  Left,
  Right,
  Form,
  Input,
  Art,
  Desc,
} from "../components/authenticationStyles/StyledAuth";
import { Outline } from "../components/Styled";

const Login = () => {
  const navigate = useNavigate();
  const [inputValues, setValues] = useState({});
  const [clicked, setClicked] = useState(false);

  const HandleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues((values) => ({ ...values, [name]: value }));
  };

  const showPassword = () => {
    setClicked(!clicked);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <>
      <Container>
        <Brand>
          <BrandLogo>
            <img
              src="/static/icons/lendsqr.jpg"
              alt="logo"
              style={{ height: 50, width: 50 }}
            />
          </BrandLogo>
          <BrandName>lendsqr</BrandName>
        </Brand>
        <Item>
          <Left>
            <Art src="/static/icons/lendsqrArt.png" alt="art" />
          </Left>
          <Right>
            <h1 style={{ color: "#00308f", fontWeight: "bold" }}>Welcome! </h1>
            <p
              style={{
                color: "#00308f",
                fontSize: "19px",
                paddingBottom: "50px",
              }}
            >
              Enter details to login
            </p>
            <Form onSubmit={HandleSubmit}>
              <SearchContainer>
                <Input
                  placeholder="Email"
                  name="email"
                  value={inputValues.email || ""}
                  type="email"
                  onChange={HandleChange}
                />
              </SearchContainer>
              <SearchContainer>
                <Input
                  placeholder="Password"
                  name="password"
                  value={inputValues.password || ""}
                  type={clicked ? "text" : "password"}
                  onChange={HandleChange}
                />
                <Desc onClick={showPassword}>show</Desc>
              </SearchContainer>

              <Link
                className="nav-link mt-3"
                style={{
                  color: "#00ffff",
                  fontSize: "12px",
                  letterSpacing: "0.1rem",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
                to="/reset-password"
              >
                FORGOT PASSWORD?
              </Link>
              <button
                onClick={HandleSubmit}
                style={{
                  backgroundColor: "#00ffff",
                  color: "white",
                  width: "80%",
                  height: "40px",
                  fontSize: "17px",
                }}
                className="login-button"
                type="submit"
              >
                LOG IN
              </button>
            </Form>
            <Outline>
              <div style={{ marginRight: 3 }}>New User?</div>
              <Link className="nav-link sidebar-link" to="/signup">
                Signup
              </Link>{" "}
            </Outline>
          </Right>
        </Item>
      </Container>
    </>
  );
};

export default Login;
