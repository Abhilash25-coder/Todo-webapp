
const TodoItem = ({ todo, onDelete, onComplete}) => {
    return (
        
            <tr>
                <td>{todo.text}</td>
                <td><button onClick={()=> onDelete(todo._id)}>Delete</button>
                
                <button style={{display: todo.complete === true ? 'none':''}} onClick={()=> onComplete(todo._id)}>Mark as Complete</button>
                <button style={{display: todo.complete === false ? 'none':'',backgroundColor:'grey'}} onClick={()=> onComplete(todo._id)}>Completed</button>
                </td>
                <td></td>
            </tr>           
            
        
    )
}
export default TodoItem;