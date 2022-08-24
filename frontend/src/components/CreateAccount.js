import { Box, Button, ButtonGroup, Divider, Grid, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import Auth from './Auth';
import AuthContext from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';
const CreateAccount = () => {
  const {user,setUser} = useContext(AuthContext)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');

   
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log("test");
        if(password === confirmPassword){
          axios.post('http://localhost:5000/api/users/signup',{
            firstName,
            lastName,
            userName,
            email,
            password
        },{ withCredentials: true,
        crossDomain: true
        ,headers: {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Content-Type': 'application/json'}}).then(res =>{
         console.log(res,"ressss");
         setUser(res.data.data.user)
     }).catch(err =>{console.log(err,"errs");})
            // const res = await axios.post('http://localhost:5000/api/users/signup',{
            //     firstName,
            //     lastName,
            //     userName,
            //     email,
            //     password
            // },{
            //   withCredentials: true,
            //   crossDomain: true
            //   ,headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}})
        }
        else {
            
        }
    }


  return (
    <Grid className="signup-form" component="form" sx={{ height:"100%", width:"100%",display: 'flex',flexDirection: 'column', gap:{xs:"1px"}, textAlign: 'center',textAlign: 'center'}}
    onSubmit={handleSubmit}
    >
      <div className="signup-buttons">
      <Auth/>
      </div>

     <div className="signup-fields">

     
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
      {user && (<Navigate to="/" replace={true} />)}

    </Grid>
  )
}

export default CreateAccount
