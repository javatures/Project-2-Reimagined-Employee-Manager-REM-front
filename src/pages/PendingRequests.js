import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PendingRequests extends Component {
    state = {
        type: 0,
        requests: [],
        employees: [],
        reimbursement: {
            reimbursementID: '',
            approvalDate: ''
        }
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

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const tempReimbursement = { ...this.state.reimbursement };
        tempReimbursement[name] = value;
        
        const date = new Date().toISOString();
        tempReimbursement["approvalDate"] = date;
        this.setState({
            reimbursement: tempReimbursement
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.requests.find(request => request.reimbursementID.toString() === this.state.reimbursement.reimbursementID) === undefined) {
            alert("That is not a valid request ID.");
            return;
        }
        axios.post("http://localhost:8080/approveReimbursement", this.state.reimbursement)
        .then(response => {
            alert("The request has been approved.");
            this.props.history.push("pendingrequests");
            window.location.reload();
        }).catch(error => {
            alert("There was an error processing your request");
            console.log(error);
        });
    }

    render() {
        let list = this.state.type === '1' ? (
            this.state.requests.map(request => (
                !request.approved ?
                <li key={request.reimbursementID}>
                    <p>ID: {request.reimbursementID}</p>
                    <p>Description: {request.reason}</p>
                    <p>Amount: ${request.amount}</p>
                    <p>Submitted: {request.submittedDate}</p>
                </li>
                : ''
            ))
        ) : (
            this.state.requests.map(request => (
                !request.approved ?
                <li key={request.reimbursementID}>
                    <p>ID: {request.reimbursementID}</p>
                    <p>Submitted by: {this.state.employees.find(employee => employee.employeeID === request.employeeID).firstName} {this.state.employees.find(employee => employee.employeeID === request.employeeID).lastName}</p>
                    <p>Description: {request.reason}</p>
                    <p>Amount: ${request.amount}</p>
                    <p>Submitted: {request.submittedDate}</p>
                </li>
                : ''
            ))
        );

        let form = this.state.type === '1' ? '' : (
            <form onSubmit={this.handleSubmit}>
                <div className="col-5 bg-over">
                    <label htmlFor="reimbursementID" className="form-label">Enter the ID of the request to approve:</label>
                    <input type="number" className="form-control" name="reimbursementID" id="reimbursementID" value={this.state.reimbursement.reimbursementID} onChange={this.handleChange} />
                    <button type="submit" className="btn btn-primary">Approve</button>
                </div>
            </form>
        );

        return (
            <div className="container">
                <h1>Pending requests</h1>
                <ul>
                    {list}
                </ul>
                {form}
                <br/>
                <Link to="/requests" className="btn btn-primary">Back to Requests Dashboard</Link>
            </div>
        );
    }
}

export default PendingRequests;