import {
  Details,
  InfoWrapper,
  PersonalInfo,
  Header,
  HeaderValue,
  HorizontalLine,
} from "../menu/StyledMenu";
import { useState } from "react";
import { banks, relationships } from "../utility/AdminAction";
import { Form } from "reactstrap";
import axios from "axios";
import { mergeFields } from "../utility/AdminAction";
import {
  Wrapper,
  Label,
  Input,
  SearchContainer,
  Button,
  FormDisplay,
  Select,
  Box,
  MiniContainer,
} from "../../components/Styled";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const LoanForm = ({ user, update_portfolio }) => {
  const navigate = useNavigate();
  document.title = "new loan";
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({});
  const [msg, setMsg] = useState("");
  const [click, setClicked] = useState(false);

  const handleChange = (event) => {
    setError("");
    setMsg("");

    const { name, value } = event.target;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));

    if (name === "amount" || name === "duration") {
      const repayment = calculateLoanRepayment(
        inputs.amount || 0,
        15,
        inputs.duration || 0
      );

      setInputs((prevInputs) => ({
        ...prevInputs,
        loanRepayment: repayment,
      }));
    }
  };

  const profileKeys = ["bvn", "currency"];
  const guarantorKeys = [
    "guaAddress",
    "guaFirstName",
    "guaGender",
    "guaLastName",
    "guaNumber",
    "relationship",
  ];

  const accountKeys = [
    "accountBalance",
    "loanRepayment",
    "accountNumber",
    "bank",
  ];

  const loanKeys = [
    "bvn",
    "currency",
    "loanRepayment",
    "accountNumber",
    "duration",
    "bank",
    "amount",
  ];

  const calculateLoanRepayment = (loanAmount, interestRate, months) => {
    if (inputs.amount && inputs.duration) {
      const monthlyInterestRate = interestRate / 100 / 12;

      const monthlyPayment =
        (loanAmount * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -months));

      const totalRepayment = monthlyPayment * months;

      return totalRepayment.toFixed(2);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setClicked(true);

    const profile = mergeFields(inputs, profileKeys);
    const guarantor = mergeFields(inputs, guarantorKeys);
    const partAccount = mergeFields(inputs, accountKeys);
    const partLoan = mergeFields(inputs, loanKeys);
    const loan = {
      ...partLoan,
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      email: user.profile.email,
      phoneNumber: user.profile.phoneNumber,
    };
    const minimumIncome = inputs.minimumIncome;
    const maximumIncome = inputs.maximumIncome;
    const monthlyIncome = [minimumIncome, maximumIncome];
    const account = { ...partAccount, monthlyIncome: monthlyIncome };

    const body = new FormData();
    body.append("account", JSON.stringify(account));
    body.append("profile", JSON.stringify(profile));
    body.append("guarantor", JSON.stringify(guarantor));
    body.append("user_id", user._id);
    update_portfolio(body);

    const data = new FormData();
    data.append("account", JSON.stringify(account));
    data.append("guarantor", JSON.stringify(guarantor));
    data.append("loan", JSON.stringify(loan));

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      await axios
        .post(
          `${process.env.REACT_APP_LENDSQR_API_URL}/api/loan/`,
          data,
          config
        )
        .then((response) => {
          setMsg(response.data.message);
        });
    } catch (error) {
      if (error.response.status === 409) {
        setError(
          "Cannot make a new loan request while you have an active loan."
        );
      } else if (error.response.status === 401) {
        navigate("/");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }

    setClicked(false);
    setInputs({});

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const formDisplay = {
    width: "100%",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Details>
        <p
          style={{
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "bold",
            lineHeight: "19px",
            margin: "20px 20px",
          }}
        >
          New Loan Application
        </p>
        <InfoWrapper>
          <PersonalInfo>
            <Header>New Loan</Header>
            <HeaderValue>We are here for your needs</HeaderValue>
          </PersonalInfo>
        </InfoWrapper>
        <HorizontalLine />
      </Details>
      <p style={{ color: "red" }}>{error}</p>
      <p>{msg}</p>
      {click ? Loading() : ""}
      <FormDisplay>
        <Form
          style={formDisplay}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <Label style={{ fontWeight: "bold" }}>Loan Info</Label>
          <Wrapper>
            <MiniContainer>
              <Box>
                <Label htmlFor="amount">Loan Amount</Label>
                <SearchContainer>
                  <Input
                    placeholder="between 50k-3million"
                    type="number"
                    name="amount"
                    value={inputs.amount || ""}
                    onChange={handleChange}
                  />
                </SearchContainer>
              </Box>
              <Box>
                <Label htmlFor="duration">Loan Duration</Label>
                <SearchContainer>
                  <Input
                    placeholder="in months e.g 11"
                    type="number"
                    name="duration"
                    value={inputs.duration || ""}
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
                    value={inputs.accountNumber || ""}
                    onChange={handleChange}
                  />
                </SearchContainer>
              </Box>
              <Box>
                <Label htmlFor="bank">Bank</Label>
                <SearchContainer>
                  <Select
                    name="bank"
                    value={inputs.bank || ""}
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
                <Label htmlFor="currency">Currency</Label>
                <SearchContainer>
                  <Select
                    name="currency"
                    value={inputs.currency || ""}
                    onChange={handleChange}
                  >
                    <option value="NGN">Naira</option>
                    <option value="USD">Dollars</option>
                    <option value="EUR">Euros</option>
                    <option value="GBP">Pounds</option>
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
                    value={inputs.accountBalance || ""}
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
                    value={inputs.bvn || ""}
                    onChange={handleChange}
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
                    defaultValue={calculateLoanRepayment(
                      inputs.amount,
                      5,
                      inputs.duration
                    )}
                    readOnly
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
                    value={inputs.minimumIncome || ""}
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
                    value={inputs.maximumIncome || ""}
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
                    value={inputs.guaFirstName || ""}
                    onChange={handleChange}
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
                    value={inputs.guaLastName || ""}
                    onChange={handleChange}
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
                    value={inputs.guaNumber || ""}
                    onChange={handleChange}
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
                    value={inputs.guaAddress || ""}
                    onChange={handleChange}
                  />
                </SearchContainer>
              </Box>
              <Box>
                <Label htmlFor="guaGender">Gender</Label>
                <SearchContainer>
                  <Select
                    name="guaGender"
                    value={inputs.guaGender || ""}
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
                    value={inputs.relationship || ""}
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

          <Button type="submit">Submit</Button>
        </Form>
      </FormDisplay>
    </div>
  );
};

export default LoanForm;
