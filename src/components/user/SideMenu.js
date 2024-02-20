import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PaidIcon from "@mui/icons-material/Paid";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { connect } from "react-redux";
import { logout } from "../../action/auth";

const Line = styled.div`
  height: 1px;
  width: 200px;
  color: white;
  background-color: white;
`;

const Top = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 200px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.54);
    color: #126180;
    border-radius: 6px;
    transform: scale(1.2);
    transition: 1s ease-out;
  }
`;

const Tp = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 200px;
  font-family: "Bricolage Grotesque", sans-serif;
`;

const Info = styled.div`
  margin-left: 20px;
  font-size: 13px;
  font-family: "Bricolage Grotesque", sans-serif;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 10px 20px 10px;
  border-radius: 8px;

  background: rgba(0, 0, 0, 0.12);

  @media screen and (max-width: 482px) {
    padding: 20px 5px 20px 5px;

    ${Top} {
      width: 130px;
    }
    ${Tp} {
      width: 130px;
    }
    ${Line} {
      width: 120px;
    }
  }
`;

const SideMenu = (props) => {
  return (
    <Container>
      <Tp className="mt-2">Category</Tp>
      <Line className="mt-2" />
      {props.data.map((item, index) => (
        <Top
          key={item.id}
          className="mt-4"
          onClick={() => props.onMenuChange(index)}
        >
          {item.icon}
          <Info>{item.title}</Info>
        </Top>
      ))}

      <Top
        className="mt-4"
        onClick={() => {
          props.logout();
        }}
      >
        <LogoutIcon />
        <Info>Logout</Info>
      </Top>

      <Tp className="mt-4">TRANSACTIONS</Tp>
      <Line className="mt-2" />
      <Top className="mt-4">
        <ReceiptIcon />
        <Info>Loans</Info>
      </Top>
      <Top className="mt-4">
        <PaidIcon />
        <Info>Total Loan</Info>
      </Top>
      <Top className="mt-4">
        <LocalOfferIcon />
        <Info>Promotions</Info>
      </Top>
    </Container>
  );
};

export default connect(null, { logout })(SideMenu);
