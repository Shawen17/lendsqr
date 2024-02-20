import { Brand, BrandLogo, BrandName } from "../SideBar";
import { useNavigate } from "react-router-dom";
import NavMenu from "./NavMenu";
import styled from "styled-components";

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-items: space-between;
`;

const TopBar = () => {
  const navigate = useNavigate();

  const brandClick = () => {
    navigate("/");
  };

  return (
    <TopWrapper>
      <Brand
        onClick={() => {
          brandClick();
        }}
      >
        <BrandLogo>
          <img
            src="/static/icons/brandlogo.jpg"
            style={{ height: 50, width: 50 }}
            alt="brandlogo"
          />
        </BrandLogo>
        <BrandName>boomer</BrandName>
      </Brand>
      <NavMenu />
    </TopWrapper>
  );
};

export default TopBar;
