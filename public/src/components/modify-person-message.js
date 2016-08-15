import React,{Component} from 'react';
import {Link} from 'react-router';
import Select from 'react-select';

export default class ModifyPersonMessage extends Component {
  render(){
    return (
      <div>
        <div className="input-group">
          <span className="input-group-addon">密码</span>
          <input type="password" id='pw' className="form-control" />
        </div>
        <br/>
        <SecurityQuestion />
        <br/>
        <div className="input-group">
          <span className="input-group-addon">密保答案</span>
          <input type="text" id='answer' className="form-control" />
        </div>
        <br/>
        <Hobbies />
        <br/>
        <City />
        <br/>
        <AgeSegment />
        <br/>

        <button type="button" className="btn btn-default col-lg-5 col-lg-offset-3">
          <Link to="/personPage">取消修改</Link>
        </button>
        <button type="button" className="btn btn-primary col-lg-offset-8">
          <Link to="/personPage" >确认修改</Link>
        </button>
      </div>
    )
  }
}

export class SecurityQuestion extends Component {
  constructor() {
    super();
    this.state = {
      question: ''
    }
  }

  setQuestion(question) {
    this.setState({question});
    this.props.onChange(question.label);
  }

  render() {
    const options = [
      {label: '您的姓名是？'},
      {label: '您的生日是？'},
      {label: '您配偶的姓名是？'},
      {label: '您配偶的生日是？'},
      {label: '您母亲的姓名是？'},
      {label: '您母亲的生日是？'},
      {label: '您父亲的姓名是？'},
      {label: '您父亲的生日是？'},
      {label: '您初中班主任的名字是？'},
      {label: '您高中班主任的名字是？'},
      {label: '您的学号（或工号）是？'}
    ];
    return <div className="input-group">
      <span className="input-group-addon">密报问题</span>
      {this.props.label}
      <Select
        placeholder="Select your security question"
        options={options}
        optionRenderer={this.renderOption}
        onChange={this.setQuestion.bind(this)}
        value={this.state.question}
      />
    </div>
  }
}

export class Hobbies extends Component {
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
      hobbies: []
    }
  }

  setHobbies(hobbies) {
    this.setState({hobbies});
    this.props.getHobbies(hobbies);
  }

  render() {
    return <div className="input-group">
      <span className="input-group-addon">兴趣</span>
      <Select multi simpleValue disabled={this.state.disabled} value={this.state.hobbies}
              placeholder="请选择您的兴趣爱好" options={this.state.options}
              onChange={this.setHobbies.bind(this)}/>
    </div>
  }
}

export class City extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    }
  }

  setCity(value) {
    this.setState({value});
    this.props.getCity(value.city);
  }

  render() {
    const options = [
      {label: '西安', city: '西安'},
      {label: '北京', city: '北京'},
      {label: '沈阳', city: '沈阳'},
    ];
    return <div className="input-group">
      <span className="input-group-addon">城市</span>
      {this.props.label}
      <Select
        placeholder="请选择城市"
        options={options}
        optionRenderer={this.renderOption}
        onChange={this.setCity.bind(this)}
        value={this.state.value}
      />
    </div>
  }
}

export class AgeSegment extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    }
  }

  setAge(value) {
    this.setState({value});
    this.props.getAge(value.age);
  }

  render() {
    const options = [
      {label: '55~60', age: '55~60'},
      {label: '60~65', age: '60~65'},
      {label: '65~70', age: '65~70'}
    ];
    return <div className="input-group">
      <span className="input-group-addon">年龄段</span>
      {this.props.label}
      <Select
        placeholder="请选择年龄范围"
        options={options}
        optionRenderer={this.renderOption}
        onChange={this.setAge.bind(this)}
        value={this.state.value}
      />
    </div>
  }
}





