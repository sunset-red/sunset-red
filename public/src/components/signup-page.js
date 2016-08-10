import React, {Component} from "react";
import {Link} from 'react-router';

export default class SignUpPage extends Component {
  render() {
    return (
      <div>
        <Link to="/">exit</Link>
        <Link to="/personPage">success</Link>
        SignUpPage
      </div>
    )
  }
}
