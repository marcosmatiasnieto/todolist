import React from 'react';
import {Job} from './Job';
import {NewJobForm} from './NewJobForm';

export class Jobs extends React.Component {
    constructor() {
        super();
        this.state = {
            jobs: [
            ]
        };
    }
    onNewJob = (evt, newJob) => {
        this.setState({
            jobs: [...this.state.jobs, newJob]
        });
    }
    
    deleteJob = (id) => {
        this.setState({
            jobs: this.state.jobs.filter((job, idx) => idx !== id)
        });
    }
    render() {
        return (
            <div>
                <NewJobForm onNewJobSubmit={this.onNewJob}></NewJobForm>
                <ul>
                    {this.state.jobs.map((job, idx) => {
                        return<Job key={idx} elem={job} onDelete = {() => this.deleteJob(idx)}></Job>
                    })}
                </ul>
            </div>
        );
    }
    componentDidMount() {
    }
}