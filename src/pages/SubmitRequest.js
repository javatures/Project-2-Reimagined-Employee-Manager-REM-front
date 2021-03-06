import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class SubmitRequest extends Component {
    state = {
        request: {
            reason: '',
            amount: 0,
            submittedDate: '',
            employeeID: 0
        }
    }

    componentDidMount() {
        const employeeID = localStorage.getItem("id");
        const tempRequest = { ...this.state.request };
        tempRequest["employeeID"] = employeeID;
        this.setState({
            request: tempRequest
        })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const tempRequest = { ...this.state.request };
        tempRequest[name] = value;
        
        const date = new Date().toISOString();
        tempRequest["submittedDate"] = date;
        this.setState({
            request: tempRequest
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        console.log(this.state.request);
        axios.post("http://localhost:8080/createReimbursement", this.state.request)
        .then(response => {
            alert("Your request has been submitted");
            this.props.history.push("requests");
            window.location.reload();
        }).catch(error => {
            alert("There was an error processing your request");
            console.log(error);
        });
    }

    render() {
        let body = !(this.state.request.employeeID) ? (
            <div className="container">
                <h1>You must be signed in to submit a request!</h1>
                <Link to="/signin" className="btn btn-primary">Sign in here</Link>
            </div>
            ) : (
            <div className="container">
                <h1>Submit a request</h1>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="reason" className="form-label">Reason:</label>
                        <textarea onChange={this.handleChange} className="form-control" name="reason" id="reason" required/>
                    </div>
                    {/* Can use this later to upload image */}
                    {/* <div className="mb-3 col-md-4">
                        <label htmlFor="image" className="form-label">Image:</label>
                        <input type="file" accept="image/*" className="form-control" name="image" id="image" />
                    </div> */}
                    <div className="mb-3 col-md-4">
                        <label htmlFor="amount" className="form-label">Amount:</label>
                        <input onChange={this.handleChange} type="text" className="form-control" name="amount" id="amount" pattern="\d+(\.\d\d|)" aria-describedby="amountHelp" required/>
                        <div id="amountHelp" className="form-text">
                            Examples of valid amounts: 55, 6.37, 169.09
                        </div>
                    </div>
                    <div className="mb-3 col-md-4">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                <Link to="/requests" className="btn btn-primary">Back to Requests Dashboard</Link>
            </div>
        )
        return body;
    }
}

export default SubmitRequest;