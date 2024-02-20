import styled from "styled-components";

export const Back = styled.div`
  padding-left: 15px;
  cursor: pointer;
  margin-right: auto;
  margin-bottom: 10px;
`;

export const Outline = styled.div`
  display: flex;
  margin-top: 8px;
  font-size: 15px;
  align-items: center;
  justify-content: center;
  color: black;

  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 15px 0px 25px;
  align-items: center;
  justify-content: centre;
  color: #126180;

  @media screen and (max-width: 568px) {
    margin: 40px 5px 10px 20px;
  }
`;

export const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: centre;
  color: white;
  background-image: url("/static/icons/signup.jpg");
  background-size: cover;
  height: 100vh;
`;

export const FormDisplay = styled.div`
  width: 80%;
  text-align: center;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;

  @media screen and (max-width: 568px) {
    padding: 10px;
    width: 100%;
    margin: 0px;
  }
`;

export const SignupDisplay = styled.div`
  width: 40%;
  text-align: center;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  border-radius: 6px;
  background-color: transparent;

  @media screen and (max-width: 568px) {
    padding: 10px;
    width: 100%;
    margin: 0px;
  }
`;

export const Wrapper = styled.div`
  padding: 10px;
  box-shadow: 3px 0px 3px 3px rgba(63, 122, 239, 0.6);
  margin-bottom: 10px;
  border-radius: 6px;
`;

export const Button = styled.button`
  width: 50%;
  height: 40px;
  border-radius: 6px;
  color: white;
  background-color: #0eb3f4;
  margin-top: 10px;

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
`;

export const Input = styled.input`
  width: 100%;
  color: black;
  border: none;
  border-radius: 6px;
  background-color: transparent;
  border-style: none;
  font-size: 14px;
  font-family: "Urbanist", sans-serif;
  font-weight: bold;

  ::placeholder {
    font-size: 10px;
    font-style: italic;
    font-weight: bold;
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
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;

  @media screen and (max-width: 343px) {
  }
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

export const Select = styled.select`
  width: 100%;
  border: none;
  font-size: 14px;
  background-color: transparent;
  border-style: none;
  &:focus {
    outline: none;
    border-color: none;
    border: none;
    background-color: transparent;
  }
`;

export const PageButton = styled.button`
  margin: 10px;
  color: grey;
  background-color: transparent;
  border: none;

  &:hover {
    background-color: grey;
    color: whitesmoke;
    border-radius: 6px;
  }
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 50%;
  margin-top: 5px;
  padding: 15px;
`;

export const UserContainer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const Left = styled.div`
  display: flex;
  flex: 25%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Right = styled.div`
  display: flex;
  flex: 70%;
  align-items: flex-start;
  justify-content: flex-start;
`;
