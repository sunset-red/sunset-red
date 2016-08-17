import React, {Component} from "react";
import {Link} from 'react-router';
import {Hobbies, City, AgeSegment} from './select-options';

import cookie from 'react-cookie';

export default class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      name: '',
      sex: '',
      password: '',
      cfpw: '',
      hobbies: [],
      age: '',
      city: '',
      flag: false
    }
  }

  setId(event) {
    this.setState({userId: event.target.value});
  }

  handleId() {
    $.post('/passwordVerify', {userId: this.state.userId}, (data)=> {
      if (data.length != 0) {
        alert('此手机号已注册！');
        this.setState({flag: false})
      } else {
        this.setState({flag: true});
        const regu = /^1\d{10}$/;
        const re = new RegExp(regu);
        if (re.test(this.state.userId)) {
        } else {
          alert('请填写有效的11位手机号码');
          this.setState({flag: false})
        }
      }
    });
  }

  verifyId(event) {
    this.setState({flag: true});
    if (event.keyCode == 9) {
      this.handleId();
    }
  }

  verifyIdOnMouse() {
    this.setState({flag: true});
    this.handleId();
  }

  setName(event) {
    this.setState({name: event.target.value})
  }

  handleName() {
    $.post('/nameVerify', {name: this.state.name}, (data)=> {
      if (data.length != 0) {
        alert('此昵称已使用！');
        this.setState({flag: false})
      }
    });
  }

  verifyName(event) {
    if (event.keyCode == 9) {
      this.handleName();
    }
  }

  verifyNameOnMouse() {
    this.handleName();
  }

  setPassword(event) {
    this.setState({password: event.target.value})
  }

  handlePassword() {
    const regu = /^[0-9A-Za-z]{6,20}$/;
    const re = new RegExp(regu);
    if (re.test(this.state.password)) {
    } else {
      alert('请输入6-20个数字、字母(区分大小写)');
      this.setState({flag: false})
    }
  }

  verifyPw(event) {
    if (event.keyCode == 9) {
      this.handlePassword();
    }
  }

  verifyPwOnMouse() {
    this.handlePassword();
  }

  setConfirmPassword(event) {
    this.setState({cfpw: event.target.value})
  }

  handleConfirmPassword() {
    if (this.state.cfpw != this.state.password) {
      alert("确认密码和密码不符合");
      this.setState({flag: false});
      $("input[id=cfpw]").val('');
      $("input[id=cfpw]").focus();
      event.preventDefault();
    }
  }

  confirmPw(event) {
    if (event.keyCode == 9) {
      this.handleConfirmPassword();
    }
  }

  confirmPwOnMouse() {
    this.setState({flag: true});
    this.handleConfirmPassword();
  }

  setHobby(hobbies) {
    const hobbys = hobbies.split(',');
    this.setState({hobbies: hobbys})
  }

  setAge(age) {
    this.setState({age: age})
  }

  setCity(city) {
    this.setState({city: city})
  }

  sendData() {
    this.state.sex = $("input[name=sex]:checked").val();
    const messages = {
      userId: this.state.userId,
      name: this.state.name,
      sex: this.state.sex,
      password: this.state.password,
      hobbies: this.state.hobbies,
      age: this.state.age,
      city: this.state.city
    };
    if (this.state.flag == true) {
      $.ajax({
        type: 'POST',
        url: '/signup',
        contentType: 'application/json',
        data: JSON.stringify(messages),
        dataType: 'json'
      });
    } else {
      alert('注册失败！')
    }

    cookie.save('userId', messages.userId, {path: '/'});
    this.props.getName();
  }

  render() {
    return (
      <div id="signUpBackground" className="panel panel-body">
        <Header/>
        <div className="panel panel-default col-md-6 col-md-offset-3" id="signUpPanel">

          <div className="input-group">
            <span className="input-group-addon">手机号</span>
            <input type="text" id='phoneNumber' className="form-control" onChange={this.setId.bind(this)}
                   onKeyDown={this.verifyId.bind(this)}/>
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon">昵称</span>
            <input type="text" id='nickname' className="form-control" onChange={this.setName.bind(this, event)}
                   onKeyDown={this.verifyName.bind(this)} onClick={this.verifyIdOnMouse.bind(this)}/>
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon">性别</span>
            <input id="signUpBoy" type="radio" name="sex" value='男' onClick={this.verifyNameOnMouse.bind(this)}/>男
            <input id="signUpGirl" type="radio" name="sex" value='女' onClick={this.verifyNameOnMouse.bind(this)}/>女
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon">密码</span>
            <input type="password" id='pw' className="form-control" onChange={this.setPassword.bind(this, event)}
                   onKeyDown={this.verifyPw.bind(this)}/>
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon">确认密码</span>
            <input type="password" id='cfpw' className="form-control"
                   onChange={this.setConfirmPassword.bind(this, event)}
                   onKeyDown={this.confirmPw.bind(this)} onClick={this.verifyPwOnMouse.bind(this)}/>
          </div>
          <br/>
          <AgeSegment id='age' getAge={this.setAge.bind(this)} onClick={this.confirmPwOnMouse.bind(this)}/>
          <br/>
          <Hobbies id='hobby' getHobbies={this.setHobby.bind(this)}/>
          <br/>
          <City id='city' getCity={this.setCity.bind(this)}/>
          <br/>
          <div className="col-lg-5 col-lg-offset-3">
            <Link to="/">返回</Link>
          </div>
          <div className="col-lg-offset-8">
            <Link to={this.state.flag ? "/personPage" : "/signUpPage"} onClick={this.sendData.bind(this)}>注册</Link>
          </div>
        </div>
      </div>
    )
  }
}
class Header extends Component {
  render() {
    return <div className="signUpHeader">
      <img className="signUpLogo" src="../../image/logo.jpg"/>
      <h1>欢迎注册金兰之家&nbsp;&nbsp;&nbsp;
        <small>拥抱美好生活，从金兰之家开始</small>
      </h1>
    </div>
  }
}
