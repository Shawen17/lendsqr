import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Form } from "reactstrap";

import {
  Container,
  Label,
  Input,
  SearchContainer,
  Button,
  FormDisplay,
  Title,
  Select,
  Box,
  MiniContainer,
} from "../Styled";

const AddUserForm = () => {
  document.title = "partner signup";
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    setSubmitted(false);
    setError("");

    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setInputs({ ...inputs, document: file });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("email", inputs.email);
    data.append("phone_number", inputs.phone_number.toString());
    data.append("first_name", inputs.first_name);
    data.append("last_name", inputs.last_name);
    data.append("business_name", inputs.business_name);
    data.append("business_address", inputs.business_address);
    data.append("service", inputs.service);
    data.append("document", inputs.document);
    data.append("status", "off");
    data.append("state", inputs.state);
    data.append("password", inputs.password);
    data.append("re_password", inputs.re_password);

    const password = inputs.password;
    const re_password = inputs.re_password;
    if (password === re_password) {
      await props.signup(data);
      setSubmitted(true);
    } else {
      setError("password does not match");
    }
  };

  if (props.isAuthenticated) {
    navigate("/account");
  }

  const formDisplay = {
    width: "100%",
  };

  return (
    <Container
      style={{ backgroundColor: "white", borderRadius: 6 }}
      className="page-load"
    >
      <p style={{ color: "red" }}>{error}</p>

      <Title>Register Details</Title>
      <FormDisplay>
        <Form style={formDisplay} onSubmit={handleSubmit}>
          <MiniContainer>
            <Box>
              <Label htmlFor="first_name">First Name</Label>
              <SearchContainer>
                <Input
                  placeholder="first name"
                  type="text"
                  name="first_name"
                  value={inputs.first_name || ""}
                  onChange={handleChange}
                />
              </SearchContainer>
            </Box>
            <Box>
              <Label htmlFor="last_name">Last Name</Label>
              <SearchContainer>
                <Input
                  placeholder="last name"
                  type="text"
                  name="last_name"
                  value={inputs.last_name || ""}
                  onChange={handleChange}
                />
              </SearchContainer>
            </Box>
          </MiniContainer>
          <Label htmlFor="email">Email</Label>
          <SearchContainer>
            <Input
              placeholder="email"
              type="email"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
            />
          </SearchContainer>

          <Label htmlFor="business_name">Business Name</Label>
          <SearchContainer>
            <Input
              placeholder="business name"
              type="text"
              name="business_name"
              value={inputs.business_name || ""}
              onChange={handleChange}
            />
          </SearchContainer>

          <Label htmlFor="business_address">Business Address</Label>
          <SearchContainer>
            <Input
              placeholder="business address"
              type="text"
              name="business_address"
              value={inputs.business_address || ""}
              onChange={handleChange}
            />
          </SearchContainer>
          <MiniContainer>
            <Box>
              <Label htmlFor="phone_number">Phone Number</Label>
              <SearchContainer>
                <Input
                  placeholder="phone number"
                  type="number"
                  name="phone_number"
                  value={inputs.phone_number || ""}
                  onChange={handleChange}
                />
              </SearchContainer>
            </Box>
            <Box>
              <Label htmlFor="document">Upload CAC doc</Label>
              <SearchContainer>
                <Input type="file" onChange={handleFileChange} />
              </SearchContainer>
            </Box>
          </MiniContainer>
          <MiniContainer>
            <Box>
              <Label htmlFor="service">Service</Label>
              <SearchContainer>
                <Select
                  name="service"
                  value={inputs.service || ""}
                  onChange={handleChange}
                >
                  <option value="others"></option>
                  {services.map((service) => (
                    <option key={service.id} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </Select>
              </SearchContainer>
            </Box>
            <Box>
              <Label htmlFor="state">State</Label>
              <SearchContainer>
                <Select
                  name="state"
                  value={inputs.state || ""}
                  onChange={handleChange}
                >
                  <option value="others"></option>
                  {states.map((location) => (
                    <option key={location.id} value={location.state}>
                      {location.state}
                    </option>
                  ))}
                </Select>
              </SearchContainer>
            </Box>
          </MiniContainer>
          <MiniContainer>
            <Box>
              <Label htmlFor="password">Password</Label>
              <SearchContainer>
                <Input
                  placeholder="password"
                  type="password"
                  name="password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                  required
                />
              </SearchContainer>
            </Box>
            <Box>
              <Label htmlFor="re_password">Password Again</Label>
              <SearchContainer>
                <Input
                  placeholder="confirm password"
                  type="password"
                  name="re_password"
                  value={inputs.re_password || ""}
                  onChange={handleChange}
                  required
                />
              </SearchContainer>
            </Box>
          </MiniContainer>
          <Label htmlFor="status">Subscription Status</Label>
          <SearchContainer>
            <Input
              type="text"
              name="status"
              value="off"
              onChange={handleChange}
              readOnly
            />
          </SearchContainer>

          <Button type="submit">Submit</Button>
        </Form>
      </FormDisplay>
    </Container>
  );
};

export default AddUserForm;
