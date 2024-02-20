import {
  Label,
  Title,
  Outline,
  Button,
  Select,
  MiniContainer,
  Box,
  SignupContainer,
  SearchContainer,
  Input,
  SignupDisplay,
} from "../components/Styled";
import { useState, useEffect } from "react";
import { provinces } from "../components/utility/AdminAction";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "reactstrap";
import { motion } from "framer-motion";

const Signup = () => {
  document.title = "signup";
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setError("");
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const HandleSubmit = async (event) => {
    event.preventDefault();
    const email = inputs.email;
    const first_name = inputs.first_name;
    const last_name = inputs.last_name;
    const state = inputs.state;
    const password = inputs.password;
    const re_password = inputs.re_password;
    if (password === re_password) {
      navigate("/profile-form", {
        state: {
          email: email,
          state: state,
          first_name: first_name,
          last_name: last_name,
          password: password,
          re_password: re_password,
        },
      });
    } else {
      setError("password does not match");
    }
  };
  useEffect(() => {
    if (inputs.password) {
      if (
        inputs.re_password &&
        inputs.password.length === inputs.re_password.length &&
        inputs.password !== inputs.re_password
      ) {
        setError("password does not match");
      }
    }
  }, [inputs]);

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
      <SignupContainer>
        <Title style={{ marginTop: 20 }}>Add your Details</Title>

        <SignupDisplay>
          <Form style={{ width: "100%" }} onSubmit={HandleSubmit}>
            <MiniContainer>
              <Box>
                <Label>First Name</Label>
                <SearchContainer>
                  <Input
                    required
                    placeholder="First Name"
                    type="text"
                    name="first_name"
                    value={inputs.first_name || ""}
                    onChange={handleChange}
                  />
                </SearchContainer>
              </Box>
              <Box>
                <Label>Last Name</Label>
                <SearchContainer>
                  <Input
                    required
                    placeholder="Your Surname"
                    type="text"
                    name="last_name"
                    value={inputs.last_name || ""}
                    onChange={handleChange}
                  />
                </SearchContainer>
              </Box>
            </MiniContainer>
            <MiniContainer>
              <Box style={{ marginRight: 0, marginLeft: 15 }}>
                <Label>Email</Label>
                <SearchContainer>
                  <Input
                    placeholder="Email Address"
                    type="email"
                    name="email"
                    value={inputs.email || ""}
                    required
                    onChange={handleChange}
                  />
                </SearchContainer>
              </Box>
              <Box style={{ marginRight: 0, marginLeft: 10 }}>
                <Label htmlFor="state">Province</Label>
                <SearchContainer style={{ width: "85%" }}>
                  <Select
                    required
                    name="state"
                    value={inputs.state || ""}
                    onChange={handleChange}
                  >
                    {provinces.map((province) => (
                      <option key={province.id} value={province.name}>
                        {province.name}
                      </option>
                    ))}
                  </Select>
                </SearchContainer>
              </Box>
            </MiniContainer>
            <div style={{ fontSize: 13, color: "red" }}>{error}</div>
            <MiniContainer>
              <Box>
                <Label>Password</Label>
                <SearchContainer>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={inputs.password || ""}
                    required
                    minLength={8}
                    onChange={handleChange}
                  />
                </SearchContainer>
              </Box>

              <Box>
                <Label>Confirm Password</Label>
                <SearchContainer>
                  <Input
                    required
                    placeholder="Confirm Password"
                    type="password"
                    name="re_password"
                    value={inputs.re_password || ""}
                    onChange={handleChange}
                  />
                </SearchContainer>
              </Box>
            </MiniContainer>
            <Button type="submit">Submit</Button>
          </Form>

          <Outline>
            <div style={{ marginRight: 4, color: "white" }}>
              Already have an account?
            </div>
            <Link
              style={{ color: "#18a558" }}
              className="nav-link sidebar-link"
              to="/"
            >
              Login
            </Link>
          </Outline>
        </SignupDisplay>
      </SignupContainer>
    </motion.div>
  );
};

export default Signup;
