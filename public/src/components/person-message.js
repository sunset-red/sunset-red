import React, {Component} from "react";

export default class MessageTable extends Component {
  modifyPersonMessage() {
    this.props.onModify();
  }

  render() {
    const hobbies = Array.isArray(this.props.message.hobbies) ? this.props.message.hobbies.join("\t") : "";
    return (
      <div>
        <div>
          <table width="95%">
            <tbody>
            <tr>
              <td>姓名</td>
              <td>{this.props.message.name}</td>
            </tr>
            <tr>
              <td>性别</td>
              <td>{this.props.message.sex}</td>
            </tr>
            <tr>
              <td>年龄</td>
              <td>{this.props.message.age}</td>
            </tr>
            <tr>
              <td>城市</td>
              <td>{this.props.message.city}</td>
            </tr>
            <tr>
              <td>爱好</td>
              <td>{hobbies}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <button className="btn btn-default" onClick={this.modifyPersonMessage.bind(this)}>修改信息</button>
      </div>
    );
  }
}
