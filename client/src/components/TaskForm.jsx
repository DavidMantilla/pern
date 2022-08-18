import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material'

import {React,useEffect,useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom';

export default function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
 const params = useParams({});
  const [loading, setLoading] = useState(false);
  const[editar,setEdition]= useState(false);

  const navigate= useNavigate()
  const handleSubmit=async (e)=>{
    e.preventDefault();
    setLoading(true);

    if(editar)
    { 
      const response=await fetch("http://localhost:4000/tasks/"+params.id, {
         method: "PUT",
         body: JSON.stringify(task),
         headers: { "Content-type": "application/json" },
          });
      const data=response.json();
      

    }
    else{

       await fetch("http://localhost:4000/tasks/",{
        method:"POST",
        body:JSON.stringify(task),
        headers:{'Content-type':'application/json'},
      });
      
    }
    setLoading(false);
    navigate('/');

  }
  useEffect(()=>{
    if(params.id){
      LoadTask(params.id);
    }
  },[params.id]);

  const LoadTask = async (id) => {
    const res= await fetch(`http://localhost:4000/tasks/${id}`); 
    const data= await res.json();
    
    setTask({
      title: data[0].title,
      description: data[0].description,
    });

     setEdition(true);
  };
  const handleChange=(e)=>{
    setTask({ ...task, [e.target.name]: e.target.value });


  }
  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            background: "#1e272e",
            padding: "1rem",
          }}
        >
          <Typography variant="5" textAlign="center" color="white">
            Create task
          </Typography>
          <CardContent>
            <form action="" onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="titulo"
                name="title"
                sx={{
                  display: "block",
                  margin: "0.5rem 0",
                  background: "#28343D",
                }}
                inputProps={{
                  style: { color: "white" },
                }}
                InputLabelProps={{
                  style: { color: "white" },
                }}
                onChange={handleChange}
                value={task.title}
              ></TextField>

              <TextField
                variant="filled"
                label="description"
                multiline
                name="description"
                rows={4}
                onChange={handleChange}
                sx={{
                  display: "block",
                  margin: "0.5rem 0",
                  background: "#28343D",
                }}
                inputProps={{
                  style: { color: "white" },
                }}
                InputLabelProps={{
                  style: { color: "white" },
                }}
                value={task.description}
              ></TextField>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!task.title || !task.description}
              >
                {loading ? (
                  <CircularProgress
                    color="inherit"
                    size={24}
                  ></CircularProgress>
                ) : (
                  "guardar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
