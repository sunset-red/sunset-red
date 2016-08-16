import React, {Component} from "react";

export class Publishform extends Component {
  showDynamics() {
    const newValue = $('input[name =inputValue]').val();
    this.props.onDynamics(newValue);
  }

  render() {
    return <div className="input-group" style={{margin: '30px'}}>
      <input type="text" name='inputValue' className="form-control" placeholder="Search for..."/>
      <span className="input-group-btn">
        <button className="btn btn-default" type="button" onClick={this.showDynamics.bind(this)}>发表</button>
      </span>
    </div>
  }
}
export class Dynamics extends Component {
  render() {

    const myDynamics = this.props.myDynamics.map((myDynamic, index)=> {
      return <li className="media" id={index} key={index}>
        <Dynamic name={this.props.name} myDynamic={myDynamic}/>
      </li>
    });
    return <ul className="media-list">
      {myDynamics}
    </ul>
  }
}

class Dynamic extends Component {
  render() {
    const name = this.props.name;
    const myDynamic = this.props.myDynamic;
    return <div>
      <div className="media-left media-middle">
        <a href="#">
          <img style={{width: '64px', height: '64px'}} className="media-object" src="../../image/head.jpg" alt="..."/>
        </a>
      </div>
      < div className="media-body">
        < h4 className="media-heading"> {name}</h4>
        {myDynamic.dynamic}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{myDynamic.time}
      </div>
    </div>
  }
}
