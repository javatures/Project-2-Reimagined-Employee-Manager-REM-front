import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="container">
                <h1>Home Page</h1>
                <p>skeletal settup for the home page</p>
                <Link to="/registration" className="btn btn-primary">Register</Link>
            </div>
        );
    }
}

export default Home;