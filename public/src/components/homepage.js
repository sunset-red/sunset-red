import React, {Component} from "react";
import {Link} from 'react-router';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Link to="/personPage">login</Link>
        <Link to="/signUpPage">signup</Link>
        HomePage
      </div>
    )
  }
}
