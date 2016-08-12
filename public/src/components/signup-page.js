import React, {Component} from "react";
import {Link} from 'react-router';
import Select from 'react-select';

export default class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      '_id': '',
      name: '',
      sex: '',
      pw: '',
      cfpw: '',
      hobbies: [],
      age: '',
      city: ''
    }
  }

  handleId(event) {
    this.setState({'_id': event.target.value})
  }

  handleName(event) {
    this.setState({name: event.target.value})
  }

  handlePassword(event) {
    this.setState({pw: event.target.value})
  }

  confirmPassword(event) {
    this.setState({cfpw: event.target.value})
  }

  handleHobby(hobbies) {
    this.setState({hobbies: hobbies})
  }

  handleAge(age) {
    this.setState({age: age})
  }

  handleCity(city) {
    this.setState({city: city})
  }

  sendData() {
    this.state.sex = $("input[name=sex]:checked").val();

    $.post('/', this.state, (data)=> {
      //  console.log(data);
    })
  }

  render() {
    return (
      <div id="signUpBackground" className="panel panel-body">
        <Header/>
        <div className="panel panel-default col-md-6 col-md-offset-3" id="signUpPanel">

          <div className="input-group">
            <span className="input-group-addon">手机号</span>
            <input type="text" className="form-control" onChange={this.handleId.bind(this, event)}/>
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon">昵称</span>
            <input type="text" className="form-control" onChange={this.handleName.bind(this, event)}/>
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon">性别</span>
            <input id="signUpBoy" type="radio" name="sex" value='男'/>男
            <input id="signUpGirl" type="radio" name="sex" value='女'/>女
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon">密码</span>
            <input type="password" className="form-control" onChange={this.handlePassword.bind(this, event)}/>
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon">确认密码</span>
            <input type="password" className="form-control" onChange={this.confirmPassword.bind(this, event)}/>
          </div>
          <br/>
          <AgeSelectField onChange={this.handleAge.bind(this)}/>
          <br/>
          <HobbyMultiSelectField onChange={this.handleHobby.bind(this)}/>
          <br/>
          <CitySelectField onChange={this.handleCity.bind(this)}/>
          <br/>

          <div className="col-lg-5 col-lg-offset-3">
            <Link to="/">返回</Link>
          </div>
          <div className="col-lg-offset-8">
            <Link to="/personPage" onClick={this.sendData.bind(this)}>注册</Link>
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
        {label: '下棋', value: '下棋'},
        {label: '打太极', value: '打太极'},
        {label: '打牌', value: '打牌'},
        {label: '跳广场舞', value: '跳广场舞'},
      ],
      value: []
    };
  }

  handleSelectChange(value) {
    this.setState({value});
  }

  render() {
    return (<div className='section'>
      <Select multi-simpleValue disabled={this.state.disabled} value={this.state.value}
              placeholder="Select your favourite(s)" options={this.state.options}
              onChange={this.handleSelectChange}/>
    </div>)
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
    this.props.onChange(city);
  }

  render() {
    const options = [
      {label: '西安'},
      {label: '北京'},
      {label: '沈阳'},
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
    this.props.onChange(age)
  }

  render() {
    const options = [
      {label: '55~60'},
      {label: '60~65'},
      {label: '65~70'}
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
