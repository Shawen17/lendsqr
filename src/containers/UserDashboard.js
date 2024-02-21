import { useState } from "react";
import SideMenu from "../components/user/SideMenu";
import { Right, Left, UserContainer } from "../components/Styled";
import AccountUpdate from "../components/user/AccountUpdate";
import LoanForm from "../components/user/LoanForm";
import LoanHistory from "../components/user/LoanHistory";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import SettingsIcon from "@mui/icons-material/Settings";
import TopBar from "../components/user/TopBar";
import { connect } from "react-redux";
import { update_portfolio } from "../action/auth";

const UserDashboard = ({ user, update_portfolio }) => {
  const data = [
    {
      id: 1,
      icon: <CreditScoreIcon />,
      title: "Apply",
      comp: <LoanForm user={user} update_portfolio={update_portfolio} />,
    },
    {
      id: 2,
      icon: <WorkHistoryIcon />,
      title: "History",
      comp: <LoanHistory user={user} />,
    },
    {
      id: 3,
      icon: <SettingsIcon />,
      title: "Account",
      comp: <AccountUpdate />,
    },
  ];

  const [sliderdata, setSliderdata] = useState(data[0].comp);

  const onMenuChange = (index) => {
    const item = data[index].comp;
    setSliderdata(item);
  };

  return (
    <>
      <TopBar />
      <UserContainer>
        <Left>
          <SideMenu data={data} onMenuChange={onMenuChange} />
        </Left>
        <Right>{sliderdata}</Right>
      </UserContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.portfolio,
});

export default connect(mapStateToProps, { update_portfolio })(UserDashboard);
