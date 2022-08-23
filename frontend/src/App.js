import './App.css';
import Container from '@mui/material/Container';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import AuthContext from './Context/AuthContext';
import { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import CreateAccount from './components/CreateAccount';
import Home from './pages/Home';
import axios from 'axios';
import Cookies from 'js-cookie';


function App() {
  const [user,setUser] = useState(null);
  useEffect(()=>{

    const getUser = async function(){
      
      axios.get('http://localhost:5000/api/users/auth/getUser',{
              withCredentials: true,
              crossDomain: true
              ,headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}}).then((res)=>{
                console.log(res.data.user)
                setUser(res.data.user)

              }).catch((err)=>{console.log(err.response.data.message);
              setUser(null)})
    }

    getUser();
      
  },[])
  // useEffect(()=>{
  //   if(JSON.parse(localStorage.getItem('user')))
  //   setUser(JSON.parse(localStorage.getItem('user')))
  //   console.log("updated localStorage");
  //   console.log(user);
  // },[]);
  // useEffect(()=>{
  //   localStorage.setItem('user',JSON.stringify(user));
  // },[user]);
  return (
    <AuthContext.Provider value={{user,setUser}}>
      <div className='main'>
      <div >
      <Routes>
          <Route path='/' element={<Home/>} />  
          <Route path="/login" element={ <Login />}/>
        
      </Routes>
        </div>
      </div>
    </AuthContext.Provider>

  );
}

export default App;
