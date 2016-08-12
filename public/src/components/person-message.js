import React, {Component} from "react";

export default class MessageTable extends Component {

  render() {
    const hobbies = this.props.message.hobbies.join("\t");
    return (
      <div>
        <div>
          <table width="65%">
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


      </div>
    );
  }
}
