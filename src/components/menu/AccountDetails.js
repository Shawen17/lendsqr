import {
  Details,
  InfoWrapper,
  PersonalInfo,
  Header,
  HeaderValue,
  HorizontalLine,
} from "./StyledMenu";

const AccountDetails = (user) => (
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
      Account Information
    </p>
    <InfoWrapper>
      <PersonalInfo>
        <Header>Account Name</Header>
        <HeaderValue>{user.account.accountName} </HeaderValue>
      </PersonalInfo>
      <PersonalInfo>
        <Header>Bank Account</Header>
        <HeaderValue>{user.account.accountNumber}</HeaderValue>
      </PersonalInfo>
      <PersonalInfo>
        <Header>Bank Name</Header>
        <HeaderValue>{user.account.bank}</HeaderValue>
      </PersonalInfo>
      <PersonalInfo>
        <Header>Bvn</Header>
        <HeaderValue> {user.profile.bvn}</HeaderValue>
      </PersonalInfo>
      <PersonalInfo>
        <Header>Account Balance</Header>
        <HeaderValue>{user.account.accountBalance}</HeaderValue>
      </PersonalInfo>
      <PersonalInfo>
        <Header>Loan Balance</Header>
        <HeaderValue>{user.account.loanRepayment}</HeaderValue>
      </PersonalInfo>
      <PersonalInfo>
        <Header>Monthly income</Header>
        <HeaderValue>{`₦${user.account.monthlyIncome[0]}-₦${user.account.monthlyIncome[1]}`}</HeaderValue>
      </PersonalInfo>
    </InfoWrapper>
    <HorizontalLine />
  </Details>
);

export default AccountDetails;
