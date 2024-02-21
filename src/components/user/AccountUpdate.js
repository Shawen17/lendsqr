import { useEffect, useState } from "react";
import { sectors, mergeFields } from "../../components/utility/AdminAction";
import { Form } from "reactstrap";
import axios from "axios";
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
} from "../../components/Styled";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { get_portfolio } from "../../action/auth";
import { connect } from "react-redux";

const AccountUpdate = ({ get_portfolio, user }) => {
  document.title = "update your profile";
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({});
  const [msg, setMsg] = useState("");
  const [updated, setUpdated] = useState(false);
  const [data, setData] = useState({
    _id: 0,
    profile: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      userName: "",
      bvn: 0,
      address: "",
    },
    education: { level: "" },
    socials: { facebook: "", twitter: "", instagram: "" },
    organization: {
      orgName: "",
      orgNumber: "",
      officeEmail: "",
      employmentStatus: "",
      sector: "",
      duration: "",
    },
  });

  useEffect(() => {
    setData(user);
  }, [updated, user]);

  const handleChange = (event) => {
    setError("");
    setMsg("");

    const { name, value } = event.target;

    setInputs({ ...inputs, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setInputs({ ...inputs, avatar: file });
    }
  };

  const profileKeys = [
    "firstName",
    "lastName",
    "phoneNumber",
    "gender",
    "bvn",
    "address",
    "currency",
    "email",
    "userName",
    "status",
  ];
  const guarantorKeys = [
    "guaAddress",
    "guaFirstName",
    "guaGender",
    "guaLastName",
    "guaNumber",
    "relationship",
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
    const body = new FormData();

    const profile = mergeFields(inputs, profileKeys);
    const guarantor = mergeFields(inputs, guarantorKeys);
    const socials = mergeFields(inputs, socialsKeys);
    const education = mergeFields(inputs, educationKeys);
    const organization = mergeFields(inputs, organizationKeys);

    inputs.avatar && body.append("avatar", inputs.avatar);
    Object.keys(organization).length > 0 &&
      body.append("organization", JSON.stringify(organization));
    Object.keys(education).length > 0 &&
      body.append("education", JSON.stringify(education));
    Object.keys(socials).length > 0 &&
      body.append("socials", JSON.stringify(socials));
    Object.keys(guarantor).length > 0 &&
      body.append("guarantor", JSON.stringify(guarantor));
    Object.keys(profile).length > 0 &&
      body.append("profile", JSON.stringify(profile));
    body.append("user_id", user._id);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      await axios
        .put(
          `${process.env.REACT_APP_LENDSQR_API_URL}/api/users/`,
          body,
          config
        )
        .then((response) => response)
        .catch((error) => {
          setError(error);
        });
      get_portfolio(data.profile.email);
      setUpdated(!updated);
      setMsg("Details Updated successfully");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/");
      } else {
        setError("Error occurred but no response was received:", error);
      }
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const formDisplay = {
    width: "100%",
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
      <Container style={{ padding: 5, alignItems: "flex-start", margin: 0 }}>
        <Title style={{ marginBottom: 10 }}>Update Your Profile</Title>
        <p style={{ color: "red" }}>{error}</p>
        <p>{msg}</p>
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
                      defaultValue={data.profile.firstName}
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
                      defaultValue={data.profile.lastName}
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
                      defaultValue={data.profile.email}
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
                      value={inputs.userName || data.profile.userName}
                      onChange={handleChange}
                    />
                  </SearchContainer>
                </Box>
                <Box>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <SearchContainer>
                    <Input
                      placeholder="phone number"
                      type="text"
                      name="phoneNumber"
                      defaultValue={data.profile.phoneNumber}
                      readOnly
                    />
                  </SearchContainer>
                </Box>

                <Box>
                  <Label>Upload ProfilePic</Label>
                  <SearchContainer>
                    <Input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleFileChange}
                    />
                  </SearchContainer>
                </Box>

                <Box>
                  <Label htmlFor="address">Address</Label>
                  <SearchContainer>
                    <Input
                      placeholder="Home Address"
                      type="text"
                      name="address"
                      defaultValue={data.profile.address}
                      readOnly
                    />
                  </SearchContainer>
                </Box>
                <Box>
                  <Label htmlFor="level">Education Level</Label>
                  <SearchContainer>
                    <Select
                      name="level"
                      value={inputs.level || data.education.level}
                      onChange={handleChange}
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
            <Label style={{ fontWeight: "bold" }}>Account</Label>
            <Wrapper>
              <MiniContainer>
                <Box>
                  <Label htmlFor="bvn">BVN</Label>
                  <SearchContainer>
                    <Input
                      placeholder="BVN"
                      type="number"
                      name="bvn"
                      defaultValue={data.profile.bvn}
                      readOnly
                    />
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
                      defaultValue={data.organization.orgName}
                      readOnly
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
                      defaultValue={data.organization.orgNumber}
                      readOnly
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
                      defaultValue={data.organization.officeEmail}
                      readOnly
                    />
                  </SearchContainer>
                </Box>

                <Box>
                  <Label htmlFor="employmentStatus">Employment Status</Label>
                  <SearchContainer>
                    <Select
                      name="employmentStatus"
                      value={
                        inputs.employmentStatus ||
                        data.organization.employmentStatus
                      }
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
                      value={inputs.sector || data.organization.sector}
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
                      value={inputs.duration || data.organization.duration}
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
                      value={inputs.facebook || data.socials.facebook}
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
                      value={inputs.instagram || data.socials.instagram}
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
                      value={inputs.twitter || data.socials.twitter}
                      onChange={handleChange}
                    />
                  </SearchContainer>
                </Box>
              </MiniContainer>
            </Wrapper>

            <Button type="submit">Update</Button>
          </Form>
        </FormDisplay>
      </Container>
    </motion.div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth && state.auth.portfolio ? state.auth.portfolio : "",
});

export default connect(mapStateToProps, { get_portfolio })(AccountUpdate);
