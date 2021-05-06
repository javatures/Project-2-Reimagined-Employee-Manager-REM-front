import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Admin extends Component {

    state = {
        employee: {},
        emp: {
            employeeID: '',
            managerID: ''
        },
        employeeList: []
    }

    componentDidMount() {
        const employeeID = localStorage.getItem("id");
        const params = { employeeID }
        axios.get('http://localhost:8080/findEmployee', { params })
            .then(response => {
                this.setState({
                    employee: response.data
                });
            })
            .catch(error => {
                // display error message
            })
        axios.get('http://localhost:8080/listEmployees')
            .then(response => {
                this.setState({
                    employeeList: response.data
                });
            })
            .catch(error => {
                console.log('an error has happed')
            })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const tempEmployee = { ...this.state.emp };
        tempEmployee[name] = value;
        this.setState({
            emp: tempEmployee
        });
    }

    updateEmployeeManager = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/updateEmployeeManager', this.state.emp)
        .then(response => {
            //nav to a thank you page
            console.log('employee added');
            console.log(this.state.employee);
            alert('Registration Successful');
            window.location.reload()
        })
        .catch(error => {
            alert('Registration failed');
            //display error message
        })
    }

    notAuthorized = () => {
        return <div className="jumbotron">
            <h1 className="display-4">You are not authorized to view this Page</h1>
            <p className="lead">You are not an admin of REM. To become an admin you must go through the appropriate training and be approved by the VP of Employment Managemet.</p>
            <hr className="my-4" />
            <p>Please return to the main page</p>
            <Link to="/main" className="btn btn-primary">Return</Link>
        </div>
    }

    isAuthorized = () => {
        return <div className="jumbotron">
            <h1 className="display-4">Welcome Admin {this.state.employee.firstName} </h1>
            <p className="lead">You have the power to make changes that no one else can. Use this power wisely.</p>
            <hr className="my-4" />
            <p>"With great power comes great responsibility"</p>
            <Link to="/portal" className="btn btn-primary">Return</Link>
        </div>
    }

    assignManager = () => {
        return <form onSubmit={this.updateEmployeeManager} className="container">
            <div className="mb-3 col-md-4">
                <label htmlFor="employeeID" className="form-label">Employee ID:</label>
                <input onChange={this.handleChange} value={this.state.emp.employeeID} type="number" className="form-control" name="employeeID" id="employeeID" />
            </div>
            <div className="mb-3 col-md-4">
                <label htmlFor="managerID" className="form-label">Manager ID:</label>
                <input onChange={this.handleChange} value={this.state.emp.managerID} type="number" className="form-control" name="managerID" id="managerID" />
            </div>
            <div className="mb-3 col-md-4">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    }

    listEmployeesToAssign = () => {
        return <aside style={{ float: "right", marginRight: 200 }}>
            <table className="table caption-top ">
                <caption>List of employees to assign</caption>
                <thead>
                    <tr>
                        <th scope="col">Employee ID</th>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Managers ID</th>
                        <th scope="col">Type ID</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody className="form-align">
                    {this.state.employeeList.map((emp) => (
                        <tr key={emp.employeeID}>
                            <th scope="row">{emp.employeeID}</th>
                            <td>{emp.firstName} {emp.lastName}</td>
                            <td>{emp.managerID}</td>
                            <td>{emp.employeeTypeID}</td>
                            <td></td>
                        </tr>))}
                </tbody>
            </table>
        </aside>

    }

    render() {

        let header = this.notAuthorized()

        let listEmployees = (
            null
        )

        let assignEmployees = (
            null
        )

        if (localStorage.getItem("id") != null) {
            if (localStorage.getItem("type") === "3") {
                header = this.isAuthorized()
                if (localStorage.getItem("managerID") === "0") {
                    assignEmployees = this.assignManager()
                    listEmployees = this.listEmployeesToAssign()
                }
            }

        }

        return (
            <div>
                {header}
                {listEmployees}
                {assignEmployees}
            </div>
        );
    }
}

export default Admin;