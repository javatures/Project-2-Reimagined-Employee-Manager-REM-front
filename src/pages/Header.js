/* import axios from 'axios'; */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logo from '../images/rem_logo_re.png'

class Header extends Component {

    state = {
        employee: {}
    }

    signOut = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("employee");
        localStorage.removeItem("type");
        this.props.history.push("/main");
    }

    /* componentDidMount() {
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
    } */

    renderDropdownLogedIn = () => {
        return <ul className="dropdown-menu text-small" name="dropDownMenu" id="dropDownMenu" aria-labelledby="dropDownMenu">
            <li><a className="dropdown-item" href="/">New project...</a></li>
            <li><a className="dropdown-item" href="/">Settings</a></li>
            <li><a className="dropdown-item" href="/">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><p onClick={this.signOut} className="dropdown-item">Sign out</p></li>
        </ul>
    }

    renderDropdownLogedOut = () => {
        return <ul className="dropdown-menu text-small" name="dropDownMenu" id="dropDownMenu" aria-labelledby="dropDownMenu">
        <li><Link className="dropdown-item" to="/registration">Register</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><Link className="dropdown-item" to="/signin">Signin</Link></li>
    </ul>
    }

    render() {

        let dropdown = (
            this.renderDropdownLogedOut()
        )

        let employeeName = (
            null
        )

        if (localStorage.getItem("id") != null) {
            employeeName = (
                <h3>{localStorage.getItem("firstName")} {localStorage.getItem("lastName")}</h3>
            )
            dropdown = (
                this.renderDropdownLogedIn()
            )
        }

        return (
            <div>
                <header className="p-3 mb-3 border-bottom">
                        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                                
                            <img src={Logo} alt="REM_LOGO" width="7%" height="7%" />

                            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                <li><Link to="/tasks" className="nav-link px-2 link-dark"><h3>Tasks</h3></Link></li>
                                <li><Link to="/requests" className="nav-link px-2 link-dark"><h3>Requests</h3></Link></li>
                                <li><Link to="/ghud" className="nav-link px-2 link-dark"><h3>ghuD</h3></Link></li>
                                <li><Link to="/dash" className="nav-link px-2 link-dark"><h3>Dashboard</h3></Link></li>
                            </ul>

                            <div className="col-12 col-lg-auto me-5">
                                {employeeName}
                            </div>

                            <div className="dropdown text-end">
                                <a className="d-block text-decoration-none dropdown-toggle" href="/" name="dropDownMenu" id="dropDownMenu" data-bs-toggle="dropdown" data-bs-target="#dropDownMenu" aria-expanded="false">
                                    <img src={Logo} alt="upi" width="32" height="32" className="rounded-circle" />
                                </a>
                                {dropdown}
                            </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default withRouter(Header);