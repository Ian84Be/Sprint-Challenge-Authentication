
import React, { Component } from 'react';
import axios from 'axios';
import withAuth from './withAuth.js';

class Jokes extends Component {
    state = { 
        jokes:[],
    }

    componentDidMount() {
        const endpoint = 'http://localhost:5000/api/jokes';
        axios.get(endpoint)
            .then(res => {
                this.setState({jokes: res.data});
                console.log(this.state.jokes);
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() { 
        return (
            <div className="joke--list">
                {this.state.jokes.map(joke => {
                    console.log(joke);
                    return (
                        <div key={joke.id} className="joke">
                        {joke.joke}
                        </div>
                    );
                })}
            </div>
        );
    }
}
 
export default withAuth(Jokes);