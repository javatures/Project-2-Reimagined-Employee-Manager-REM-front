import React, { Component } from 'react';
import { Route } from 'react-router';
import EmployeeProfile from './EmployeeProfile';
import EmployeeSignin from './EmployeeSignin';
import Ghud from './Ghud';
import Dashboard from './Dashboard';
import DashboardConfig from './DashboardConfig';
import Header from './Header';
import Home from './Home';
import Tasks from './Tasks';
import SubmitRequest from './SubmitRequest';
import Requests from './Requests';
import PendingRequests from './PendingRequests';
import EmployeeRegistration from './EmployeeRegistration';
import Admin from './Admin';


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
                <div className="container-fluid mb-5 mt-5">
                    <Route exact path="/" component={Home} />
                    <Route path="/main" component={Home} />
                    <Route path="/registration" component={EmployeeRegistration} />
                    <Route path="/signin" component={EmployeeSignin} />
                    <Route path="/portal" component={EmployeeProfile} />
                    <Route path="/tasks" component={Tasks} />
                    <Route path="/ghud" component={Ghud} />
                    <Route path="/dash" component={Dashboard} />
                    <Route path="/dashconfig" component={DashboardConfig} />
                    <Route path="/submitrequest" component={SubmitRequest} />
                    <Route path="/requests" component={Requests} />
                    <Route path="/pendingrequests" component={PendingRequests}/>
                    <Route path="/admin" component={Admin} />
                </div>
            </div>
        );
    }
}

export default Layout;