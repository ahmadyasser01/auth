import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'

const NavBar = () => {
  return (
    <AppBar position="static">
        <Container >
            <Toolbar disableGutters>
                icon
                <Typography>
                    POMODO
                </Typography>
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default NavBar
