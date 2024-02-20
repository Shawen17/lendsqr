import {
  Details,
  InfoWrapper,
  PersonalInfo,
  Header,
  HeaderValue,
  HorizontalLine,
} from "../menu/StyledMenu";

const LoanForm = () => {
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
        New Loan Application
      </p>
      <InfoWrapper>
        <PersonalInfo>
          <Header>New Loan</Header>
          <HeaderValue>Coming soon</HeaderValue>
        </PersonalInfo>
      </InfoWrapper>
      <HorizontalLine />
    </Details>
  );
};

export default LoanForm;
