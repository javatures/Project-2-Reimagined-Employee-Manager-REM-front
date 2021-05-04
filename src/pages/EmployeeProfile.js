import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EmployeeProfile extends Component {

    state = {
        employee: {}
    }

    signOut = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("employee");
        localStorage.removeItem("type");
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

    render() {

        let buttonSignin = (
            <Link to="/signin" className="btn btn-primary ms-3">Signin</Link>
        )

        let header = (
            <h1>Employee Portal</h1>
        )

        if (localStorage.getItem("id") != null) {
            buttonSignin = (
                <button onClick={this.signOut} className="btn btn-primary ms-3">Sign Out</button>
            )
            header = (
                <h1>Welcome {this.state.employee.firstName} {this.state.employee.lastName}</h1>
            )
        }

        return (
            <div className="container">
                {header}
                <p>central hub for employees to navagate REM</p>
                <Link to="/" className="btn btn-primary">Main</Link>
                {buttonSignin}
            </div>
        );
    }
}

export default EmployeeProfile;