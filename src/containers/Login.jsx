import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { login } from "../action/auth";

const Login = ({ login, isStaff, isAuthenticated, loginFailed }) => {
  window.title = "login";
  const location = useLocation();
  const signupMsg = location.state ? location.state : "Enter details to login";
  const navigate = useNavigate();
  const [inputValues, setValues] = useState({});
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState(signupMsg);

  useEffect(() => {
    if (isAuthenticated) {
      if (msg === "Enter details to login") {
        setTimeout(() => {
          if (isStaff) {
            navigate("/dashboard");
          } else {
            navigate("/user-dashboard");
          }
        }, 3000);
      }
    } else if (loginFailed) {
      setError("email or password incorrect");
    }
  }, [isAuthenticated, navigate, loginFailed, msg, isStaff]);

  const HandleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues((values) => ({ ...values, [name]: value.trim() }));
  };

  const showPassword = () => {
    setClicked(!clicked);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    const email = inputValues.email;
    const password = inputValues.password;
    setMsg("Enter details to login");
    login(email, password);
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
              {msg}
            </p>
            <Form onSubmit={HandleSubmit}>
              <div style={{ fontSize: 13, color: "red" }}>{error}</div>
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
                disabled={
                  inputValues.email && inputValues.password ? false : true
                }
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
    </motion.div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginFailed: state.auth.failed,
  isStaff: state.auth.isStaff,
});

export default connect(mapStateToProps, { login })(Login);
