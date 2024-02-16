import {Details,InfoWrapper,PersonalInfo,Header,HeaderValue,HorizontalLine} from './StyledMenu'



const displayGeneral = (user) => (
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
        Personal Information
      </p>

      <InfoWrapper>
        <PersonalInfo>
          <Header>full Name</Header>
          <HeaderValue>{`${user.profile.firstName} ${user.profile.lastName}`}</HeaderValue>
        </PersonalInfo>
        <PersonalInfo>
          <Header>Phone Number</Header>
          <HeaderValue>{user.profile.phoneNumber}</HeaderValue>
        </PersonalInfo>
        <PersonalInfo>
          <Header>Email Address</Header>
          <HeaderValue>{user.profile.email}</HeaderValue>
        </PersonalInfo>
        <PersonalInfo>
          <Header>Bvn</Header>
          <HeaderValue> {user.profile.bvn}</HeaderValue>
        </PersonalInfo>
        <PersonalInfo>
          <Header>Gender</Header>
          <HeaderValue>{user.profile.gender}</HeaderValue>
        </PersonalInfo>
      </InfoWrapper>
      <HorizontalLine />
      <p
        style={{
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "bold",
          lineHeight: "19px",
          margin: "20px 20px",
        }}
      >
        Education and Employment
      </p>
      <InfoWrapper>
        <PersonalInfo>
          <Header>level of education</Header>
          <HeaderValue>{user.education.level}</HeaderValue>
        </PersonalInfo>
        <PersonalInfo>
          <Header>employment status</Header>
          <HeaderValue>{user.organization.employmentStatus}</HeaderValue>
        </PersonalInfo>
        <PersonalInfo>
          <Header>sector of employment</Header>
          <HeaderValue>{user.organization.sector}</HeaderValue>
        </PersonalInfo>
        <PersonalInfo>
          <Header>Duration of employment</Header>
          <HeaderValue>{user.organization.duration}</HeaderValue>
        </PersonalInfo>
      </InfoWrapper>
      <InfoWrapper>
        <PersonalInfo>
          <Header>office email</Header>
          <HeaderValue>{user.organization.officeEmail}</HeaderValue>
        </PersonalInfo>
        <PersonalInfo>
          <Header>Monthly income</Header>
          <HeaderValue>{`₦${user.account.monthlyIncome[0]}-₦${user.account.monthlyIncome[1]}`}</HeaderValue>
        </PersonalInfo>
        <PersonalInfo>
          <Header>loan repayment</Header>
          <HeaderValue>{user.account.loanRepayment}</HeaderValue>
        </PersonalInfo>
      </InfoWrapper>
      <HorizontalLine />
      <p
        style={{
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "bold",
          lineHeight: "19px",
          margin: "20px 20px",
        }}
      >
        Socials
      </p>
      <InfoWrapper>
        <PersonalInfo>
          <Header>Twitter</Header>
          <HeaderValue>{user.socials.twitter} </HeaderValue>
        </PersonalInfo>
        <PersonalInfo>
          <Header>Facebook</Header>
          <HeaderValue>{user.socials.facebook}</HeaderValue>
        </PersonalInfo>
        <PersonalInfo>
          <Header>Instagram</Header>
          <HeaderValue>{user.socials.instagram}</HeaderValue>
        </PersonalInfo>
      </InfoWrapper>
      <HorizontalLine />
      <p
        style={{
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "bold",
          lineHeight: "19px",
          margin: "20px 20px",
        }}
      >
        Guarantor
      </p>
      <InfoWrapper>
        <PersonalInfo>
          <Header>full Name</Header>
          <HeaderValue>{`${user.guarantor.guaFirstName} ${user.guarantor.guaLastName}`}</HeaderValue>
        </PersonalInfo>
        <PersonalInfo>
          <Header>Phone Number</Header>
          <HeaderValue>{user.guarantor.guaNumber}</HeaderValue>
        </PersonalInfo>

        <PersonalInfo>
          <Header>Relationship</Header>
          <HeaderValue>{user.guarantor.relationship}</HeaderValue>
        </PersonalInfo>
        <PersonalInfo>
          <Header>Address</Header>
          <HeaderValue>{user.guarantor.guaAddress}</HeaderValue>
        </PersonalInfo>
      </InfoWrapper>
    </Details>
  );

  export default displayGeneral