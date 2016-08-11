import React, {Component} from "react";
import {Link} from 'react-router';

export default class PersonPage extends Component {
  constructor() {
    super();
    this.state = {
      isWantToFindFriends: false
    }
  }

  findFriends() {
    this.setState({isWantToFindFriends: !this.state.isWantToFindFriends});
  }

  render() {
    return (
      <div>
        <Header />
        <Mainer isWantToFindFriends={this.state.isWantToFindFriends}
                findFriends={this.findFriends.bind(this)}/>
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
      <Left findFriends={this.props.findFriends}/>
      <Right isWantToFindFriends={this.props.isWantToFindFriends} findFriends={this.props.findFriends}/>
    </div>
  }
}

class Left extends Component {
  toFindFriends() {
    this.props.findFriends();
  }

  render() {
    return <div className="col-lg-4">
      <div id="leftOfPersonPage">
        <div>
          <img src="../../image/top-picture.jpg" className="pictureOfPersonPage"/>
        </div>
        <div>
          <ul className="list-group">
            <li className="list-group-item"><a onClick={this.toFindFriends.bind(this)}> 推荐好友</a></li>
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
      <div className={this.props.isWantToFindFriends ? '' : 'hidden'}>
        <OptionsToFind findFriends={this.props.findFriends}/>
      </div>
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

class OptionsToFind extends Component {
  closeModal() {
    this.props.findFriends();
  }

  render() {
    return <div className="modal-dialog" id="optionsModal">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal"
                  aria-hidden="true" onClick={this.closeModal.bind(this)}>×
          </button>
          <h4 className="modal-title" id="myModalLabel">
            请选择：
          </h4>
        </div>
        <div className="col-sm-offset-1">
          <form className="form-inline" role="form">
            <div>
              城市：
              <input type="checkbox"/>上海
              <input type="checkbox"/>北京
            </div>
            <div>
              年龄段：
              <input type="checkbox"/>55~60
              <input type="checkbox"/>60~65
              <input type="checkbox"/>65~70
            </div>
            <div>
              兴趣爱好：
              <input type="checkbox"/>运动
              <input type="checkbox"/>下棋
              <input type="checkbox"/>看书
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default"
                  data-dismiss="modal">关闭
          </button>
          <button type="button" className="btn btn-primary">
            确定
          </button>
        </div>
      </div>
    </div>
  }
}

