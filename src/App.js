import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import UserDetails from "./containers/UserDetails";
import AddUserForm from "./containers/AddUserForm";
import UpdateUserForm from "./containers/UpdateUserForm";
import Signup from "./containers/Signup";
import { Provider } from "react-redux";
import store from "./store";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import UserDashboard from "./containers/UserDashboard";
import ProfileForm from "./components/user/ProfileForm";
import AuthUserRoute from "./components/AuthUserRoute";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/reset-password" exact element={<ResetPassword />} />
          <Route path="/profile-form" exact element={<ProfileForm />} />

          <Route
            path="/password/reset/confirm/:uid/:token"
            exact
            element={<ResetPasswordConfirm />}
          />
          <Route
            path="/user-dashboard"
            element={
              <AuthUserRoute>
                <UserDashboard />
              </AuthUserRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-details"
            element={
              <ProtectedRoute>
                <UserDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-profile"
            element={
              <ProtectedRoute>
                <AddUserForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-profile"
            element={
              <ProtectedRoute>
                <UpdateUserForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
