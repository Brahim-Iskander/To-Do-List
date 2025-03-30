import Todolist from './Components/TodoList.js'; 
import './App.css'
import {TodoContext} from './Context/TodoContext.js';
import {ToastContext} from './Context/ToastContext.js';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import SnackBar from './Components/SnackBar.js';
const initialtodos = [
  {
    id: uuidv4(),
    title: 'Todo 1',
    details :"",
    completed: false,
  },
  {
    id: uuidv4(),
    title: 'Todo 2',
    details :"",
    completed: false,
  },
  {
    id: uuidv4(),
    title: 'Todo 3',
    details :"",
    completed: false,
  },
];

function App() {
  const [todos,setodoadd] = useState(initialtodos);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  function showhideToast(message){
    setOpen(true)
    setMessage(message)
    setTimeout(() => {
      setOpen(false)
    }, 2000);
  }
  return (
    <div className="App" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',direction:"rtl" ,backgroundColor: '#000'}}>
      <ToastContext.Provider value={{ showhideToast }}>
      <TodoContext.Provider value={{ todos, setodoadd }}>
      <SnackBar open={open} message={message} />
      <Todolist />
      </TodoContext.Provider>
      </ToastContext.Provider>
    </div>
  );
}

export default App;
