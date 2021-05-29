import React from 'react';

export class NewJobForm extends React.Component {
    constructor() {
        super();
        this.state = {
            newJob: {
                name: '',
                company: '',
                city: '',
                country: ''
            }
        };
    }
    handleNewJobName = (evt) => {
        this.setState(prevState => ({
            newJob: {
                ...prevState.newJob,
                name: evt.target.value
            }
        })
        );
    }
    handleNewJobCompany = (evt) => {
        this.setState(prevState => ({
            newJob: {
                ...prevState.newJob,
                company: evt.target.value
            }
        })
        );
    }
    handleNewJobCity = (evt) => {
        this.setState(prevState => ({
            newJob: {
                ...prevState.newJob,
                city: evt.target.value
            }
        })
        );
    }
    handleNewJobCountry = (evt) => {
        this.setState(prevState => ({
            newJob: {
                ...prevState.newJob,
                country: evt.target.value
            }
        })
        );
    }
    handleNewJobSubmit = (evt) => {
        evt.preventDefault();
        if (this.state.newJob.name.trim() === '' ||
            this.state.newJob.company.trim() === '' ||
            this.state.newJob.city.trim() === '' ||
            this.state.newJob.country.trim() === ''
            ){
            return false;

        }
        this.props.onNewJobSubmit(evt, this.state.newJob)
    }
    render() {
        return (
            <form onSubmit={this.handleNewJobSubmit} >
                <label>Job:</label>
                <input placeholder="Agregar puesto de trabajo" type="text" required value={this.state.newJob.name} onChange={(e) => this.handleNewJobName(e)}></input><br></br>
                <label>Company:</label>
                <input placeholder="Agregar Compañia" type="text" required value={this.state.newJob.company} onChange={(e) => this.handleNewJobCompany(e)}></input><br></br>
                <label>City:</label>
                <input placeholder="Agregar Ciudad" type="text" required value={this.state.newJob.city} onChange={(e) => this.handleNewJobCity(e)}></input><br></br>
                <label>Country:</label>
                <input placeholder="Agregar País" type="text" required value={this.state.newJob.country} onChange={(e) => this.handleNewJobCountry(e)}></input><br></br>

                <button type="submit">Agregar</button>
            </form>
        );
    }

    componentDidMount() { }
}
