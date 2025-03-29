import Todolist from './Components/TodoList.js';
import './App.css'
import {TodoContext} from './Context/TodoContext.js';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
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
  return (
    <div className="App" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',direction:"rtl" ,backgroundColor: '#000'}}>
      <TodoContext.Provider value={{ todos, setodoadd }}>
      <Todolist />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
