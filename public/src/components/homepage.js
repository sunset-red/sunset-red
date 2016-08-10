import React, {Component} from "react";
import {Link} from "react-router";

export default class HomePage extends Component {
  render() {
    return (
      <div className="homepage">
        <Header />
        <Middle />
        <hr/>
        <center id="footer">版权所有@sunset</center>
      </div>
    )
  }
}

class Header extends Component {
  render() {
    return <div className="header">
      <div className="title">
        <img className="logo" src="../../image/logo.jpg"/>
        <h1>金兰之家</h1>
      </div>
      <span className="language">拥抱美好生活，从金兰之家开始</span>
    </div>
  }
}

class Middle extends Component {
  render() {
    return <div className="middle">
      <SignIn />
      <div className="description">
        <span>交流、交友、交往</span><br/>
        <span>我们老年人自己的社交平台</span>
      </div>

    </div>
  }
}

class SignIn extends Component {
  render() {
    return <div className="signin">
      <div>
        帐号：<input type="text"/><br/><br/>
        密码：<input type="password"/>
      </div>

      <div className="choose">
        <Link to="/signUpPage">注册</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/forget">忘记密码</Link>
      </div>
      <center><Link to="/personPage">登录</Link></center>

    </div>
  }
}

