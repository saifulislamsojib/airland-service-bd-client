import React, { useState } from 'react';
import useForm from '../hooks/useForm';

const Login = () => {

    const [newUser, setNewUser] = useState(false);

    const required = newUser?['name', 'email', 'password', 'confirmPassword']:['email', 'password'];

    const { error, handleInput, handleSubmit } = useForm(required);

    const submit = data => {
        console.log(data)
    }

    return (
        <div className='login-container'>
            <h1>Login</h1>
            <button className="primary-btn">google Login</button>
            <form onSubmit={handleSubmit(submit)}>
                {newUser&&<>
                    <input onChange={handleInput} type="text" name="name" placeholder="Name" />
                    {error.name && <span className="error">Name is required</span>}
                </>}
                <input onChange={handleInput} type="email" name="email" placeholder="Email" />
                {error.email && <span className="error">Valid Email is required</span>}
                <input onChange={handleInput} type="password" name="password" placeholder="Password" />
                {error.password && <span className="error">password is required Minimum 6 characters</span>}
                {newUser&&<>
                    <input onChange={handleInput} type="password" name="confirmPassword" placeholder="Confirm Password" />
                    {error.confirmPassword && <span className="error">Confirm Password is required Minimum 6 characters or Not Matched</span>}
                </>}
                <input onChange={() => setNewUser(preValue=> !preValue)}type="checkbox" />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
};

export default Login;