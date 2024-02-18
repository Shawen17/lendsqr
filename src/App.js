import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./containers/Login";
import Dashbaord from "./containers/Dashboard";
import UserDetails from "./containers/UserDetails";
import AddUserForm from "./containers/AddUserForm";
import UpdateUserForm from "./containers/UpdateUserForm";
import Signup from "./containers/Signup";
import { Provider } from "react-redux";
import store from "./store";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/reset-password" exact element={<ResetPassword />} />
          <Route
            path="/password/reset/confirm/:uid/:token"
            exact
            element={<ResetPasswordConfirm />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashbaord />
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
