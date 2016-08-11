import React, {Component} from "react";
import {Link} from 'react-router';
import Select from 'react-select';

export default class SignUpPage extends Component {
  render() {
    return (
      <div id="signUpBackground" className="panel panel-body">
        <Header/>
        <div className="panel panel-default col-md-6 col-md-offset-3" id="signUpPanel">

          <div className="input-group">
            <span className="input-group-addon">手机号</span>
            <input type="text" className="form-control"/>
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon">昵称</span>
            <input type="text" className="form-control"/>
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon">性别</span>
            <input id="signUpBoy" type="radio" name="sex"/>男
            <input id="signUpGirl" type="radio" name="sex"/>女
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon">密码</span>
            <input type="password" className="form-control"/>
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon">确认密码</span>
            <input type="password" className="form-control"/>
          </div>
          <br/>
          <AgeSelectField/>
          <br/>
          <HobbyMultiSelectField />
          <br/>
          <CitySelectField/>
          <br/>

          <div className="col-lg-5 col-lg-offset-3">
            <Link to="/">返回</Link>
          </div>
          <div className="col-lg-offset-8">
            <Link to="/personPage">注册</Link>
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



export class HobbyMultiSelectField extends Component {
  constructor() {
    super();
    this.state =
    {
      disabled: false,
      options: [
        {label: '下棋', value: 'chess'},
        {label: '打太极', value: 'taiji'},
        {label: '打牌', value: 'cards'},
        {label: '跳广场舞', value: 'dance'},
      ],
      hobbies: [],
    }
  }

  render() {
    return <div className="input-group">
      <span className="input-group-addon">兴趣</span>
      <Select multi simpleValue disabled={this.state.disabled} value={this.state.hobbies}
              placeholder="Select your favourite(s)" options={this.state.options}
              onChange={this.setHobbies.bind(this)}/>
    </div>
  }

  setHobbies(hobbies) {
    this.setState({hobbies});
  }
}

export class CitySelectField extends Component {
  constructor() {
    super();
    this.state = {
      city: ''
    }
  }

  setCity(city) {
    this.setState({city});
  }

  render() {
    const options = [
      {label: '西安', city: 'basic'},
      {label: '北京', city: 'premium'},
      {label: '沈阳', city: 'pro'},
    ];
    return <div className="input-group">
      <span className="input-group-addon">城市</span>
      {this.props.label}
      <Select
        placeholder="Select your province"
        options={options}
        optionRenderer={this.renderOption}
        onChange={this.setCity.bind(this)}
        value={this.state.city}
      />
    </div>
  }
}

export class AgeSelectField extends Component {
  constructor() {
    super();
    this.state = {
      age: ''
    }
  }

  setAge(age) {
    this.setState({age});
  }

  render() {
    const options = [
      {label: '55~60', age: 'basic'},
      {label: '60~65', age: 'premium'},
      {label: '65~70', age: 'pro'}
    ];
    return <div className="input-group">
      <span className="input-group-addon">年龄段</span>
      {this.props.label}
      <Select
        placeholder="Select age range"
        options={options}
        optionRenderer={this.renderOption}
        onChange={this.setAge.bind(this)}
        value={this.state.age}
      />
    </div>
  }
}
