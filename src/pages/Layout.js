import React, { Component } from 'react';
import { Route } from 'react-router';
import Ghud from './Ghud';
import Header from './Header';
import Home from './Home';

class Layout extends Component {
    render() {
        return (
            <div>
                <div className="fixed-top mb-5">
                    <Header />
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="container-fluid mb-5 mt-5">
                    <Route exact path="/" component={Home} />
                    <Route path="/main" component={Home} />
                    <Route path="/ghud" component={Ghud} />
                </div>
            </div>
        );
    }
}

export default Layout;