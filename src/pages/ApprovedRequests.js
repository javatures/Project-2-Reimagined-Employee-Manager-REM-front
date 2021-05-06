import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PendingRequests extends Component {
    state = {
        requests: []
    }

    componentDidMount() {
        const employeeID = localStorage.getItem("id");
        axios.get("http://localhost:8080/listReimbursementsByEmployee", {
            params: {
                employeeID: employeeID
            }
        }).then(response => {
            this.setState({
                requests: response.data
            })
            console.log(this.state.requests)
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="container">
                <h1>Your pending requests</h1>
                <ul>
                    {this.state.requests.map(request => (
                        request.approved ?
                        <li>
                            <p>Description: {request.description}</p>
                            <p>Amount: ${request.amount}</p>
                            <p>Submitted: {request.submittedDate}</p>
                        </li>
                        : ''
                    ))}
                </ul>
                <Link to="/requests" className="btn btn-primary">Back to Requests Dashboard</Link>
            </div>
        );
    }
}

export default PendingRequests;