import React from 'react';

export class Job extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <li key={this.props.id}>
                <h3>{this.props.elem.name}</h3>
                <p>{this.props.elem.company}</p>
                <p>{this.props.elem.city}</p>
                <p>{this.props.elem.country}</p>
                <button onClick={() => this.props.onDelete(this.props.id)}>Eliminar </button>
            </li>
        );
    }

    componentDidMount() {
    }
}
