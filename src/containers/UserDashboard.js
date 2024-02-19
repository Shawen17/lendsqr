import SideMenu from "../components/user/SideMenu";
import { Right, Left, UserContainer } from "../components/Styled";

const UserDashboard = () => {
  return (
    <UserContainer>
      <Left>
        <SideMenu />
      </Left>
      <Right></Right>
    </UserContainer>
  );
};

export default UserDashboard;
