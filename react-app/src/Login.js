
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    state = { 
        username: '',
        password: '',
    };

    render() {
        if (localStorage.getItem('token')) {
            return <Redirect to="/jokes" />
        } 
        return ( 
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="username">username</label>
                <input type="text"
                    name="username"
                    onChange={this.handleInputChange}
                    value={this.state.username}
                />
                <label htmlFor="password">password</label>
                <input type="password"
                    name="password"
                    onChange={this.handleInputChange}
                    value={this.state.password}
                />
                <button type="submit">Login</button>
            </form>
        );
    }
    
    handleInputChange = e => {
        e.preventDefault();
        const {name, value} = e.target;
        this.setState({[name]:value});
    }

    handleSubmit = e => {
        e.preventDefault();

        const endpoint = 'http://localhost:5000/api/login';
        axios.post(endpoint, this.state)
            .then(res => {
                console.log(res.data.message);
                localStorage.setItem('token',res.data.token);
            })
            .catch(err => {
                console.log(err);
            });
    }
}
 
export default Login;
