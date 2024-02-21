import {
  Details,
  InfoWrapper,
  PersonalInfo,
  Header,
  HeaderValue,
  HorizontalLine,
} from "../menu/StyledMenu";
import { useState, useEffect } from "react";
import axios from "axios";

const LoanHistory = ({ user }) => {
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState("");

  const formatDate = (input) => {
    const date = new Date(input);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-GB", options);
  };

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      axios
        .get(
          `${process.env.REACT_APP_LENDSQR_API_URL}/api/loan/`,
          {
            params: { email: user.profile.email },
          },
          config
        )
        .then((res) => setLoans(res.data))
        .catch((error) => setError(error));
    } catch (error) {
      setError(error);
    }
  }, [user.profile.email]);

  return (
    <Details>
      <p>{error}</p>
      <p
        style={{
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "bold",
          lineHeight: "19px",
          margin: "20px 20px",
        }}
      >
        All Loans
      </p>
      {loans.length > 0 ? (
        loans.map((loan) => (
          <div key={loan._id}>
            <InfoWrapper>
              <PersonalInfo>
                <Header>Date Requested</Header>
                <HeaderValue>{formatDate(loan.createdAt)}</HeaderValue>
              </PersonalInfo>
              <PersonalInfo>
                <Header>Loan Amount</Header>
                <HeaderValue>{`₦${parseFloat(
                  loan.loan.amount
                ).toLocaleString()}`}</HeaderValue>
              </PersonalInfo>
              <PersonalInfo>
                <Header>Loan Duration</Header>
                <HeaderValue>{`${loan.loan.duration} months`}</HeaderValue>
              </PersonalInfo>
              <PersonalInfo>
                <Header>Loan Repayment</Header>
                <HeaderValue>{`₦${parseFloat(
                  loan.loan.loanRepayment
                ).toLocaleString()}`}</HeaderValue>
              </PersonalInfo>
              <PersonalInfo>
                <Header>Bank</Header>
                <HeaderValue>{loan.loan.bank}</HeaderValue>
              </PersonalInfo>
              <PersonalInfo>
                <Header>Account Number</Header>
                <HeaderValue>{loan.loan.accountNumber}</HeaderValue>
              </PersonalInfo>
              <PersonalInfo>
                <Header>Approval Status</Header>
                <HeaderValue>{user.profile.status}</HeaderValue>
              </PersonalInfo>
              <PersonalInfo>
                <Header>Guarantor's Name</Header>
                <HeaderValue>{`${loan.guarantor.guaFirstName}  ${loan.guarantor.guaLastName}`}</HeaderValue>
              </PersonalInfo>
              <PersonalInfo>
                <Header>Guarantor's Number</Header>
                <HeaderValue>{loan.guarantor.guaNumber}</HeaderValue>
              </PersonalInfo>
              <PersonalInfo>
                <Header>Guarantor's Gender</Header>
                <HeaderValue>{loan.guarantor.guaGender}</HeaderValue>
              </PersonalInfo>
              <PersonalInfo>
                <Header>Guarantor's Relationship</Header>
                <HeaderValue>{loan.guarantor.relationship}</HeaderValue>
              </PersonalInfo>
              <PersonalInfo>
                <Header>Guarantor's Address</Header>
                <HeaderValue>{loan.guarantor.guaAddress}</HeaderValue>
              </PersonalInfo>
            </InfoWrapper>
            <HorizontalLine />
          </div>
        ))
      ) : (
        <p>Our loans are affordable, why don't you take one today</p>
      )}
    </Details>
  );
};

export default LoanHistory;
