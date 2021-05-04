import React, { Component } from 'react';
import { Route } from 'react-router';
import EmployeeProfile from './EmployeeProfile';
import EmployeeSignin from './EmployeeSignin';
import EployeeRegistration from './EployeeRegistration';
import Ghud from './Ghud';
import Dashboard from './Dashboard';
import DashboardConfig from './DashboardConfig';
import Header from './Header';
import Home from './Home';
import Tasks from './Tasks';
import Requests from './Requests';

class Layout extends Component {
    render() {
        return (
            <div>
                <div className="fixed-top mb-5">
                    <Header {...this.props} />
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="container-fluid mb-5 mt-5">
                    <Route exact path="/" component={Home} />
                    <Route path="/main" component={Home} />
                    <Route path="/registration" component={EployeeRegistration} />
                    <Route path="/signin" component={EmployeeSignin} />
                    <Route path="/portal" component={EmployeeProfile} />
                    <Route path="/tasks" component={Tasks} />
                    <Route path="/ghud" component={Ghud} />
                    <Route path="/dash" component={Dashboard} />
                    <Route path="/dashconfig" component={DashboardConfig} />
                    <Route path="/requests" component={Requests} />
                </div>
            </div>
        );
    }
}

export default Layout;