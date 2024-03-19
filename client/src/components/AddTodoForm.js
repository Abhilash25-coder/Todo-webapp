import { useState } from "react";
import axios from 'axios';
import './AddTodo.css';
const AddTodoForm = ({fetchData}) => {
    const token = sessionStorage.getItem('auth_token');
    const [text, setText] = useState('');
    
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!text.trim()) return;
    
            const response = await axios.post('http://localhost:5000/addTodo', {text,complete:false}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        
            // Handle response
            setText('');
            fetchData();
        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
        
    };

    return (
        <div className="div">
            <form className="add-todo" onSubmit={handleSubmit}>
                <h2>Add  Todo</h2>
            <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)} 
            placeholder="Add  todo..." />
            <button type="submit">Save</button> 
        </form>
        </div>
    );
}
export default AddTodoForm;