import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';


const LoginForm = ({ resetStore }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = e => {
        e.preventDefault();
        Meteor.loginWithPassword(username, password, error => {
            console.log(error)
            if (!error) resetStore();
        });

    }
    
    return (
        <form className="login-form" onSubmit={submit}>
            <label htmlFor="username"></label>
            <input 
                type="text"
                name="username"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                required
            />

            <label htmlFor="password"></label>
            <input 
                type="password"
                name="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            
            <button type="submit">Log In</button>
        </form>
    )
}

export default LoginForm;