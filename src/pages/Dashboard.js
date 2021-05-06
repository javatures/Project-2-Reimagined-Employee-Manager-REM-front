import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

            valueR: 127,
            valueG: 127,
            valueB: 127
        };
    }

    componentDidMount(){
        const employeeID = localStorage.getItem("id");
        const params ={
            employeeID
        }
        console.log(params);
        if (employeeID !== "0"){
            axios.get('http://localhost:8080/getDashboardColor', {params}).then(
            response=>{
                this.setState(
                    {
                        employeeID: employeeID,
                        valueR: response.data.red,
                        valueG: response.data.green,
                        valueB: response.data.blue
                    }
                )
            }
        ).catch(error=>
            console.log(error)
            )
        }
        

    
    }
    
    render() {

        return (
            <div className="container" id="color" >
                <div className="row">
                    <div className="col">
                        <h1 style= {{backgroundColor: `rgb(${this.state.valueR},${this.state.valueG},${this.state.valueB})`}}>Here's your dashboard!!</h1>
                    </div>
                    <div className="col"></div>
                    <div className="col">
                        <Link to="/dashconfig" className="btn btn-primary">Manage Dashboard</Link>
                        <Link to="/" className="btn btn-primary">Main</Link>
                    </div>   
                </div>
            </div>
        );
    }
}

export default Dashboard;