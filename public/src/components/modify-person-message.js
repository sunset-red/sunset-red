import React, {Component} from 'react';
import {Link} from 'react-router';
import Select from 'react-select';
import {Hobbies, City, AgeSegment} from './select-options';

export default class ModifyPersonMessage extends Component {
  constructor() {
    super();
    this.state = {
      _id: '12345678900',
      password: '',
      authention: {
        question: '',
        answer: ''
      },
      hobbies: [],
      city: '',
      age: ''
    };
  }

  setPassword(event) {
    this.setState({password: event.target.value});
  }

  setQuestion(question) {
    this.state.authention.question = question;
  }

  setAnswer(event) {
    this.state.authention.answer = event.target.value;
  }

  setHobbies(hobbies) {
    const hobbys = hobbies.split(',');
    this.setState({hobbies: hobbys});
  }

  setCity(city) {
    this.setState({city});
  }

  setAge(age) {
    this.setState({age});
  }

  modifyMessage() {
    $.ajax({
      type: 'PUT',
      url: '/modifyPersonMessage',
      contentType: 'application/json',
      data: JSON.stringify(this.state),
      dataType: 'json',
    });
    this.props.confirmModify();
  }

  render() {
    return (
      <div>
        <div className="input-group">
          <span className="input-group-addon">密码</span>
          <input type="password" id='pw' className="form-control" onChange={this.setPassword.bind(this)}/>
        </div>
        <br/>
        <SecurityQuestion onChange={this.setQuestion.bind(this)}/>
        <br/>
        <div className="input-group">
          <span className="input-group-addon">密保答案</span>
          <input type="text" id='answer' className="form-control" onChange={this.setAnswer.bind(this)}/>
        </div>
        <br/>
        <Hobbies getHobbies={this.setHobbies.bind(this)}/>
        <br/>
        <City getCity={this.setCity.bind(this)}/>
        <br/>
        <AgeSegment getAge={this.setAge.bind(this)}/>
        <br/>
        <button type="button" className="btn btn-default col-lg-5 col-lg-offset-3">
          <Link to="/personPage">取消修改</Link>
        </button>
        <Link to="/personPage" onClick={this.modifyMessage.bind(this)}>确认修改</Link>

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




