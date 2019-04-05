
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class SignUp extends Component {
    state = { 
        username: '',
        password: '',
        success: false,
    };

    render() { 
        if (this.state.success) {
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

                <button type="submit">SignUp</button>
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

        const newUser = {
            username: this.state.username,
            password: this.state.password,
            department: this.state.department,
        }

        const endpoint = 'http://localhost:5000/api/register';
        axios.post(endpoint, newUser)
            .then(res => {
                console.log(res.data.message);
                localStorage.setItem('token',res.data.token);
            })
            .then(() => {
                this.setState({success:true});
            })
            .catch(err => {
                console.log(err);
            });
    }
}
 
export default SignUp;
