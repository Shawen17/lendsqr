import { useEffect, useState } from "react";
import {
  banks,
  sectors,
  relationships,
} from "../components/utility/AdminAction";
import { useNavigate, useLocation } from "react-router-dom";
import { Form } from "reactstrap";
import axios from "axios";
import { mergeFields } from "../components/utility/AdminAction";
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
} from "../components/Styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import Loading from "../components/Loading";

const UpdateUserForm = () => {
  document.title = "update user profile";
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({});
  const [msg, setMsg] = useState("");
  const [data, setData] = useState(user);
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [updated]);

  const Handleback = () => {
    navigate(-1);
  };

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
  const accountKeys = [
    "accountName",
    "accountBalance",
    "loanRepayment",
    "accountNumber",
    "bank",
  ];
  const educationKeys = ["level"];
  const socialsKeys = ["facebook", "twitter", "instagram"];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const body = new FormData();

    const profile = mergeFields(inputs, profileKeys);
    const guarantor = mergeFields(inputs, guarantorKeys);
    const socials = mergeFields(inputs, socialsKeys);
    const education = mergeFields(inputs, educationKeys);
    const organization = mergeFields(inputs, organizationKeys);
    const partAccount = mergeFields(inputs, accountKeys);

    const minimumIncome = inputs.minimumIncome;
    const maximumIncome = inputs.maximumIncome;
    var monthlyIncome;
    if (minimumIncome || maximumIncome) {
      if (minimumIncome) {
        monthlyIncome = [minimumIncome, data.account.monthlyIncome[1]];
      } else {
        monthlyIncome = [data.account.monthlyIncome[0], maximumIncome];
      }
      var account = { ...partAccount, monthlyIncome: monthlyIncome };
      body.append("account", JSON.stringify(account));
    }

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
        .then((response) => {
          setLoading(false);
          setData(response.data);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.response.status);
        });
      setUpdated(!updated);
      setMsg("User updated successfully");
    } catch (error) {
      setLoading(false);
      setError(error.response.status);
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
      <Container>
        <Title>Update User Profile</Title>
        <Back>
          <ArrowBackIcon onClick={() => Handleback()} />
        </Back>
        <p style={{ color: "red" }}>{error}</p>
        <p>{msg}</p>
        {loading ? Loading() : ""}
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
                      value={data.profile.firstName}
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
                      value={inputs.lastName || data.profile.lastName}
                      onChange={handleChange}
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
                      value={inputs.email || data.profile.email}
                      onChange={handleChange}
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
                      value={data.profile.userName}
                      readOnly
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
                      value={inputs.phoneNumber || data.profile.phoneNumber}
                      onChange={handleChange}
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
                  <Label htmlFor="gender">Gender</Label>
                  <SearchContainer>
                    <Select
                      name="gender"
                      value={inputs.gender || data.profile.gender}
                      onChange={handleChange}
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
                      value={inputs.address || data.profile.address}
                      onChange={handleChange}
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
                <Box>
                  <Label htmlFor="status">Activity Status</Label>
                  <SearchContainer>
                    <Select
                      name="status"
                      value={inputs.status || data.profile.status}
                      onChange={handleChange}
                    >
                      <option value="others"></option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                      <option value="Blacklisted">Blacklisted</option>
                    </Select>
                  </SearchContainer>
                </Box>
              </MiniContainer>
            </Wrapper>
            <Label style={{ fontWeight: "bold" }}>Account</Label>
            <Wrapper>
              <MiniContainer>
                <Box>
                  <Label htmlFor="accountName">Account Number</Label>
                  <SearchContainer>
                    <Input
                      placeholder="Account Number"
                      type="text"
                      name="accountName"
                      value={inputs.accountName || data.account.accountName}
                      onChange={handleChange}
                    />
                  </SearchContainer>
                </Box>
                <Box>
                  <Label htmlFor="accountNumber">Bank Account</Label>
                  <SearchContainer>
                    <Input
                      placeholder="Account Number"
                      type="number"
                      name="accountNumber"
                      value={inputs.accountNumber || data.account.accountNumber}
                      onChange={handleChange}
                    />
                  </SearchContainer>
                </Box>
                <Box>
                  <Label htmlFor="bank">Bank</Label>
                  <SearchContainer>
                    <Select
                      name="bank"
                      value={inputs.bank || data.account.bank}
                      onChange={handleChange}
                    >
                      {banks.map((bank) => (
                        <option key={bank.id} value={bank.name}>
                          {bank.name}
                        </option>
                      ))}
                    </Select>
                  </SearchContainer>
                </Box>
                <Box>
                  <Label htmlFor="accountBalance">Account Balance</Label>
                  <SearchContainer>
                    <Input
                      placeholder="Account Balance"
                      type="number"
                      step="0.01"
                      name="accountBalance"
                      value={
                        inputs.accountBalance || data.account.accountBalance
                      }
                      onChange={handleChange}
                    />
                  </SearchContainer>
                </Box>
                <Box>
                  <Label htmlFor="bvn">BVN</Label>
                  <SearchContainer>
                    <Input
                      placeholder="BVN"
                      type="number"
                      name="bvn"
                      value={inputs.bvn || data.profile.bvn}
                      readOnly
                    />
                  </SearchContainer>
                </Box>
                <Box>
                  <Label htmlFor="loanRepayment">Loan Repayment</Label>
                  <SearchContainer>
                    <Input
                      placeholder="Loan Repayment"
                      type="number"
                      step="0.01"
                      name="loanRepayment"
                      value={inputs.loanRepayment || data.account.loanRepayment}
                      onChange={handleChange}
                    />
                  </SearchContainer>
                </Box>
                <Box>
                  <Label htmlFor="minimumIncome">Minimum Income</Label>
                  <SearchContainer>
                    <Input
                      placeholder="Minimum Income"
                      type="number"
                      step="0.01"
                      name="minimumIncome"
                      value={
                        inputs.minimumIncome || data.account.monthlyIncome[0]
                      }
                      onChange={handleChange}
                    />
                  </SearchContainer>
                </Box>
                <Box>
                  <Label htmlFor="maximumIncome">Maximun Income</Label>
                  <SearchContainer>
                    <Input
                      placeholder="Maximum Income"
                      type="number"
                      step="0.01"
                      name="maximumIncome"
                      value={
                        inputs.maximumIncome || data.account.monthlyIncome[1]
                      }
                      onChange={handleChange}
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
                      value={inputs.orgName || data.organization.orgName}
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
                      value={inputs.orgNumber || data.organization.orgNumber}
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
                      value={
                        inputs.officeEmail || data.organization.officeEmail
                      }
                      onChange={handleChange}
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
            <Label style={{ fontWeight: "bold" }}>Guarantor</Label>
            <Wrapper>
              <MiniContainer>
                <Box>
                  <Label htmlFor="guaFirstName">First Name</Label>
                  <SearchContainer>
                    <Input
                      placeholder="Guarantor's First name"
                      type="text"
                      name="guaFirstName"
                      value={data.guarantor.guaFirstName}
                      readOnly
                    />
                  </SearchContainer>
                </Box>
                <Box>
                  <Label htmlFor="guaLastName">Last Name</Label>
                  <SearchContainer>
                    <Input
                      placeholder="Gurantor's Last name"
                      type="text"
                      name="guaLastName"
                      value={data.guarantor.guaLastName}
                      readOnly
                    />
                  </SearchContainer>
                </Box>
                <Box>
                  <Label htmlFor="guaNumber">Phone Number</Label>
                  <SearchContainer>
                    <Input
                      placeholder="Guarantor's Number"
                      type="text"
                      name="guaNumber"
                      value={data.guarantor.guaNumber}
                      readOnly
                    />
                  </SearchContainer>
                </Box>
                <Box>
                  <Label htmlFor="guaAddress">Address</Label>
                  <SearchContainer>
                    <Input
                      placeholder="Guarantor's Address"
                      type="text"
                      name="guaAddress"
                      value={inputs.guaAddress || data.guarantor.guaAddress}
                      onChange={handleChange}
                    />
                  </SearchContainer>
                </Box>
                <Box>
                  <Label htmlFor="guaGender">Gender</Label>
                  <SearchContainer>
                    <Select
                      name="guaGender"
                      value={inputs.guaGender || data.guarantor.guaGender}
                      onChange={handleChange}
                    >
                      <option value="others"></option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Select>
                  </SearchContainer>
                </Box>
                <Box>
                  <Label htmlFor="relationship">Relationship</Label>
                  <SearchContainer>
                    <Select
                      name="relationship"
                      value={inputs.relationship || data.guarantor.relationship}
                      onChange={handleChange}
                    >
                      {relationships.map((relationship) => (
                        <option key={relationship.id} value={relationship.name}>
                          {relationship.name}
                        </option>
                      ))}
                    </Select>
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
                      value={data.socials.facebook}
                      readOnly
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
                      value={data.socials.instagram}
                      readOnly
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
                      value={data.socials.twitter}
                      readOnly
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

export default UpdateUserForm;
