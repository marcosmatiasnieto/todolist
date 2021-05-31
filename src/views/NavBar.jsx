import React from 'react';
import {Link} from 'react-router-dom';

export class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return <p>
        <Link to="/">Home</Link>
        <Link to="/companies">Companies</Link>
        <Link to="/cities">Cities</Link>
        <Link to="/countries">Countries</Link>
        </p>;
  }
}
