import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 15px 0px 15px;
  align-items: center;
  justify-content: centre;
  color: #126180;

  @media screen and (max-width: 568px) {
    margin: 40px 5px 10px 5px;
  }
`;

export const FormDisplay = styled.div`
  width: 40%;
  text-align: center;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;

  @media screen and (max-width: 1100px) {
    padding: 10px;
    width: 80%;
    margin: 0px;
  }
`;

export const Outline = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  align-items: flex-start;
  justify-content: flex-start;
  color: black;

  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 30px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #0eb3f4;
  margin: 20px 0px 5px 0px;
  cursor: pointer;
  &:hover {
    background-color: #126180;
  }
`;

export const SearchContainer = styled.div`
  margin-bottom: 5px;
  border: 2px solid #18a558;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  display: flex;
  height: 30px;
  width: 100%;

  &:hover {
    border: 0.5px solid #18a558;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  border-radius: 6px;
  background-color: transparent;
  border-style: none;

  ::placeholder {
    font-size: 10px;
    font-style: italic;
  }
  &:focus {
    outline: none;
    border: 3px solid #00b894;
    border-right: none;
    box-shadow: 0 0 10px #00b894;
  }
`;

export const Label = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-buttom: 3px;
  font-size: 13px;
`;

export const Title = styled.div`
  display: flex;
  font-size: 18px;
  font-family: "Urbanist", sans-serif;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-weight: bold;
`;

export const MiniContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 343px) {
    flex-direction: column;
  }
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  width: 100%;
`;

export const Select = styled.select`
  width: 100%;
  border: none;
  background-color: transparent;
  border-style: none;
  &:focus {
    outline: none;
    border-color: none;
    border: none;
    background-color: transparent;
  }
`;
