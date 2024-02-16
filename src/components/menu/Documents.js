import {Details,InfoWrapper,PersonalInfo,Header,HeaderValue,HorizontalLine} from './StyledMenu'


const Documents = ()=>(
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
        Document Information
      </p>
      <InfoWrapper>
      <PersonalInfo>
          <Header>Land Property</Header>
          <HeaderValue>Coming soon</HeaderValue>
        </PersonalInfo>
      </InfoWrapper>
      <HorizontalLine />
      </Details>
)

export default Documents