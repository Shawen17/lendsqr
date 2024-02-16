import React from "react";
import styled from "styled-components";
import { Input, Label } from "reactstrap";

const Wrapper = styled.div`
  width: 270px;
  height: 550px;
  color: #545f7d;
  background: #ffffff;
  border: 1px solid rgba(84, 95, 125, 0.14);
  box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  font-family: "Work Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  position: absolute;
  top: 450px;
  z-index: 1600;
  @media screen and (min-width: 300px) and (max-width: 414px) {
    top: 500px;
    width: 200px;
  }
  @media screen and (min-width: 415px) and (max-width: 568px) {
    top: 480px;
    width: 200px;
  }
`;
const Action = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 60px;
`;

const ActionButton = styled.button`
margin-left:5px;
height:40px;
width:110px;
font-family: 'Work Sans';
font-style: normal;
font-weight: 600;
font-size: 14px;
display:flex
align-items: center;
justify-content:center;
color: #FFFFFF;
background: #39CDCC;
border: 1px solid #39CDCC;
border-radius: 8px;
flex:1;
z-index:16
`;

const FilterForm = (props) => {
  return (
    <Wrapper>
      <Label>Organization</Label>
      <Input
        className="mb-3"
        placeholder="organization Name"
        type="text"
        name="orgName"
        value={props.inputs.orgName || ""}
        onChange={props.handleChange}
      />

      <Label>Username</Label>
      <Input
        className="mb-3"
        type="text"
        name="userName"
        value={props.inputs.userName || ""}
        placeholder="Username"
        onChange={props.handleChange}
      />
      <Label>Email</Label>
      <Input
        className="mb-3"
        type="email"
        name="email"
        value={props.inputs.email || ""}
        placeholder="Email"
        onChange={props.handleChange}
      />

      <Label>Phone Number</Label>
      <Input
        className="mb-3"
        type="text"
        name="phoneNumber"
        value={props.inputs.phoneNumber || ""}
        placeholder="Phone Number"
        onChange={props.handleChange}
      />
      <Label>Status</Label>
      <Input
        className="mb-3"
        type="select"
        name="status"
        value={props.inputs.status || ""}
        onChange={props.handleChange}
      >
        <option value="">select</option>
        {[
          { id: 1, name: "Active" },
          { id: 2, name: "Inactive" },
          { id: 3, name: "Blacklisted" },
          { id: 4, name: "Pending" },
        ].map((status) => (
          <option key={status.id} value={status.name}>
            {status.name}
          </option>
        ))}
      </Input>
      <Action>
        <ActionButton onClick={props.onReset}>Reset</ActionButton>
        <ActionButton
          onClick={() => {
            props.onFilter();
          }}
        >
          Filter
        </ActionButton>
      </Action>
    </Wrapper>
  );
};

export default FilterForm;
