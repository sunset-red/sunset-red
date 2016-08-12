import React, {Component} from "react";
import {Link} from 'react-router';
import Select from 'react-select';

export default class SignUpPage extends Component {
  constructor(props){
    super(props);
    this.state = {
          '_id':'',
          name:'',
          sex:'',
          password:'',
          cfpw:'',
          hobbies:[],
          age:'',
          city:''
    }
  }

  handleId(event){
    this.setState({'_id':event.target.value})
  }

  verifyId(event){
    if(event.key=='Enter' || event.keycode==9){
      const regu = /^1\d{10}$/;
      const re = new RegExp(regu);
      if(re.test(this.state._id)){
          $("input[id=nickname]").focus();
      }else{
        alert('请填写有效的11位手机号码');
      }
    }
  }

  handleName(event){
    this.setState({name:event.target.value})
  }

  handlePassword(event){
    this.setState({password:event.target.value})
  }

  verifyPw(event){
    if(event.key=='Enter' || event.keycode==9){
      const regu = /^[0-9A-Za-z]{6,20}$/;
      const re = new RegExp(regu);

      if(re.test(this.state.password)){
          $("input[id=cfpw]").focus();
      }else{
        alert('请输入6-20个数字、字母(区分大小写)');
      }
    }
  }

  confirmPassword(event){
    this.setState({cfpw:event.target.value})
  }
  confirmPw(event){
    if(event.key=='Enter'|| event.keycode==9){
      if(this.state.cfpw === this.state.password){
        $("input[id=age]").focus();
      }else{
        alert("确认密码和密码不符合");
        $("input[id=cfpw]").val('');
      }
    }
  }

  handleHobby(hobbies){
    this.setState({hobbies:hobbies})
  }

  handleAge(age){
    this.setState({age:age})
  }

  handleCity(city){
    this.setState({city:city})
  }

  sendData(){
    this.state.sex = $("input[name=sex]:checked").val();
    const messages = {
      '_id':this.state._id,
      name:this.state.name,
      sex:this.state.sex,
      password:this.state.password,
      hobbies:this.state.hobbies,
      age:this.state.age,
      city:this.state.city
    }

    $.post('/', messages, (data)=>{
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
            <input type="text" id='phoneNumber' className="form-control" onChange={this.handleId.bind(this)} onKeyPress={this.verifyId.bind(this)}/>
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon">昵称</span>
            <input type="text" id='nickname' className="form-control" onChange={this.handleName.bind(this, event)}/>
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
            <input type="password" id='pw' className="form-control" onChange={this.handlePassword.bind(this, event)} onKeyPress={this.verifyPw.bind(this)}/>
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon">确认密码</span>
            <input type="password" id='cfpw' className="form-control" onChange={this.confirmPassword.bind(this, event)} onKeyPress={this.confirmPw.bind(this)}/>
          </div>
          <br/>
          <AgeSelectField id='age' onChange={this.handleAge.bind(this)}/>
          <br/>
          <HobbyMultiSelectField id='hobby' onChange={this.handleHobby.bind(this)}/>
          <br/>
          <CitySelectField id='city' onChange={this.handleCity.bind(this)}/>
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
    this.props.onChange(hobbies);
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
    console.log(city)
    this.props.onChange(city.label);
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
    this.props.onChange(age.label)
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
