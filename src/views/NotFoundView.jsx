import React from 'react';
import {Redirect} from 'react-router-dom';

export class NotFoundView extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return <Redirect to="/" ></Redirect>;
  }

}
