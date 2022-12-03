
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './containers/Login';
import Dashbaord from './containers/Dashboard';
import UserDetails from './containers/UserDetails';
import {useEffect} from 'react';
import axios from 'axios';



function App() {
  useEffect(()=>{
        
    const config ={
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        }
    };
    axios.get('https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users', config).then(res=>localStorage.setItem('data',JSON.stringify(res.data)));
    
  },[])
    const data= JSON.parse(localStorage.getItem('data'))
    const statusOptions = ['Inactive','Blacklisted','Pending','Active','Others']
    const maritalStatus = ['Single','Married','Divorced']
    const children = ['None','Yes']
    const typeofResidence= ["Parent's house",'Own Apartment']
    const relationship =['Sister','Brother','Mother','Father','Colleague']

    const getRandomItem=(arr)=>{
        const randomIndex = Math.floor(Math.random()*arr.length)
        const item = arr[randomIndex]
        return item
    }

    var updatedData = JSON.parse(localStorage.getItem('data')).map((user)=>{
        if('status' in data){
            return {...user }
        }else{
            return {...user, status:getRandomItem(statusOptions), maritalStatus:getRandomItem(maritalStatus),
                children:getRandomItem(children), typeofResidence:getRandomItem(typeofResidence),  guarantorRelationship:getRandomItem(relationship) }
        }
    })

    localStorage.setItem('data',JSON.stringify(updatedData))

  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" exact element={ <Login />} />
        <Route  path="/dashboard" exact element={ <Dashbaord />} />
        <Route  path='/user-details' exact element={ <UserDetails />} />
        
      </Routes>

    </BrowserRouter>
  );
}

export default App;
