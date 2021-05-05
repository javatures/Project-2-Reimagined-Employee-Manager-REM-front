import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Requests extends Component {
    render() {
        return (
            <div className="container">
                <h1>Requests Dashboard</h1>
                <Link to="/submitrequest" className="btn btn-primary m-2">Submit a Request</Link>
                <Link to="/requests" className="btn btn-primary m-2">See Pending Requests</Link>
                <Link to="/requests" className="btn btn-primary m-2">See Approved Requests</Link><br/>
                <Link to="/" className="btn btn-primary m-2">Back to Main</Link>
            </div>
        );
    }
}

export default Requests;