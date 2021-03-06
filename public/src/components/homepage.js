import React, {Component} from "react";
import {Link} from "react-router";
import cookie from "react-cookie";

export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      isExist: false
    }
  }

  onJudge(loginId, password) {
    $.post('/sessions', {'userId': loginId, 'password': password}, (data)=> {

      if (loginId === '') {
        alert('请输入帐号');
      } else if (!password) {
        alert('请输入密码');
      }
      else if (data === false) {
        alert('帐号或密码有误 请重新输入');
      } else {
        this.setState({isExist: true});
      }
    });

    cookie.save('userId', loginId, {path: '/'});
  }

  render() {
    return (
      <div>
        <Header />
        <Middle onJudge={this.onJudge.bind(this)} isExist={this.state.isExist} getName={this.props.getName}/>
        <div className="footer">
          <center>版权所有@sunset</center>
        </div>
      </div>
    )
  }
}

class Header extends Component {
  render() {
    return <div className="page-header">
      <img className="logo" src="../../image/logo.jpg"/>
      <h1>金兰之家&nbsp;&nbsp;&nbsp;
        <small>拥抱美好生活，从金兰之家开始</small>
      </h1>
    </div>;
  }
}

class Middle extends Component {
  render() {
    return <div className="middle">
      <SignIn onJudge={this.props.onJudge.bind(this)} isExist={this.props.isExist}
              getName={this.props.getName}/>

      <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
          <li data-target="#carousel-example-generic" data-slide-to="1"></li>
          <li data-target="#carousel-example-generic" data-slide-to="2"></li>
          <li data-target="#carousel-example-generic" data-slide-to="3"></li>
          <li data-target="#carousel-example-generic" data-slide-to="4"></li>
          <li data-target="#carousel-example-generic" data-slide-to="5"></li>

        </ol>

        <div className="carousel-inner" role="listbox">
          <div className="item active">
            <img src="../../image/background.jpg" alt="..."/>
            <div className="carousel-caption description">
              <span>交流、交友、交往</span><br/>
              <span>我们老年人自己的社交平台</span>
            </div>
          </div>
          <div className="item">
            <img src="../../image/background1.jpg" alt="..."/>
            <div className="carousel-caption description">
              <span>我们老年人自己的社交平台</span><br/>
              <span>交流、交友、交往</span>
            </div>
          </div>
          <div className="item">
            <img src="../../image/background2.jpg" alt="..."/>
            <div className="carousel-caption description">
              <span>我们老年人自己的社交平台</span><br/>
            </div>
          </div>
          <div className="item">
            <img src="../../image/background3.jpg" alt="..."/>
            <div className="carousel-caption description">
              <span>交流、交友、交往</span>
            </div>
          </div>
          <div className="item">
            <img src="../../image/background4.jpg" alt="..."/>
            <div className="carousel-caption description">
              <span>我们老年人自己的社交平台</span><br/>
            </div>
          </div>
          <div className="item">
            <img src="../../image/background5.jpg" alt="..."/>
            <div className="carousel-caption description">
              <span>交流、交友、交往</span>
            </div>
          </div>
        </div>

        <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

    </div>
  }
}

class SignIn extends Component {
  judgeId() {
    const loginId = $('input[name=loginId]').val();
    const password = $('input[name = password]').val();
    this.props.onJudge(loginId, password);
    this.props.getName();
  }

  render() {
    return <div className="signin">
      <div>
        帐号：<input name="loginId" type="text" placeholder="  input your id..."/><br/><br/>
        密码：<input name="password" type="password" placeholder="  input your number..."/>
      </div>

      <center>
        <Link to={this.props.isExist ? '/firstHome' : ''}>
          <button type="submit" onClick={this.judgeId.bind(this)}>
            登录
          </button>
        </Link>
      </center>

      <div className="choose">
        <Link to="/signUpPage">注册</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/forgetPage">忘记密码</Link>
      </div>

    </div>
  }
}

