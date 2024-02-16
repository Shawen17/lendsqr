import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./containers/Login";
import Dashbaord from "./containers/Dashboard";
import UserDetails from "./containers/UserDetails";
import AddUserForm from "./containers/AddUserForm";
import UpdateUserForm from "./containers/UpdateUserForm";




function App() {
  

  return (
   
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/dashboard" exact element={<Dashbaord />} />
        <Route path="/user-details" exact element={<UserDetails />} />
        <Route path="/add-profile" exact element={<AddUserForm />} />
        <Route path="/update-profile" exact element={<UpdateUserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
