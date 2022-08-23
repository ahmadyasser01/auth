import { Box, Button, Divider, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
import { Navigate } from "react-router-dom";

const SignIn = () => {
    const {user,setUser} = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleGoogleSignIn = async(e)=>{
      window.open("http://localhost:5000/api/users/auth/google","_self")
    }
    const handleGithubSignIn = async(e)=>{
      window.open("http://localhost:5000/api/users/auth/github","_self")
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
            axios.post('http://localhost:5000/api/users/login',{
                email,
                password
            },{
              withCredentials: true,
              crossDomain: true
              ,headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}}).then((res)=>{
                setUser(res.data.data.user)
                console.log(user);

              }).catch((err)=>{
                console.log(err);
              })
          

     
    }


  return (
    <Box component="form" sx={{display: 'flex',flexDirection: 'column', gap:"8px", textAlign: 'center'}}
    onSubmit={handleSubmit}
    >
      <Button variant="contained" sx={{mt:"0.5rem"}} onClick={handleGoogleSignIn}>
        <GoogleIcon/>
        Login with Google
      </Button>
      <Button variant="contained" sx={{mt:"0.5rem"}}  onClick={handleGithubSignIn}>
        <GitHubIcon />
        Login with Github
      </Button>
      or
      <Divider variant="inset" component="li" />



    
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

    </Box>
  )
}

export default SignIn;
