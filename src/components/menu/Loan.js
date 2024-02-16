import {Details,InfoWrapper,PersonalInfo,Header,HeaderValue,HorizontalLine} from './StyledMenu'


const Loan = ()=>(
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
        Loan History
      </p>
      <InfoWrapper>
      <PersonalInfo>
          <Header>Loan Orders</Header>
          <HeaderValue>Coming soon</HeaderValue>
        </PersonalInfo>
      </InfoWrapper>
      <HorizontalLine />
      </Details>
)

export default Loan