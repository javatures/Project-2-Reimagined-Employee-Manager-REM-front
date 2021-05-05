import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Requests extends Component {
    state = {
        employeeID : 0
    }

    componentDidMount() {
        const employeeID = localStorage.getItem("id");
        this.setState({
            employeeID : employeeID
        });
    }

    render() {
        let body = !this.state.employeeID ? (
            <div className="container">
                <h1>You must be signed in to view requests!</h1>
                <Link to="/signin" className="btn btn-primary">Sign in here</Link>
            </div>
        ) : (
            <div className="container">
                <h1>Requests Dashboard</h1>
                <Link to="/submitrequest" className="btn btn-primary m-2">Submit a Request</Link>
                <Link to="/requests" className="btn btn-primary m-2">See Pending Requests</Link>
                <Link to="/requests" className="btn btn-primary m-2">See Approved Requests</Link><br/>
                <Link to="/" className="btn btn-primary m-2">Back to Main</Link>
            </div>
        );
        return body;
    }
}

export default Requests;