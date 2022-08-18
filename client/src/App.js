import {BrowserRouter,Routes,Route} from 'react-router-dom'
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import {Container} from "@mui/material";
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Container>
      <Routes>
        <Route path="/" element={<TaskList />}></Route>
        <Route path="/task/new" element={<TaskForm />}></Route>
        <Route path='/task/:id/edit' element={<TaskForm />}></Route>
      </Routes>
    </Container>
    </BrowserRouter>
  );
}

export default App;
