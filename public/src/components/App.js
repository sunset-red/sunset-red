import React, {Component} from "react";
import cookie from 'react-cookie';

class App extends Component {
  constructor() {
    super();
    this.state = {
      _id: cookie.load('userId')
    }
  }

  render() {
    return (
      <div>
        {this.props.children && React.cloneElement(this.props.children, {
          _id: this.state._id
        })}
      </div>
    )
  }
}

export default App;
