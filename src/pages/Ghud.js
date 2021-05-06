import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ghud extends Component {

    state = {
        employee: {},

        vibe: {
            vibeID: '',
            vibeTLDR: '',
            vibePurpose: '',
            employeeID: ''
        },

        thought: {
            thoughtID: '',
            thoughtTLDR: '',
            thoughtLocation: '',
            thoughtFrame: '',
            vibeID: '',
            employeeID: ''
        },

        thoughts: [],
        employees: [],
        vibes: []
    }

    componentDidMount() {
        const employeeID = localStorage.getItem("id");
        const params = { employeeID };
        axios.get("http://localhost:8080/findEmployee", { params })
        .then(response => {
            this.setState ({
                employee: response.data
            });
        }).catch(error => {
            console.log('error finding employee');
        })

        axios.get("http://localhost:8080/listThoughtsByEmployee", { params })
        .then(response => {
            this.setState ({
                thoughts: response.data
            });
        })
        .catch(error => {
            console.log('error listing thoughts by employee');
        })

    }

    listOfThoughts = () => {
        // map each thought from thoughts to a table row
        let tempThoughts = this.state.thoughts.map((thought) =>
            <tr key={thought.thoughtID}>
                <th scope="row">{thought.thoughtID}</th>
                <td>{thought.thoughtFrame}</td>
                <td>{thought.thoughtLocation}</td>
                <td>{thought.thoughtTLDR}</td>
                <td>{thought.vibeID}</td>
                <td>{thought.employeeID}</td>
            </tr>)

        return tempThoughts;
    }

    thoughtTable = () => {
        return <table className="table">
            <thead>
                <tr>
                    <th scope="col">Thought ID</th>
                    <th scope="col">Thought Frame</th>
                    <th scope="col">Thought Location</th>
                    <th scope="col">Thought TLDR</th>
                    <th scope="col">Thought Vibe</th>
                    <th scope="col">Thought Employee</th>
                </tr>
            </thead>
            <tbody className="form-align">
                {this.listOfThoughts()}
            </tbody>
        </table>
    }

    handleChangeThought = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const tempThought = { ...this.state.thought };
        tempThought[name] = value;
        this.setState({
            thought: tempThought
        });
    }

    handleChangeVibe = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const tempVibe = { ...this.state.vibe };
        tempVibe[name] = value;
        this.setState({
            vibe: tempVibe
        });
    }

    handleSubmitThought = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/createThought', this.state.thought)
        .then(response => {
            //nav to headspace with "thought created" confirmation message
            console.log('thought created');
            console.log(this.state.thought);
            alert('Thought Creation Successful');
            this.props.history.push('ghud');
            window.location.reload();
        })
        .catch(error => {
            alert('Thought Creation Failed');
        })
    }

    handleSubmitVibe = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/createVibe', this.state.vibe)
        .then(response => {
            //nav to headspace with "vibe created" confirmation message
            console.log('vibe created');
            console.log(this.state.vibe);
            alert('Vibe Creation Successful');
            this.props.history.push('ghud');
            window.location.reload();
        })
        .catch(error => {
            alert('Vibe Creation Failed');
        })
    }

    render() {

        let header = (
            <div id="rowTitle" className="row pt-5 px-5">
                <div className="col-md-12">
                    <h1>Headspace</h1>
                </div>
            </div>
        )

        let views = (
            <p>Please log in to view your headspace</p>
        )

        let viewThoughts = (
            null
        )

        let viewVibes = (
            null
        )

        if (localStorage.getItem("id") != null) {
            header = (
                <div id="rowTitle" className="row pt-5 px-5">
                    <div className="col-md-12">
                        <h1>Headspace: {this.state.employee.firstName} {this.state.employee.lastName} ({this.state.employee.employeeID})</h1>
                    </div>
                </div>
            )
            if(this.state.thoughts.length === 0) {
                viewThoughts = (
                    <p>
                        Congratulations- your thoughts are clear.
                    </p>
                )
            }
            else {
                viewThoughts = this.thoughtTable();
            }
        }

        return (
            <div className="container">
                {header}
                <div id="rowSubtitle" class="row pt-5 px-5">
                    <div className="mb-3 col-12">
                        <Link to="/" className="btn btn-primary">Back To Main</Link>
                    </div>
                </div>
                <div id="rowHeading" class="row pt-5 px-5">
                    <div className="col-md-4">
                        <h2>Thought</h2>
                        <br/>

                        {/* code for creating thoughts */}
                        <h3>Create A Thought</h3>
                        <form onSubmit={this.handleSubmitThought} className="needs-validation" noValidate>
                            <div className="mb-3 col-md-4">
                                <label htmlFor="thoughtTLDR" className="form-label">Thought TLDR: </label>
                                <input onChange={this.handleChangeThought} value={this.state.thought.thoughtTLDR} type="text" className="form-control" id="thoughtTLDR" name="thoughtTLDR" required />
                                <div className="invalid-feedback">
                                    Please enter a thought TLDR.
                                </div>
                            </div>
                            <div className="mb-3 col-md-4">
                                <label htmlFor="thoughtLocation" className="form-label">Thought Location: </label>
                                <input onChange={this.handleChangeThought} value={this.state.thought.thoughtLocation} type="text" className="form-control" id="thoughtLocation" name="thoughtLocation" required />
                                <div className="invalid-feedback">
                                    Please enter a thought location.
                                </div>
                            </div>
                            <div className="mb-3 col-md-4">
                                <label htmlFor="thoughtFrame" className="form-label">Thought Frame: </label>
                                <input onChange={this.handleChangeThought} value={this.state.thought.thoughtFrame} type="text" className="form-control" id="thoughtFrame" name="thoughtFrame" required />
                                <div className="invalid-feedback">
                                    Please enter a thought frame.
                                </div>
                            </div>
                            <div className="mb-3 col-md-4">
                                <label htmlFor="vibeID" className="form-label">Thought's Vibe ID: </label>
                                <input onChange={this.handleChangeThought} value={this.state.thought.vibeID} type="text" className="form-control" id="vibeID" name="vibeID" required />
                                <div className="invalid-feedback">
                                    Please enter a vibe ID for this thought.
                                </div>
                            </div>
                            <div className="mb-3 col-12">
                                <button className="btn btn-primary" type="submit">Submit thought</button>
                            </div>
                        </form>

                        {/* code for viewing thoughts */}
                        <h3>View Thoughts</h3>
                        <div className="container">
                            {viewThoughts}
                        </div>

                    </div>
                    <div className="col-md-4">
                        <h2>Vibe</h2>
                        <br/>
                        <h3>Create A Vibe</h3>
                        <form onSubmit={this.handleSubmitVibe} className="needs-validation" noValidate>
                            <div className="mb-3 col-md-4">
                                <label htmlFor="vibeTLDR" className="form-label">Vibe TLDR: </label>
                                <input onChange={this.handleChangeVibe} value={this.state.vibe.vibeTLDR} type="text" className="form-control" id="vibeTLDR" name="vibeTLDR" required />
                                <div className="invalid-feedback">
                                    Please enter a vibe TLDR.
                                </div>
                            </div>
                            <div className="mb-3 col-md-4">
                                <label htmlFor="vibePurpose" className="form-label">Vibe Purpose: </label>
                                <input onChange={this.handleChangeVibe} value={this.state.vibe.vibePurpose} type="text" className="form-control" id="vibePurpose" name="vibePurpose" required />
                                <div className="invalid-feedback">
                                    Please enter a vibe purpose.
                                </div>
                            </div>
                            <div className="mb-3 col-md-4">
                                <label htmlFor="employeeID" className="form-label">Vibee Employee ID: </label>
                                <input onChange={this.handleChangeVibe} value={this.state.vibe.employeeID} type="text" className="form-control" id="employeeID" name="employeeID" required />
                                <div className="invalid-feedback">
                                    Plese enter a vibee's employee ID.
                                </div>
                            </div>
                            <div className="mb-3 col-12">
                                <button className="btn btn-primary" type="submit">Submit vibe</button>
                            </div>
                        </form>
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