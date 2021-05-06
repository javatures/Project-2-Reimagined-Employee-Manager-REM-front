import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logo from '../images/rem_logo_re.png'

class Header extends Component {

    state = {
        employee: {}
    }

    signOut = () => {
        localStorage.clear();
        this.props.history.push("/main");
    }

    renderDropdownLogedIn = () => {
        return <ul className="dropdown-menu text-small" name="dropDownMenu" id="dropDownMenu" aria-labelledby="dropDownMenu">
            <li><Link className="dropdown-item" to="/tasks">Tasks</Link></li>
            <li><Link className="dropdown-item" to="/requests">Requests</Link></li>
            <li><Link className="dropdown-item" to="/ghud">ghuD</Link></li>
            <li><Link className="dropdown-item" to="/dash">Dashboard</Link></li>
            <li><Link className="dropdown-item" to="/portal">Profile</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link onClick={this.signOut} className="dropdown-item" to="/">Sign out</Link></li>
        </ul>
    }

    renderDropdownLogedOut = () => {
        return <ul className="dropdown-menu text-small" name="dropDownMenu" id="dropDownMenu" aria-labelledby="dropDownMenu">
            <li><Link className="dropdown-item" to="/registration">Register</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" to="/signin">Signin</Link></li>
        </ul>
    }

    adminView = () => {
        return <ul className="dropdown-menu text-small" name="dropDownMenu" id="dropDownMenu" aria-labelledby="dropDownMenu">
            <li><Link className="dropdown-item" to="/admin">Admin</Link></li>
            <li><Link className="dropdown-item" to="/requests">Requests</Link></li>
            <li><Link className="dropdown-item" to="/ghud">ghuD</Link></li>
            <li><Link className="dropdown-item" to="/dash">Dashboard</Link></li>
            <li><Link className="dropdown-item" to="/portal">Profile</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link onClick={this.signOut} className="dropdown-item" to="/">Sign out</Link></li>
        </ul>
    }

    render() {

        let dropdown = (
            this.renderDropdownLogedOut()
        )

        let employeeName = (
            null
        )

        let tasksView = (
            <li><Link to="/tasks" className="nav-link px-2 link-dark"><h3>Tasks</h3></Link></li>
        )

        if (localStorage.getItem("id") != null) {
            employeeName = (
                <h3>{localStorage.getItem("firstName")} {localStorage.getItem("lastName")}</h3>
            )
            if (localStorage.getItem("type") === "3") {
                dropdown = this.adminView()
                tasksView = (
                    <li><Link className="nav-link px-2 link-dark" to="/admin"><h3>Admin</h3></Link></li>
                )
            }
            else {
                dropdown = this.renderDropdownLogedIn()
            }
        }

        return (
            <div>
                <header className="p-3 mb-3 border-bottom" style={{backgroundColor: 'whitesmoke'}}>
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                        <img src={Logo} alt="REM_LOGO" width="7%" height="7%" />

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            {tasksView}
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