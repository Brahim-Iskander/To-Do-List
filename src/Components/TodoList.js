import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Todo from './Todo.js';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';
import {useState,useContext,useEffect} from 'react';
import {TodoContext} from '../Context/TodoContext';
import {ToastContext} from '../Context/ToastContext.js';

export default function TodoList() {
  const [inputtodo,setinputtodo] = useState("")
  const { todos, setodoadd } = useContext(TodoContext);
  const [buttonshowclicked, setbuttonshowclicked] = useState("all");
  const { showhideToast } = useContext(ToastContext);

  const todoComplited= todos.filter((t) => { return t.completed === true; });
  const todoNotYet= todos.filter((t) => { return t.completed === false; });
  let toddo = todos
  if(buttonshowclicked === "done"){
    toddo = todoComplited
  }
  else if(buttonshowclicked === "todoNotYet"){
    toddo = todoNotYet}
  else if(buttonshowclicked === "all"){
    toddo = todos
  }
    const todoList = toddo.map((t) => {
      return (
        <Todo
          key={t.id}
          todo={t}
        />
      );
    });
  function handleAddCLICK(){
    const addtodo = {
      id: uuidv4(),
      title: inputtodo,
      details: "",
      completed: false,
    };
    const newtodoss = [...todos, addtodo];
    setodoadd(newtodoss);
    localStorage.setItem("todos", JSON.stringify(newtodoss));
    setinputtodo("")
    showhideToast("Todo Added Successfully")
  }



  useEffect(() => {
    const updatt=JSON.parse(localStorage.getItem("todos"))??[];
    setodoadd(updatt)
   }, []);

    

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }} style={{maxHeight:"80vh",overflowY:"scroll"}}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 40 ,fontWeight: 'bold'}}>
          My-Todo-List
          <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
        </Typography>
        <div style={{marginBottom: '20px'}}>
          <Button variant="contained" color="success" onClick={()=>{setbuttonshowclicked("done")}} >
            Done
          </Button>
          <Button variant="contained" color="error" onClick={()=>{setbuttonshowclicked("todoNotYet")}}>
            Not Yet
          </Button>
          <Button variant="outlined" color="error" onClick={()=>{setbuttonshowclicked("all")}}>
            all
          </Button>
        </div>
        {todoList}
        <Grid container spacing={2}>
        <Grid  size={8}>
        <TextField fullWidth label="Add New Stack" id="fullWidth" value={inputtodo} onChange={(e)=>{setinputtodo(e.target.value)}} />
          </Grid>
          <Grid  size={4}>
          <Button style={inputtodo.length <= 0 ? { width:"100%",height:"100%", background:"gray"} : {width:"100%",height:"100%", background:"green"}} variant="contained" onClick={handleAddCLICK} disabled={inputtodo.length <= 0 ? true :false}>Add+</Button>
          </Grid>
          </Grid>
      </CardContent>
      </Card>
      </Container>
    </React.Fragment>
  );
}