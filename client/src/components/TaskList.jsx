import { backdropClasses, Button, Card, CardContent, Typography } from "@mui/material";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const loadtasks =async ()=> { 
   const rsponse= await fetch("http://localhost:4000/tasks");
   const data= await rsponse.json();
   setTasks(data)
  }
  const handleDelete= async(id)=>{

   const res= await fetch( `http://localhost:4000/tasks/${id}` ,{
      method: 'DELETE',
    });
    
    
    setTasks(tasks.filter(task=>task.id !==id));
  }
  const navigate= useNavigate();
  useEffect(()=>{loadtasks()},[]);
  return (
    <>
      <h1>lista de tareas</h1>
      {tasks.map((task) => (
        <Card style={{margin:".7rem", background : "#1e272e"}} key={task.id}>
          <CardContent style={{display:"flex",justifyContent: "space-between"}}>
            <div style={{ color: "#fff" }}>
              <Typography >{task.title}</Typography>
            <Typography>{task.description}</Typography> 
            </div>
              <div>
                 <Button variant="contained" color="inherit" onClick={() =>navigate(`/task/${task.id}/edit`)}> Editar </Button>
                 <Button variant="contained" color="warning" onClick={() => handleDelete(task.id)}  style={{ marginLeft:".5rem"}}> Eliminar </Button>
              </div>
          
          </CardContent>
        </Card>
      ))}
    </>
  );
}
