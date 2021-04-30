import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Tasks extends Component {
    render() {
        return (
            <div className="container">
                <h1>Employee Tasks</h1>
                <form>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="taskName" className="form-label">Task name:</label>
                        <input type="text" className="form-control" name="taskName" id="taskName" />
                    </div>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="taskDescription" className="form-label">Task description:</label>
                        <input type="text" className="form-control" name="taskDescription" id="taskDescription" />
                    </div>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="taskDueDate" className="form-label">Task due date:</label>
                        <input type="text" className="form-control" name="taskDueDate" id="taskDueDate" />
                    </div>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="employeeID" className="form-label">Employee assined to:</label>
                        <input type="text" className="form-control" name="employeeID" id="employeeID" />
                    </div>
                    <div className="mb-3 col-md-4">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </form>
                <Link to="/" className="btn btn-primary">Main</Link>
            </div>
        );
    }
}

export default Tasks;