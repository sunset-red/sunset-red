import React, {Component} from "react";

export default class ShowFriends extends Component {
  render() {
    const friends = this.props.friends.map((friend, index) => {
      return <div key={index}>
        <div id="listFriends" className="col-lg-4">
          昵称：{friend.name}
          <div id="buttonOfAttention">
            <button className="btn btn-default">关注</button>
          </div>
        </div>
      </div>
    });
    return <div>
      {friends}
    </div>
  }
}
