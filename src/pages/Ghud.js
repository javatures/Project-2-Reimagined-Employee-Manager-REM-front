import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ghud extends Component {
    render() {
        return (
            <div className="container">
                <div id="rowTitle" class="row pt-5 px-5">
                    <div class="col-md-12">
                        <h1>Headspace</h1>
                    </div>
                </div>
                <div id="rowSubtitle" class="row pt-5 px-5">
                    <Link to="/" className="btn btn-primary">Back To Main</Link>
                </div>
                <div id="rowHeading" class="row pt-5 px-5">
                    <div className="col-md-4">
                        <h2>Thought</h2>
                        <br/>
                    </div>
                    <div className="col-md-4">
                        <h2>Vibe</h2>
                        <br/>
                        <h3>Create A Vibe</h3>
                        <div className="mb-3 col-md-4">
                            <label htmlFor="vibeTldr" className="form-label">Vibe TLDR: </label>
                            <div className="input-group">
                                <input type="text" id="vibeTldr" name="vibeTldr" required />
                            </div>
                        </div>
                        <div className="mb-3 col-md-4">
                            <label htmlFor="vibePurpose" className="form-label">Vibe Purpose: </label>
                            <div className="input-group">
                                <input type="text" id="vibePurpose" name="vibePurpose" required />
                            </div>
                        </div>
                        <div className="mb-3 col-md-4">
                            <label htmlFor="employeeID" className="form-label">Vibee Employee ID: </label>
                            <div className="input-group">
                                <input type="text" id="employeeID" name="employeeID" required />
                            </div>
                        </div>
                        <div className="mb-3 col-12">
                            <button className="btn btn-primary" type="submit">Create This Vibe</button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h2>Soul</h2>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Ghud;