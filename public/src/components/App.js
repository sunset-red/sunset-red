import React, {Component} from "react";
import cookie from 'react-cookie';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: cookie.load('userId'),
      name: ''
    }
  }

  getName() {
    const userId = this.state.userId;
    $.get('/userName/' + userId, (name)=> {
      this.setState({name});
    })
  }

  render() {
    return (
      <div>
        {this.props.children && React.cloneElement(this.props.children, {
          userId: this.state.userId,
          name: this.state.name,
          getName: this.getName.bind(this)
        })}
      </div>
    )
  }
}

export default App;
