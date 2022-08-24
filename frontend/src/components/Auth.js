import { Box, Button, Divider, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
import { Navigate } from "react-router-dom";

const Auth = () => {
    const handleGoogleSignIn = async(e)=>{
        window.open("http://localhost:5000/api/users/auth/google","_self")
      }
      const handleGithubSignIn = async(e)=>{
        window.open("http://localhost:5000/api/users/auth/github","_self")
      }
  return (
    <div className='sign-up-components'>
      <Button variant="contained" sx={{mt:"0.5rem"}} onClick={handleGoogleSignIn}>
        <GoogleIcon/>
        Login with Google
      </Button>
      <Button variant="contained" sx={{mt:"0.5rem"}}  onClick={handleGithubSignIn}>
        <GitHubIcon />
        Login with Github
      </Button>
      <div>or</div>
      <Divider variant="inset"  component="li"  sx={{marginBottom:"0.5rem"}} />
      
      </div>
  )
}

export default Auth
