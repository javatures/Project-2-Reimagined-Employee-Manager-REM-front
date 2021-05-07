import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Tasks extends Component {

    state = {
        employee: {},
        tasks: {
            taskID: '',
            employeeID: '',
            taskDescription: '',
            taskName: '',
            taskDueDate: ''
        },
        taskList: [],
        employeeList: []
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const tempTask = { ...this.state.tasks };
        tempTask[name] = value;
        this.setState({
            tasks: tempTask
        });
    }

    createTask = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/createTask', this.state.tasks)
            .then(response => {
                alert('Task Assigned')
                window.location.reload()
            })
            .catch(error => {
                alert('failed to assign task')
                window.location.reload()
            })
    }

    completeTask = (taskID, event) => {
        axios.post('http://localhost:8080/deleteTask', {taskID})
            .then(response => {
                alert('Task Compleated')
                window.location.reload()
            })
            .catch(error =>{
                alert('failed to mark task as compleate')
                window.location.reload()    
            })
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

        axios.get('http://localhost:8080/listTasksByEmployee', {params})
            .then(response => {
                this.setState({
                    taskList: response.data
                });
            })
            .catch(error => {
                console.log('an error has happed')
            })

        axios.get('http://localhost:8080/listEmployeesByManager', {params})
            .then(response => {
                this.setState({
                    employeeList: response.data
                });
            })
            .catch(error => {
                console.log('an error has happed')
            })
    }

    taskTable = () => {
        return <table className="table">
            <thead>
                <tr>
                    <th scope="col">Task ID</th>
                    <th scope="col">Task Due Date</th>
                    <th scope="col">Task Name</th>
                    <th scope="col">Task Description</th>
                    <th scope="col">Task Assigned To</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody className="form-align">
                {this.state.taskList.map((task) => (
                    <tr key={task.taskID}>
                        <th scope="row">{task.taskID}</th>
                        <td>{task.taskDueDate}</td>
                        <td>{task.taskName}</td>
                        <td>{task.taskDescription}</td>
                        <td>{task.employeeID}</td>
                        <td><button className="btn btn-primary" onClick={(event) => this.completeTask(task.taskID, event)} >Complete</button></td>
                    </tr>))}
            </tbody>
        </table>
    }

    taskForm = () => {
        return <form onSubmit={this.createTask}>
            <div className="mb-3 col-md-4">
                <label htmlFor="taskName" className="form-label">Task name:</label>
                <input onChange={this.handleChange} value={this.state.tasks.taskName} type="text" className="form-control" name="taskName" id="taskName" />
            </div>
            <div className="mb-3 col-md-4">
                <label htmlFor="taskDescription" className="form-label">Task description:</label>
                <input onChange={this.handleChange} value={this.state.tasks.taskDescription} type="text" className="form-control" name="taskDescription" id="taskDescription" />
            </div>
            <div className="mb-3 col-md-4">
                <label htmlFor="taskDueDate" className="form-label">Task due date:</label>
                <input onChange={this.handleChange} value={this.state.tasks.taskDueDate} type="text" className="form-control" name="taskDueDate" id="taskDueDate" />
            </div>
            <div className="mb-3 col-md-4">
                <label htmlFor="employeeID" className="form-label">Employee assigned to:</label>
                <input onChange={this.handleChange} value={this.state.tasks.employeeID} type="number" className="form-control" name="employeeID" id="employeeID" />
            </div>
            <div className="mb-3 col-md-4">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    }

    listEmployeesOver = () => {
        return <div>
            <aside style={{ float: "right", marginRight: 50, marginTop: 5 }}>
                <table className="table caption-top ">
                    <caption>List of employees under you</caption>
                    <thead>
                        <tr>
                            <th scope="col">Employee ID</th>
                            <th scope="col">Employee Name</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="form-align">
                        {this.state.employeeList.map((emp) => (
                            <tr key={emp.employeeID}>
                                <th scope="row">{emp.employeeID}</th>
                                <td>{emp.firstName} {emp.lastName}</td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </aside>
        </div>
    }

    render() {

        let header = (
            <h1>Tasks</h1>
        )

        let views = (
            <p>Please log in to view tasks or create tasks</p>
        )

        let viewTask = (
            null
        )
        

        let viewEployeesOver = (
            null
        )

        let redirect = (
            <Link to="/" className="btn btn-primary mt-3">Main</Link>
        )

        if (localStorage.getItem("id") != null) {
            header = (
                <h1>Welcome {this.state.employee.firstName} {this.state.employee.lastName} ({this.state.employee.employeeID})</h1>
            )
            redirect = (
                <Link to="/portal" className="btn btn-primary mt-3">Profile</Link>
            )
            if (localStorage.getItem("type") === "1") {
                if(this.state.taskList.length === 0) {
                    views = (
                        <p>There are no tasks for you to complete</p>
                    )
                }
                else {
                    views = (
                        <p>Here are the list of tasks for you to complete</p>
                    )
                    viewTask = this.taskTable()
                }
            }
            if (localStorage.getItem("type") === "2") {
                views = (
                    <p>Please create tasks for the employees you supervise to complete</p>
                )
                if (this.state.employeeList.length !== 0) {
                    viewEployeesOver = this.listEmployeesOver()
                    viewTask = this.taskForm()
                }
                else {
                    viewTask = (
                        <p>There are no employees under you</p>
                    )
                }
                
            }
        }

        return (
            <div className="container">
                {header}
                {views}
                {viewEployeesOver}
                {viewTask}
                {redirect}
            </div>
        );
    }
}

export default Tasks;