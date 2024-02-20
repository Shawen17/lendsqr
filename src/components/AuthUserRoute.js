import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

function AuthUserRoute({ isStaff, isAuthenticated, children }) {
  if (isAuthenticated && !isStaff) {
    return children;
  } else {
    return <Navigate to={{ pathname: "/" }} />;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isStaff: state.auth.isStaff,
});

export default connect(mapStateToProps, null)(AuthUserRoute);
