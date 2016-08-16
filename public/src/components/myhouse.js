import React, {Component} from "react";

export class Publishform extends Component {
  relase() {
    const newValue = $('input[name =inputValue]').val();
    this.props.onRelase(newValue);
  }

  render() {
    return <div className="input-group" style={{margin: '30px'}}>
      <input type="text" name='inputValue' className="form-control" placeholder="Search for..."/>
      <span className="input-group-btn">
        <button className="btn btn-default" type="button" onClick={this.relase.bind(this)}>发表</button>
      </span>
    </div>
  }
}
export class dynamics extends Component {
  render() {
    const says = this.props.says.map((say, index)=> {
      return <li className="media" id={index}>
        <div className="media-left media-middle">
          <a href="#">
            <img style={{width: '64px', height: '64px'}} className="media-object" src="../../image/head.jpg" alt="..."/>
          </a>
        </div>
        <div className="media-body">
          <h4 className="media-heading">风之灵</h4>
          {say}
        </div>
      </li>
    });
    return <ul className="media-list">
      {says}
    </ul>
  }
}

