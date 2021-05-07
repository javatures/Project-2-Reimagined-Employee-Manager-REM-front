import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EmployeeProfile extends Component {

    state = {
        employee: {}
    }

    signOut = () => {
        localStorage.clear();
        this.props.history.push("/main");
    }

    componentDidMount() {
        const employeeID = localStorage.getItem("id");
        const params = {employeeID}
        axios.get('http://localhost:8080/findEmployee', {params} )
        .then(response => {
            this.setState({
                employee: response.data
            });
        })
        .catch(error => {
            // display error message
        })
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

    updateProfile = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/updateEmployee', this.state.employee)
        .then(response => {
            //nav to a thank you page
            localStorage.setItem("firstName", this.state.employee.firstName)
            localStorage.setItem("lastName", this.state.employee.lastName)
            alert('Update Successful');
            window.location.reload();
        })
        .catch(error => {
            alert('Registration failed');
            //display error message
        })
    }

    renderUpdateForm = () => {
        return <div className="mt-3">
            <div className="form-text">Fields marked with an asterisk(*) are required.</div>
            <div className="form-text">If you don't want to update a field, leave it as is.</div>
            <form onSubmit={this.updateProfile}>
                <div className="mb-3 col-md-4">
                    <label htmlFor="firstName" className="form-label">First name* </label>
                    <input onChange={this.handleChange} value={this.state.employee.firstName} type="text" className="form-control" id="firstName" name="firstName" required/>
                </div>
                <div className="mb-3 col-md-4">
                    <label htmlFor="lastName" className="form-label">Last name* </label>
                    <input onChange={this.handleChange} value={this.state.employee.lastName} type="text" className="form-control" id="lastName" name="lastName" required/>
                </div>
                <div className="mb-3 col-md-4">
                    <label htmlFor="email" className="form-label">Email address* </label>
                    <input onChange={this.handleChange} value={this.state.employee.email} type="email" className="form-control" id="email" name="email" required/>
                </div>
                <div className="mb-3 col-md-4">
                    <label htmlFor="password" className="form-label">Password* </label>
                    <input onChange={this.handleChange} value={this.state.employee.password} type="password" className="form-control" id="password" name="password" pattern=".{8,}" aria-describedby="passHelp" required/>
                    <div id="passHelp" className="form-text">Password must be a minimum of 8 characters.</div>
                </div>
                <div className="mb-3 col-md-4">
                    <button className="btn btn-primary" type="submit">Update</button>
                </div>
            </form>
        </div>
    }

    render() {

        let buttonSignin = (
            <Link to="/signin" className="btn btn-primary ms-3">Signin</Link>
        )

        let mainUpdate = (
            <Link to="/" className="btn btn-primary">Main</Link>
        )

        let header = (
            <h1>Employee Portal</h1>
        )

        let updateForm = (
            null
        )

        if (localStorage.getItem("id") != null) {
            buttonSignin = (
                <button onClick={this.signOut} className="btn btn-primary ms-3">Sign Out</button>
            )
            header = (
                <h1>Welcome, {this.state.employee.firstName} {this.state.employee.lastName}</h1>
            )
            mainUpdate = (
                null
            )
            updateForm = this.renderUpdateForm()
        }

        return (
            <div className="container">
                {header}
                <p>Central hub for employees to navigate REM</p>
                {mainUpdate}
                {buttonSignin}
                {updateForm}
            </div>
        );
    }
}

export default EmployeeProfile;