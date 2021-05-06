import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Requests extends Component {
    state = {
        employeeID : 0,
        type : 0
    }

    componentDidMount() {
        const employeeID = localStorage.getItem("id");
        const type = localStorage.getItem("type");
        this.setState({
            employeeID : employeeID,
            type : type
        });
    }

    render() {
        let submit = this.state.type === '1' ? (
            <Link to="/submitrequest" className="btn btn-primary m-2">Submit a Request</Link>
        ) : '';

        let body = !this.state.employeeID ? (
            <div className="container">
                <h1>You must be signed in to view requests!</h1>
                <Link to="/signin" className="btn btn-primary">Sign in here</Link>
            </div>
        ) : (
            <div className="container">
                <h1>Requests Dashboard</h1>
                {submit}
                <Link to="/pendingrequests" className="btn btn-primary m-2">See Pending Requests</Link>
                <Link to="/approvedrequests" className="btn btn-primary m-2">See Approved Requests</Link><br/>
                <Link to="/" className="btn btn-primary m-2">Back to Main</Link>
            </div>
        );
        return body;
    }
}

export default Requests;