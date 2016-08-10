import React, {Component} from "react";
import {Link} from 'react-router';

export default class PersonPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Mainer />
        <Footer />
      </div>
    )
  }
}

class Header extends Component {
  render() {
    return <div className="col-lg-12" id="headerOfPersonPage">
      <div className="col-lg-4">
        <div>
          <img className="img-circle" src="../../image/logo.jpg" id="logo"/>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="col-lg-offset-9" id="welcome">
          <span>欢迎,Tom</span>&nbsp;&nbsp;
          <Link to="/">退出</Link>/
          <Link to="/">注销</Link>
        </div>
      </div>
    </div>
  }
}

class Mainer extends Component {
  render() {
    return <div>
      <Left />
      <Right />
    </div>
  }
}

class Left extends Component {
  render() {
    return <div className="col-lg-4">
      <div id="leftOfPersonPage">
        <div>
          <img src="../../image/top-picture.jpg" className="pictureOfPersonPage"/>
        </div>
        <div>
          <ul className="list-group">
            <li className="list-group-item"><a id="popover">推荐好友</a></li>
            <li className="list-group-item"><a>我的好友</a></li>
            <li className="list-group-item"><a>我的动态</a></li>
            <li className="list-group-item"><a>个人信息</a></li>
            <li className="list-group-item"><a>修改信息</a></li>
            <li className="list-group-item"><a>留言板</a></li>
          </ul>
        </div>
        <div>
          <img src="../../image/bottom-picture.jpg" className="pictureOfPersonPage"/>
        </div>
      </div>
    </div>
  }
}

class Right extends Component {
  render() {
    return <div className="col-lg-8">
    </div>
  }
}

class Footer extends Component {
  render() {
    return <div className="col-lg-12" id="footerOfPersonPage">
      版权所有@sunset
    </div>
  }
}

