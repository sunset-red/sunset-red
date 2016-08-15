import React, {Component} from "react";

export default class ShowFriends extends Component {
  addAttention(index) {
    this.props.addFriends(index);
  }

  render() {
    const friends = this.props.friends.map((friend, index) => {
      return <div key={index} className="col-lg-10" id="listFriends">
        <img src="../../image/logo.jpg"/>
        <b>{friend}</b>
        <div id="buttonOfAttention">
          <button className="btn btn-default" onClick={this.addAttention.bind(this, index)}>+关注</button>
        </div>
      </div>;
    });
    return <div>
      {friends}
    </div>
  }
}
