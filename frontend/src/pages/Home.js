import { Box, Button, Container, Grid } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import NavBar from '../components/NavBar'
import AuthContext from '../Context/AuthContext'
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
  
const Home = () => {

    const {user,setUser} = useContext(AuthContext);
    const [secret,setSecret] = useState("notset")
    const HandleSecret = async () =>{
    axios.get('http://localhost:5000/api/secret',{
             withCredentials:true
         }).then(res =>{
             setSecret(res.data.data);
             console.log(res.data);
             console.log("request is done",secret);
         }).catch(error=>{
          if( error.response ){
            console.log(error.response.data); // => the response payload 
         }})
        }
        
    
    const handleLogout = async () =>{
      axios.post('http://localhost:5000/api/users/logout',{},{
        withCredentials: true,
        crossDomain: true
        ,headers: {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Content-Type': 'application/json'}}).then(res =>{
         setSecret("Login to see secret");
         console.log(res);
         setUser(res.data.user)
     }).catch(error=>{
      if( error.response ){
        console.log(error.response.data); // => the response payload 
     }})
     
 }
    useEffect(() =>{
    
        console.log(secret);
    },[user]);
   {if(user){
      return (
        <div className='data'>
         <LockOpenIcon sx={{fontSize:"10rem"}}/>
         {
          user.photo?<Avatar alt="user-pic" src={user.photo} /> : <Avatar sx={{ bgcolor: deepOrange[500] }}>{user.firstName[0]}</Avatar>

         
         }
         <div>Email: {user?user.email:"NULL"}</div>
         <div>Name: {user?user.firstName:"NULL"}</div>
         <div>Secret: {secret?secret:""}</div>
         <Button variant="outlined" onClick={e=>HandleSecret(e)}> GET SECRET</Button>
         {/* <img src={user?user.photo:""}/> */}
         <Button variant="outlined" onClick={(e)=>{handleLogout(e)}}>SIGN OUT</Button>
       </div>
      )
  }else {
    return (
        <Grid height="100vh" maxWidth="l"  sx={{display: 'flex', flexDirection: 'column', justifyContent:"center",alignItems: 'center',}} >
        <LockIcon sx={{fontSize:"10rem"}}/>
        <h1>PLEASE LOGIN FIRST</h1>
       <Box sx={{width:"80%"}}>
       <NavLink to="/login" >
        <Button variant="outlined"  sx={{width:"100%",height:"8vh",fontSize:"1.5rem" ,textDecoration:"none"}}>LOGIN</Button>
        </NavLink>
       </Box>
        </Grid>
    )
  }

}}


export default Home
