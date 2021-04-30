import React, { Component } from 'react';

class Ghud extends Component {
    render() {
        return (
            <div className="container">
                <div id="rowTitle" class="row pt-5 px-5">
                    <div class="col-md-12">
                        <h1>Headspace</h1>
                    </div>
                </div>
                <div id="rowHeading" class="row pt-5 px-5">
                    <div className="col-md-12">
                        <h2>Thought</h2>
                        <h2>Vibe</h2>
                        <h2>Soul</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Ghud;