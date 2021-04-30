import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EmployeeSignin extends Component {
    render() {
        return (
            <div className="container">
                <form>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="email" className="form-label">Email address:</label>
                        <input type="email" className="form-control" name="email" id="email" />
                    </div>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" className="form-control" name="password" id="password" />
                    </div>
                    <div className="mb-3 col-md-4">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                <Link to="/" className="btn btn-primary">Main</Link>
            </div>
        );
    }
}

export default EmployeeSignin;