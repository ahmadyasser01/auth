import { AppBar, Toolbar, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'

const Navbar2 = () => {
  return (
    <div>
      <AppBar className=".MuiAppBar-colorTransparent" position="static" >
        <Container>
            <Toolbar disableGutters >
                icon
                <Typography sx ={{ml:"2rem"}}>
                    NAME
                </Typography>
            </Toolbar>
        </Container>
    </AppBar>
    </div>
  )
}

export default Navbar2
