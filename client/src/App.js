import TodoList from './components/TodoList.js';
import AddTodoForm from './components/AddTodoForm.js';
import SignUpForm from './pages/Signup.js';
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import Home from './pages/Home.js';
import { useEffect, useState } from 'react';
import Login from './pages/Login.js';
import LogoutPage from './pages/Logout.js';
import { UserProvider } from './context/UserContext.js';

function App() {
  
  // State for holding all todos
  const [ticket, setToken] = useState('');

  useEffect(()=>{
    const getToken = sessionStorage.getItem("auth_token")
    setToken(getToken);
  },[])

  // const handleAddTodo = (text) => {
  //   const newTodo = { id: todos.length + 1, text, completed: false };
  //   setTodos([...todos, newTodo]);
  // };

  // const handleDeleteTodo = (id) => {
  //   setTodos(todos.filter((todo) => todo.id !== id));
  // };

  // const handleCompleteTodo = (id) => {
  //   setTodos(todos.map(todo => {
  //     if (todo.id === id) {
  //       return { ...todo, completed: !todo.completed }
  //     }
  //     return todo;
  //   }));
  // };

  const handleToken = (token) => {
    sessionStorage.setItem('auth_token', token);
    setToken(token);
  }

  return (
    <UserProvider>
    <Router>
      <Routes>
        
        <Route exact path="/" element={ticket ? <Navigate to="/home"/> : <Login handleToken={handleToken}/>}/>
        
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/home" element={ticket ? <Home /> : <Navigate to="/" />} />
        <Route path='/logout' element={<LogoutPage/>}/>
        
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
