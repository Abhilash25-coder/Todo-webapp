import React, {useContext} from 'react';
import { useEffect, useState } from "react";
import './Home.css';
import Navbar from './Navbar';
import AddTodoForm from '../components/AddTodoForm'
import TodoList from '../components/TodoList';
import axios from 'axios';
function Home() {
  const token = sessionStorage.getItem('auth_token');
  const [data, setData] = useState([]);

    useEffect(()=>{
        fetchData();
    },[]);   

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getTodo',{
                headers: {
                    Authorization: `Bearer ${token}`,
                    
                }
            }).then((res)=>{
                setData(res.data);
            });
            
            
        } catch(err){
            console.log("Error: ", err)
        }
      }
    
  return (
        
        <div>
          <Navbar/>
          <AddTodoForm fetchData={fetchData}/>
          <TodoList  data={data}
          fetchData={fetchData} />
          
        </div>
    
  )
  
}
export default Home;