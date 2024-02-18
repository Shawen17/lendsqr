import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

function AuthUserRoute({ isAuthenticated, children }) {
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to={{ pathname: "/" }} />;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(AuthUserRoute);
