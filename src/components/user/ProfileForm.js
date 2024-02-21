import { useState, useEffect } from "react";
import { sectors } from "../utility/AdminAction";
import { useNavigate, useLocation } from "react-router-dom";
import { Form } from "reactstrap";

import { mergeFields } from "../utility/AdminAction";
import {
  Wrapper,
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
  Back,
} from "../Styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { signup, add_portfolio } from "../../action/auth";
import { connect } from "react-redux";

const ProfileForm = ({ signup, isAuthenticated, add_portfolio }) => {
  document.title = "new user";
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;
  const [inputs, setInputs] = useState({});

  const Handleback = () => {
    navigate(-1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { state: "proceed to login" });
    }
  }, [isAuthenticated, navigate]);

  const profileKeys = [
    "firstName",
    "lastName",
    "phoneNumber",
    "gender",
    "address",
    "email",
    "userName",
  ];

  const organizationKeys = [
    "orgName",
    "orgNumber",
    "employmentStatus",
    "sector",
    "duration",
    "officeEmail",
  ];

  const educationKeys = ["level"];
  const socialsKeys = ["facebook", "twitter", "instagram"];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const partProfile = mergeFields(inputs, profileKeys);
    const profile = {
      ...partProfile,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      status: "Inactive",
    };
    const socials = mergeFields(inputs, socialsKeys);
    const education = mergeFields(inputs, educationKeys);
    const organization = mergeFields(inputs, organizationKeys);

    const data = new FormData();

    data.append("organization", JSON.stringify(organization));
    data.append("education", JSON.stringify(education));
    data.append("socials", JSON.stringify(socials));
    data.append("profile", JSON.stringify(profile));
    signup(
      user.email,
      user.first_name,
      user.last_name,
      user.state,
      user.password,
      user.re_password
    );
    add_portfolio(data);
  };

  const formDisplay = {
    width: "100%",
  };

  return (
    <Container className="page-load">
      <Title>Kindly update this Information</Title>
      <Back>
        <ArrowBackIcon onClick={() => Handleback()} />
      </Back>

      <FormDisplay>
        <Form
          style={formDisplay}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <Label style={{ fontWeight: "bold" }}>Profile</Label>
          <Wrapper>
            <MiniContainer>
              <Box>
                <Label htmlFor="firstName">First Name</Label>
                <SearchContainer>
                  <Input
                    placeholder="first name"
                    type="text"
                    name="firstName"
                    value={user.first_name}
                    readOnly
                  />
                </SearchContainer>
              </Box>
              <Box>
                <Label htmlFor="lastName">Last Name</Label>
                <SearchContainer>
                  <Input
                    placeholder="last name"
                    type="text"
                    name="lastName"
                    value={user.last_name}
                    readOnly
                  />
                </SearchContainer>
              </Box>
              <Box>
                <Label htmlFor="email">Email</Label>
                <SearchContainer>
                  <Input
                    placeholder="email"
                    type="email"
                    name="email"
                    value={user.email}
                    readOnly
                  />
                </SearchContainer>
              </Box>
              <Box>
                <Label htmlFor="userName">Username</Label>
                <SearchContainer>
                  <Input
                    placeholder="Username"
                    type="text"
                    name="userName"
                    value={inputs.userName || ""}
                    onChange={handleChange}
                    required
                  />
                </SearchContainer>
              </Box>
              <Box>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <SearchContainer>
                  <Input
                    placeholder="e.g +1 389 109 1987"
                    type="text"
                    name="phoneNumber"
                    value={inputs.phoneNumber || ""}
                    onChange={handleChange}
                    required
                  />
                </SearchContainer>
              </Box>
              <Box>
                <Label htmlFor="gender">Gender</Label>
                <SearchContainer>
                  <Select
                    name="gender"
                    value={inputs.gender || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="others"></option>
                    <option style={{ fontSize: 14 }} value="male">
                      Male
                    </option>
                    <option value="female">Female</option>
                  </Select>
                </SearchContainer>
              </Box>
              <Box>
                <Label htmlFor="address">Address</Label>
                <SearchContainer>
                  <Input
                    placeholder="Home Address"
                    type="text"
                    name="address"
                    value={inputs.address || ""}
                    onChange={handleChange}
                    required
                  />
                </SearchContainer>
              </Box>
              <Box>
                <Label htmlFor="level">Education Level</Label>
                <SearchContainer>
                  <Select
                    name="level"
                    value={inputs.level || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="others"></option>
                    <option value="BSC">Degree</option>
                    <option value="MSC">Masters</option>
                    <option value="PHD">Professorship</option>
                    <option value="OND">OND</option>
                    <option value="HND">HND</option>
                    <option value="SSCE">Secondary</option>
                    <option value="PRIMARY">Primary</option>
                  </Select>
                </SearchContainer>
              </Box>
            </MiniContainer>
          </Wrapper>

          <Label style={{ fontWeight: "bold" }}>Organization</Label>
          <Wrapper>
            <MiniContainer>
              <Box>
                <Label htmlFor="orgName">Organization Name</Label>
                <SearchContainer>
                  <Input
                    placeholder="Name of your Organization"
                    type="text"
                    name="orgName"
                    value={inputs.orgName || ""}
                    onChange={handleChange}
                  />
                </SearchContainer>
              </Box>
              <Box>
                <Label htmlFor="orgNumber">Organization Number</Label>
                <SearchContainer>
                  <Input
                    placeholder="Organization Number"
                    type="text"
                    name="orgNumber"
                    value={inputs.orgNumber || ""}
                    onChange={handleChange}
                  />
                </SearchContainer>
              </Box>
              <Box>
                <Label htmlFor="officeEmail">Organization Email</Label>
                <SearchContainer>
                  <Input
                    placeholder="Organization Email"
                    type="email"
                    name="officeEmail"
                    value={inputs.officeEmail || ""}
                    onChange={handleChange}
                  />
                </SearchContainer>
              </Box>

              <Box>
                <Label htmlFor="employmentStatus">Employment Status</Label>
                <SearchContainer>
                  <Select
                    name="employmentStatus"
                    value={inputs.employmentStatus || ""}
                    onChange={handleChange}
                  >
                    <option value="others"></option>
                    <option value="Employed">Employed</option>
                    <option value="Unemployed">Unemployed</option>
                    <option value="Self-employed">Self-Employed</option>
                    <option value="Retired">Retired</option>
                  </Select>
                </SearchContainer>
              </Box>
              <Box>
                <Label htmlFor="sector">Sector</Label>
                <SearchContainer>
                  <Select
                    name="sector"
                    value={inputs.sector || ""}
                    onChange={handleChange}
                  >
                    {sectors.map((sector) => (
                      <option key={sector.id} value={sector.name}>
                        {sector.name}
                      </option>
                    ))}
                  </Select>
                </SearchContainer>
              </Box>
              <Box>
                <Label htmlFor="duration">Duration</Label>
                <SearchContainer>
                  <Input
                    placeholder="e.g 2 Years"
                    type="text"
                    name="duration"
                    value={inputs.duration || ""}
                    onChange={handleChange}
                  />
                </SearchContainer>
              </Box>
            </MiniContainer>
          </Wrapper>

          <Label style={{ fontWeight: "bold" }}>Social</Label>
          <Wrapper>
            <MiniContainer>
              <Box>
                <Label htmlFor="facebook">Facebook</Label>
                <SearchContainer>
                  <Input
                    placeholder="facebook"
                    type="text"
                    name="facebook"
                    value={inputs.facebook || ""}
                    onChange={handleChange}
                  />
                </SearchContainer>
              </Box>
              <Box>
                <Label htmlFor="instagram">Instagram</Label>
                <SearchContainer>
                  <Input
                    placeholder="Instagram handle"
                    type="text"
                    name="instagram"
                    value={inputs.instagram || ""}
                    onChange={handleChange}
                  />
                </SearchContainer>
              </Box>
              <Box>
                <Label htmlFor="twitter">Twitter/X</Label>
                <SearchContainer>
                  <Input
                    placeholder="X handle"
                    type="text"
                    name="twitter"
                    value={inputs.twitter || ""}
                    onChange={handleChange}
                  />
                </SearchContainer>
              </Box>
            </MiniContainer>
          </Wrapper>

          <Button type="submit">Submit</Button>
        </Form>
      </FormDisplay>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup, add_portfolio })(ProfileForm);
