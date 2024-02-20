import {
  Details,
  InfoWrapper,
  PersonalInfo,
  Header,
  HeaderValue,
  HorizontalLine,
} from "../menu/StyledMenu";

const LoanHistory = () => {
  return (
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
        All Loans
      </p>
      <InfoWrapper>
        <PersonalInfo>
          <Header>All Loan Applications</Header>
          <HeaderValue>Coming soon</HeaderValue>
        </PersonalInfo>
      </InfoWrapper>
      <HorizontalLine />
    </Details>
  );
};

export default LoanHistory;