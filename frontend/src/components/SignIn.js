import { Alert, Box, Button, Divider, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
import { Navigate } from "react-router-dom";
import Auth from './Auth';

const SignIn = () => {
    const {user,setUser} = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState(null);
    const handleSubmit = async (e)=>{
        e.preventDefault();
            axios.post('http://localhost:5000/api/users/login',{
                email,
                password
            },{
              withCredentials: true,
              crossDomain: true
              ,headers: {'Access-Control-Allow-Origin': 'http://localhost:3000/', 'Content-Type': 'application/json'}}).then((res)=>{
                setUser(res.data.data.user)
                console.log(user);

              }).catch(error=>{
                if( error.response ){
                  console.log(error.response.data.message); // => the response payload 
                 setError(error.response.data.message)

               }})

     
    }


  return (
    <Box component="form" sx={{display: 'flex',flexDirection: 'column', gap:"8px", textAlign: 'center'}}
    onSubmit={handleSubmit}
    >
      <Auth/>


    
      <TextField label="email" variant="filled" required
        type="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)} />
      <TextField label="password" variant="filled"  type="password" required 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
    
      <Button variant="contained" sx={{mt:"1rem"}} type="submit">
        Sign In with Email
      </Button>
      {user && (<Navigate to="/" replace={true} />)}
      {error &&  <Alert severity="error">{error}</Alert>}

    </Box>
  )
}

export default SignIn;
