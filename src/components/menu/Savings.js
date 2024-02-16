import {Details,InfoWrapper,PersonalInfo,Header,HeaderValue,HorizontalLine} from './StyledMenu'


const Savings = ()=>(
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
        Savings Information
      </p>
      <InfoWrapper>
      <PersonalInfo>
          <Header>Personal Savings</Header>
          <HeaderValue>Coming soon</HeaderValue>
        </PersonalInfo>
      </InfoWrapper>
      <HorizontalLine />
      </Details>
)

export default Savings