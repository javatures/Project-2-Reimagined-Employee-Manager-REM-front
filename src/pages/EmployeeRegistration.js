import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EmployeeRegistration extends Component {

    state = {
        employee: {
            employeeID: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            employeeTypeID: ''
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const tempEmployee = { ...this.state.employee };
        tempEmployee[name] = value;
        this.setState({
            employee: tempEmployee
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/createEmployeeAccount', this.state.employee)
            .then(response => {
                //nav to a thank you page
                console.log('employee added');
                console.log(this.state.employee);
                alert('Thank you for Registering');
                this.props.history.push('main');
            })
            .catch(error => {
                alert('Registration failed');
                //display error message
            })
    }



    render() {
        return (
            <div className="container">
                <h1>Employee Registration Form</h1>
                <div className="form-text">Fields marked with an asterisk(*) are required</div>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="firstName" className="form-label">First name* </label>
                        <input onChange={this.handleChange} value={this.state.employee.firstName} type="text" className="form-control" id="firstName" name="firstName" required />
                    </div>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="lastName" className="form-label">Last name* </label>
                        <input onChange={this.handleChange} value={this.state.employee.lastName} type="text" className="form-control" id="lastName" name="lastName" required />
                    </div>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="email" className="form-label">Email address* </label>
                        <input onChange={this.handleChange} value={this.state.employee.email} type="email" className="form-control" id="email" name="email" required />
                    </div>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="password" className="form-label">Password* </label>
                        <input onChange={this.handleChange} value={this.state.employee.password} type="password" className="form-control" id="password" name="password" pattern=".{8,}" aria-describedby="passHelp" required />
                        <div id="passHelp" className="form-text">Password must be a minimum of 8 characters</div>
                    </div>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="typeID" className="form-label">Employment Type* </label>
                        <input onChange={this.handleChange} value={this.state.employee.employeeTypeID} type="number" className="form-control" id="employeeTypeID" name="employeeTypeID" required />
                        <div className="form-text">1:employee/2:superviser</div>
                    </div>
                    <div className="mb-3 col-4">
                        <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                        <label className="form-check-label" htmlFor="invalidCheck">Agree to terms and conditions*</label>
                    </div>
                    <div className="mb-3 col-12">
                        <button className="btn btn-primary" type="submit">Submit form</button>
                    </div>
                </form>
                <Link to="/" className="btn btn-primary">Main</Link>
            </div>
        );
    }
}

export default EmployeeRegistration;