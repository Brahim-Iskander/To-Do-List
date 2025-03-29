import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from 'react';
import {TodoContext} from '../Context/TodoContext.js';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState } from 'react';
import TextField from '@mui/material/TextField';





export default function Todo({todo}) {
  const { todos, setodoadd } = useContext(TodoContext);
  const [open, setOpen] = useState(false);
  const [openupadte, setOpenupdate] = useState(false);
  const [updateinputtodo,setupdateinputtodo] = useState({title:todo.title,details:todo.details})

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleupdateOpen = () => {
    setOpenupdate(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleupdateClose = () => {
    setOpenupdate(false);
  };
  const handleupdatClose = () => {
    setOpenupdate(false);
  };
  function hadlechange(){
    const newtodos = todos.map((t) => {
          if(t.id === todo.id) {
            t.completed = !t.completed;
          }
          return t;})
          setodoadd(newtodos)
          localStorage.setItem("todos", JSON.stringify(newtodos));

  }
  function handledeletconfirm(){
    const newtodos = todos.filter((t) => t.id !== todo.id);
    setodoadd(newtodos)
    localStorage.setItem("todos", JSON.stringify(newtodos)) ;

    handleClose()
  }
  function handleupdateconfirm(){
    const newtodosd = todos.map((t) => {
      if(t.id === todo.id) {
        return {...t,title:updateinputtodo.title,details:updateinputtodo.details}
      }
      return t;});
      setodoadd(newtodosd)
      localStorage.setItem("todos", JSON.stringify(newtodosd));

    handleupdatClose()
  }
  function handleinputtitleupdated(e){
    setupdateinputtodo({...updateinputtodo,title:e.target.value})
  }
  function handleinputdetailsupdated(e){
    setupdateinputtodo({...updateinputtodo,details:e.target.value})
  }

  return (
    <>
    <Dialog
        onClose={handleClose}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will not be able to recover it any more
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handledeletconfirm} autoFocus>
            Yes, delete it
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        onClose={handleupdatClose}
        open={openupadte}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"update task"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will not be able to recover it any more
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Nom task"
            fullWidth
            variant="standard"
            value={updateinputtodo.title}
            onChange={handleinputtitleupdated}
          />
          <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="feature task"
          fullWidth
          variant="standard"
          value={updateinputtodo.details}
          onChange={handleinputdetailsupdated}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleupdateClose} >Close</Button>
          <Button onClick={handleupdateconfirm} autoFocus>
            confirm
          </Button>
        </DialogActions>
      </Dialog>
   
    <Card className='cardtodo' sx={{ minWidth: 275 ,background:"#283593", color:"white",marginBottom:"20px"}}>
      <CardContent>
      <Grid container >
        <Grid  size={8}>
        <Typography variant="h5" sx={{ textAlign:"right" ,fontWeight: 'bold', textDecoration: todo.completed ? "line-through":"none"}} component="div">
         {todo.title}
        </Typography>
        <Typography variant="h6" sx={{ textAlign:"right" ,}} component="div">
        {todo.details}
        </Typography>
        </Grid>
        <Grid size={4} display= 'flex' justifyContent= 'space-between' alignItems= 'center'>
        <IconButton onClick={()=>{hadlechange()}}  className={"iconbutton"} aria-label="delete" style={{border:"3px solid #8bc34a", color:todo.completed?"white":"#8bc34a",background: todo.completed? "#8bc34a" :"white"}}>
        <CheckIcon />
        </IconButton>
        <IconButton onClick={handleupdateOpen} className={"iconbutton"} aria-label="delete" style={{border:"3px solid #1769aa", color:"#1769aa",background:"white"}}>
        <EditIcon />
        </IconButton>
        <IconButton className={"iconbutton"} aria-label="delete" style={{border:"3px solid red", color:"red",background:"white"}}>
        <DeleteIcon onClick={handleClickOpen} />
        </IconButton>
        </Grid>
      </Grid>
      </CardContent>
    </Card>
    </>
    
  );
}