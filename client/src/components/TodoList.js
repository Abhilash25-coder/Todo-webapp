import TodoItem from "./TodoItem.js";
import './TodoList.css';
import axios from "axios";

const TodoList = ({ data, fetchData }) => {
    const token = sessionStorage.getItem('auth_token');

    const onComplete = async (id) => {
        try {
            const res = await axios.put(`http://localhost:5000/updateTodo/${id}`, {
                complete: true
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            fetchData();
        } catch (err) {
            console.log(err);
        }
    };
    const onDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/deleteTodo/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            fetchData();
        } catch (err) {
            console.log(err);
        }
    };

    if (data.length) {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                        <th>Todos</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(todo => (
                            <TodoItem key={todo._id}
                                todo={todo}
                                onDelete={onDelete}
                                onComplete={onComplete} />
                        ))}
                    </tbody>
                </table>
            </div>
        )
    } else {
        return(
            <div>
                <h2 style={{textAlign:'center',marginTop:'100px'}}>Add a todo!</h2>
            </div>
        )
    }
}
export default TodoList;