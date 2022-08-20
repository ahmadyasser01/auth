import { Box, Button, Divider, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import axios from 'axios';
const CreateAccount = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');

    const handleSubmit = async (e)=>{
        e.preventDefault();
        axios.defaults.withCredentials = true
        if(password === confirmPassword){
            const res = await axios.post('http://localhost:5000/api/users/signup',{
                firstName,
                lastName,
                userName,
                email,
                password
            },{
              withCredentials: true,
              crossDomain: true
              ,headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}})
            console.log(res.data);
            console.log(res.cookie);
        }
        else {
            
        }
    }

    // useEffect(() => {
    //     console.log(firstName);
    // },[firstName])
  return (
    <Box component="form" sx={{display: 'flex',flexDirection: 'column', gap:"8px", textAlign: 'center'}}
    onSubmit={handleSubmit}
    >
      <Button variant="contained" sx={{mt:"0.5rem"}}>
        <GoogleIcon/>
        Sign up with Google
      </Button>
      <Button variant="contained" sx={{mt:"0.5rem"}}>
        <GitHubIcon />
        Sign up with Github
      </Button>
      or
      <Divider variant="inset" component="li" />

      <TextField 
        label="First Name"
       variant="filled"
       value={firstName}
       onChange={(e)=>setFirstName(e.target.value)}
       required />

      <TextField label="Last Name" variant="filled" required
       value={lastName}
       onChange={(e)=>setLastName(e.target.value)} />

      <TextField label="user name" variant="filled" required
       value={userName}
       onChange={(e)=>setUserName(e.target.value)}
       />
      <TextField label="email" variant="filled" required
        type="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)} />
      <TextField label="password" variant="filled"  type="password" required 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <TextField label="confirm password" variant="filled"  type="password" required 
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
      />
      <Button variant="contained" sx={{mt:"1rem"}} type="submit">
        Sign up with Email
      </Button>

    </Box>
  )
}

export default CreateAccount
