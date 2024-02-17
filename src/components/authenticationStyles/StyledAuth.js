import styled from "styled-components";


export const Container = styled.div`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  right: 20px;
  left: 20px;
`;

export const Brand = styled.div`
  display: flex;
  flex: 0.5;
  margin-bottom: 30px;
  line-height: 36px;
  align-items: center;
  justify-content: left;
`;

export const BrandName = styled.h1`
  color: #00308f;
  font-weight: bold;
  align-items: center;
  justify-content: center;
`;

export const BrandLogo = styled.div`
  align-items: center;
  justify-content: center;
`;
export const Item = styled.div`
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const SearchContainer = styled.div`
  margin-top: 14px;
  border: 3px solid #bbbbb4;
  border-radius: 6px;
  align-items: center;
  justify-content: flex-start;
  display: flex;
  height: 50px;
  width: 80%;
  font-family: "Avenir Next";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #545f7d;
  opacity: 0.6;
`;

export const Left = styled.div`
  width: 50%;
  display: block;
`;

export const Right = styled.div`
  width: 50%;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  @media screen and (min-width: 0px) and (max-width: 568px) {
    width: 100%;
    margin: 5px;
    ${Left} {
      display: none;
      width: 0%;
    }
    ${SearchContainer} {
      height: 35px;
    }
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 100%;
`;

export const Input = styled.input`
  type: ${(props) => props.type};
  margin-left: 10px;
  border: none;
  width: 80%;
  border-style: none;
  &:focus {
    outline: none;
    border-color: none;
    border: none;
  }
`;

export const Art = styled.img`
  width: 100%;
  margin-top: 20px;
  justity-content: center;
`;

export const Desc = styled.span`
  justify-content: center;
  align-items: right;
  display: flex;
  font-family: "Avenir Next";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #39cdcc;
  cursor: pointer;
`;