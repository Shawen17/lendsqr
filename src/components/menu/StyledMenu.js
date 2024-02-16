import styled from "styled-components";


export const Container = styled.div`
  padding: 8px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  overflow-x: hidden;
`;

export const Left = styled.div`
  position: relative;
`;

export const Right = styled.div`
  width: 75%;

  @media screen and (max-width: 568px) {
    width: 100%;
    margin: 1px;
  }
`;

export const UserAction = styled.div`
  display: flex;
  justify-content: space-even;
  align-items: center;
  margin-left: 80px;
  @media screen and (max-width: 568px) {
    margin: 5px;
  }
`;
export const UserActionButton = styled.button`
height:40px;
width:200px;
border-radius:6px;
margin-left:auto
font-size:15px;
font-weight:bold;
margin-right:10px;
border:1px solid ${(props) => props.color};
color: ${(props) => props.color};

&:hover{
  transform:scale(1.1);
  transistion:1s ease-in-out;
  background-color:white;
}
@media screen and (max-width:568px){
    height:40px;
    width:130px;
    font-size:12px;
    margin:auto;
    color: ${(props) => props.color};
    border:1px solid ${(props) => props.color};
    
}`;

export const Info = styled.div`
  margin-left: 80px;
  background-color: white;
  margin-top: 30px;
  border-radius: 4px;

  @media screen and (max-width: 568px) {
    margin: 5px;
    height: 240px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #213f7d;
  position: relative;
  margin-bottom: 50px;
  padding-top: 40px;
`;

export const VerticalLine = styled.div`
  border-left: 1px solid #ccc;
  height: 100px;
  margin-right: 10px;
  @media screen and (max-width: 568px) {
    margin-right: 1px;
  }
`;

export const Rating = styled.div`
  display: flex;
  color: yellow;
`;

export const ProfilePic = styled.img`
  border-radius: 50%;
  height: 100px;
  width: 100px;
  margin-left: 20px;
  margin-right: 20px;
  color: #213f7d;
  @media screen and (max-width: 568px) {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    margin: 5px;
  }
`;

export const HorizontalLine = styled.div`
  border-bottom: 1px solid #ccc;
  width: 100%;
  margin: 10px 10px;
`;

export const Details = styled.div`
  margin-left: 80px;
  background-color: white;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: left;
  border-radius: 4px;
  color: #213f7d;
  position: relative;
  @media screen and (max-width: 568px) {
    margin: 5px;
    ${HorizontalLine} {
      width: 100%;
    }
  }
`;

export const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: #545f7d;
  margin-right: 50px;
`;

export const Header = styled.p`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-transform: uppercase;
`;

export const HeaderValue = styled.p`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 15px;
  margin: 20px 20px;
  width: 100%;
  @media screen and (max-width: 568px) {
    margin: 10px 10px;
    ${PersonalInfo} {
      margin: 4px;
    }
    ${Header} {
      font-size: 9px;
      line-height: 11px;
      font-weight: bold;
    }
    ${HeaderValue} {
      font-size: 12px;
      line-height: 14px;
    }
  }
`;

export const Tabs = styled.div`
  display: flex;
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 568px) {
    margin-buttom: 10px;
    font-size: 12px;
    line-height: 16px;
    margin: 0px;
  }
`;

export const TabDesc = styled.div`
  text-align: center;
  height: 22px;
  width: 170px;
  background-color: white;
  cursor: pointer;

  &:hover {
    color: #39cdcc;
    border-bottom: 2px solid #39cdcc;
  }
`;
