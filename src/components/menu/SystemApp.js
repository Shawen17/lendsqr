import {Details,InfoWrapper,PersonalInfo,Header,HeaderValue,HorizontalLine} from './StyledMenu'


const SystemApp = ()=>(
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
        Apps 
      </p>
      <InfoWrapper>
      <PersonalInfo>
          <Header>Mobile Apps</Header>
          <HeaderValue>Coming soon</HeaderValue>
        </PersonalInfo>
      </InfoWrapper>
      <HorizontalLine />
      </Details>
)

export default SystemApp