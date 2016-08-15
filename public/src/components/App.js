import React, {Component} from "react";
import cookie from 'react-cookie';

class App extends Component {
  constructor() {
    super();
    this.state = {
      _id: cookie.load('userId'),
      name: ''
    }
  }

  getName() {
    const _id = this.state._id;
    $.get('/userName/' + _id, (name)=> {
      this.setState({name});
    })
  }

  render() {
    return (
      <div>
        {this.props.children && React.cloneElement(this.props.children, {
          _id: this.state._id,
          name: this.state.name,
          getName: this.getName.bind(this)
        })}
      </div>
    )
  }
}

export default App;
