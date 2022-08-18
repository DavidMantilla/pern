import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar(){
    const navigate= useNavigate();
return (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" color="transparent">
      <Container>
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}  variant='h6'>
            <Link to="/" style={{textDecoration:"none" , color:"#eee"}}> Tareas</Link>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/task/new")}
          >
            
            nueva tarea
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  </Box>
);

}