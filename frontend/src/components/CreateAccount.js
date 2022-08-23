import { Box, Button, ButtonGroup, Divider, Grid, TextField } from '@mui/material'
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
        }
        else {
            
        }
    }

    // useEffect(() => {
    //     console.log(firstName);
    // },[firstName])
  return (
    <Grid className="signup-form" component="form" sx={{ height:"100%", width:"100%",display: 'flex',flexDirection: 'column', gap:{xs:"1px"}, textAlign: 'center',textAlign: 'center'}}
    onSubmit={handleSubmit}
    >
      <div className="signup-buttons">
      <Button variant="contained" sx={{height: {xs:"50px"} ,width:{xs:"50%"} ,fontSize:{xs:"1px"}}}  >
        <GoogleIcon/>
        <span>Google</span>
      </Button>
      <Button variant="contained" sx={{height: {xs:"50px"} ,width:{xs:"50%"} ,fontSize:{xs:"1px"}}} size="small" minWidth="auto" >
        <GitHubIcon />
        <span>Github</span>
      </Button>
      </div>

     <div className="signup-fields">
      <span>or
      <Divider variant="inset" sx={{width:"100%"}} component="li" />
      </span>
     
     <TextField 
        label="First Name"
       variant="filled"
       value={firstName}
       onChange={(e)=>setFirstName(e.target.value)}
       required
       size="small"
        />

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
      

     </div>
     <Button variant="contained" type="submit">
        Sign up with Email
      </Button>
    </Grid>
  )
}

export default CreateAccount
