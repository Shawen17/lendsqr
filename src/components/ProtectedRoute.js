import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

function ProtectedRoute({ isStaff, children }) {
  if (isStaff) {
    return children;
  } else {
    return <Navigate to={{ pathname: "/" }} />;
  }
}

const mapStateToProps = (state) => ({
  isStaff: state.auth.isStaff,
});

export default connect(mapStateToProps, null)(ProtectedRoute);
