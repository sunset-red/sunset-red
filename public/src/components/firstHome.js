import React, {Component} from "react";
import {Link} from "react-router";

export default class FirstHome extends Component{
  render(){
    return <div>
      <Link to="/personPage">我的主页</Link>
      <Link to="/loveLife">爱生活</Link>
      <Link to="/showHappiness">晒幸福</Link>
      <Link to="/moodDiary">心情日记</Link>
      <Link to="/loveHealth">爱健康</Link>
    </div>
  }
}
