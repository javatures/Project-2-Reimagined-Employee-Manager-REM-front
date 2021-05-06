import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ApprovedRequests extends Component {
    state = {
        type: 0,
        requests: [],
        employees: [],
    }

    componentDidMount() {
        const employeeID = localStorage.getItem("id");
        const type = localStorage.getItem("type");
        if (type === '2') {
            axios.get("http://localhost:8080/listEmployeesByManager", {
                params: {
                    employeeID: employeeID
                }
            }).then(response => {
                this.setState({
                    type: type,
                    employees: response.data
                })
                response.data.forEach(employee => {
                    axios.get("http://localhost:8080/listReimbursementsByEmployee", {
                        params: {
                            employeeID: employee.employeeID
                        }
                    }).then(response => {
                        response.data.forEach(request => {
                            let array = this.state.requests;
                            array.push(request);
                            this.setState({
                                requests: array
                            })
                        })
                    }).catch(error => {
                        console.log(error);
                    })
                });
            }).catch(error => {
                console.log(error);
            })
        }
        else if (type === '3') {
            axios.get("http://localhost:8080/listReimbursement", {})
            .then(response => {
                this.setState({
                    type: type,
                    requests: response.data
                })
                console.log(this.state.requests)
            }).catch(error => {
                console.log(error);
            })
        }
        else {
            axios.get("http://localhost:8080/listReimbursementsByEmployee", {
                params: {
                    employeeID: employeeID
                }
            }).then(response => {
                this.setState({
                    type: type,
                    requests: response.data
                })
                console.log(this.state.requests)
            }).catch(error => {
                console.log(error);
            })
        }
    }

    render() {
        let list = this.state.type === '1' ? (
            this.state.requests.map(request => (
                request.approved ?
                <li key={request.reimbursementID}>
                    <p>ID: {request.reimbursementID}</p>
                    <p>Description: {request.reason}</p>
                    <p>Amount: ${request.amount}</p>
                    <p>Submitted: {request.submittedDate}</p>
                    <p>Approved: {request.approvalDate}</p>
                </li>
                : ''
            ))
        ) : (
            this.state.requests.map(request => (
                request.approved ?
                <li key={request.reimbursementID}>
                    <p>ID: {request.reimbursementID}</p>
                    <p>Submitted by: {this.state.employees.find(employee => employee.employeeID === request.employeeID).firstName} {this.state.employees.find(employee => employee.employeeID === request.employeeID).lastName}</p>
                    <p>Description: {request.reason}</p>
                    <p>Amount: ${request.amount}</p>
                    <p>Submitted: {request.submittedDate}</p>
                    <p>Approved: {request.approvalDate}</p>
                </li>
                : ''
            ))
        );

        return (
            <div className="container">
                <h1>Approved requests</h1>
                <ul>
                    {list}
                </ul>
                <br/>
                <Link to="/requests" className="btn btn-primary">Back to Requests Dashboard</Link>
            </div>
        );
    }
}

export default ApprovedRequests;