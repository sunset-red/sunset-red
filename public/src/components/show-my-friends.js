import React, {Component} from "react";

export default class ShowMyFriends extends Component {

  render() {
    const friends = Array.isArray(this.props.myFriends)?this.props.myFriends:[];
    const myFriends = friends.map((friend, index) => {
      return <div className="col-lg-7 col-lg-offset-2" key={index} id="showMyFriends">
        <img src="../../image/logo.jpg" className="sameLine"/>
        <h3 className="sameLine">{friend}</h3>
      </div>
    });
    return <div>
      我的好友
      <hr/>
      {myFriends}
    </div>;
  }
}
