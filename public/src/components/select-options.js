import React, {Component} from "react";
import Select from 'react-select';

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
