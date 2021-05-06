import React, { Component } from 'react';
import {RangeStepInput} from 'react-range-step-input';
import { Link } from 'react-router-dom';
import axios from 'axios';


class DashboardConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeID: 0,
            valueR: 127,
            valueG: 127,
            valueB: 127
        };
    }
    
    
    render() {

        return (

            <div className="container">
                <div className="row">
                    <h1>Dashboard Configuration</h1>
                </div>
                <h3>Dashboard Color:</h3>
                <form  onSubmit={this.handleSubmit}>
                <div id="color">
                <div className="row">
                    <div className="col">
                        <RangeStepInput
                        id="red"
                        min={0} max={255}
                        value={this.state.valueR} step={1}
                        onChange={this.handleChangeR}
                        />
                    </div>
                    <div className="col"></div>
                    <div className="col"></div>
                </div>
                <div className="row">
                    <div className="col">
                    <RangeStepInput
                        name="green"
                        min={0} max={255}
                        value={this.state.valueG} step={1}
                        onChange={this.handleChangeG}
                        />
                    </div>
                    <div className="col"></div>
                    <div className="col"></div>
                </div>
                <div className="row">
                    <div className="col">
                    <RangeStepInput
                        name="blue"
                        min={0} max={255}
                        value={this.state.valueB} step={1}
                        onChange={this.handleChangeB}
                        />
                    </div>
                    <div className="col"></div>
                    <div className="col"></div>
                </div>
                </div>
                
                    <button type="submit">Save</button>
                </form>
                <Link to="/" className="btn btn-primary">Main</Link>
                <Link to="/dash" className="btn btn-primary">Dashboard</Link>
            </div>
        );
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

    handleSubmit = (event) => {
        //save color to database
        event.preventDefault();
        let color = {"employeeID": localStorage.getItem("id"),"red":this.state.valueR,"green":this.state.valueG, "blue":this.state.valueB};
        console.log(color);
        axios.post('http://localhost:8080/saveDashboardColor', color)
        .then(response => {
            //nav to headspace with "thought created" confirmation message
            console.log('color saved');
            alert('Dashboard Color Saved');
        })
        .catch(error => {
            alert('Failed to Save Color');
        })
    }
    handleChangeR = (event) => {
        const value = event.target.value;
        
        this.setState({
            valueR: value
        });
        document.getElementById("color").style.backgroundColor = "rgb("+this.state.valueR+","+this.state.valueG+","+this.state.valueB+")";
    }

    handleChangeG = (event) => {
        const value = event.target.value;
        
        this.setState({
            valueG: value
        });
        document.getElementById("color").style.backgroundColor = "rgb("+this.state.valueR+","+this.state.valueG+","+this.state.valueB+")";
    }
    handleChangeB = (event) => {
        const value = event.target.value;
        
        this.setState({
            valueB: value
        });
        document.getElementById("color").style.backgroundColor = "rgb("+this.state.valueR+","+this.state.valueG+","+this.state.valueB+")";
    }
    
    
}
export default DashboardConfig;