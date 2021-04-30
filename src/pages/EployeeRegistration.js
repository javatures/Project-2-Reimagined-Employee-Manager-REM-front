import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EployeeRegistration extends Component {
    render() {
        return (
            <div className="container">
                <h1>Employee Registration Form</h1>
                <br/>
                <form className="needs-validation" novalidate>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="firstName" className="form-label">First name: </label>
                        <input type="text" className="form-control" id="firstName" name="fristName" required />
                        <div className="invalid-feedback">
                            Please enter your first name.
                        </div>
                    </div>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="lastName" className="form-label">Last name: </label>
                        <input type="text" className="form-control" id="lastName" name="lastName" required />
                        <div className="invalid-feedback">
                            Please enter your last name.
                        </div>
                    </div>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="email" className="form-label">Email address: </label>
                        <div className="input-group has-validation">
                            <input type="email" className="form-control" id="email" name="email" required />
                            <div className="invalid-feedback">
                                Please enter in a vailed email.
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="password" className="form-label">Password: </label>
                        <input type="password" className="form-control" id="password" name="password" pattern=".{8,}" aria-describedby="passHelp" required />
                        <div id="passHelp" class="form-text">Password must be a minimum of 8 characters</div>
                        <div className="invalid-feedback">
                            Please provide a valid password.
                        </div>
                    </div>
                    <div className="mb-3 col-md-4">
                        <label for="validationCustom04" className="form-label">Employment Type: </label>
                        <select className="form-select" id="validationCustom04" required>
                            <option selected disabled value="">Choose...</option>
                            <option>employee</option>
                            <option>superviser</option>
                        </select>
                        <div className="invalid-feedback">
                            Please select an employment type.
                        </div>
                    </div>
                    <div className="mb-3 col-4">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                            <label className="form-check-label" htmlFor="invalidCheck">
                                Agree to terms and conditions
                            </label>
                            <div className="invalid-feedback">
                                You must agree before submitting.
                            </div>
                        </div>
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

export default EployeeRegistration;