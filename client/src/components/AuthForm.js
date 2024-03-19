import { useState } from "react";

const AuthForm = ({type, onSubmit}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ username, password});
        setUsername('');
        setPassword('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username" />
            <input 
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="Password" />
            <button type="submit">{type === 'login'? 'Login': 'Sign Up'}</button>
        </form>
    )
}
export default AuthForm;