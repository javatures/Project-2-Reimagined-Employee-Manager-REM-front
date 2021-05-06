import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/rem_logo_re.png'

class Home extends Component {

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

    signOut = () => {
        localStorage.clear();
        this.props.history.push("/main");
    }

    notLoggedIn = () => {
        return <div className="container">
        <h6>You can register a new account or signin if you already have an account</h6>
        <Link to="/registration" className="btn btn-primary m-2">Register</Link>
        <Link to="/signin" className="btn btn-primary m-2">Signin</Link>
    </div>
    }

    loggedIn = () => {
        return <div className="container">
        <h6>You are already logged in</h6>
        <Link className="btn btn-primary m-2" to="/portal">Profile</Link>
        <button onClick={this.signOut} className="btn btn-primary m-2">Sign Out</button>
    </div>

    }

    render() {

        let landing = this.notLoggedIn()

        if(localStorage.getItem("id") != null) {
            landing = this.loggedIn()
        }

        return (
            <div className="container" style={{backgroundColor:'transparent'}}>
                <div className="jumbotron">
                    <h1 className="display-4"><img src={Logo} alt="REM_LOGO" width="15%" height="15%" />
                    Welcome to REM: Reimagined Employee Manager</h1>
                    <p className="lead">REM is an employee management tool for supervisors and their direct reports. 
                    It allows users to manage their personal information, set public and private tasks, request reimbursements, and customize their dashboard.</p>
                    <hr className="my-2" />
                    <p className="lead">Most companies have different systems for employee management that can bog down employee production. 
                        We here at REM are looking to remedy this issue with an application that brings all these systems together in one. 
                        Please join us on our journey to bring employee management into the 21st century.</p>
                    {landing}
                </div>

            </div>
        );
    }
}

export default Home;