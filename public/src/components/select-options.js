import React, {Component} from "react";
import Select from 'react-select';

export class Hobbies extends Component {
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
      hobbies: []
    }
  }

  setHobbies(hobbies) {
    this.setState({hobbies});
    this.props.getHoobies(hobbies);
  }

  render() {
    return <div className="input-group">
      <span className="input-group-addon">兴趣</span>
      <Select multi simpleValue disabled={this.state.disabled} value={this.state.hobbies}
              placeholder="Select your favourite(s)" options={this.state.options}
              onChange={this.setHobbies.bind(this)}/>
    </div>
  }
}

export class City extends Component {
  constructor() {
    super();
    this.state = {
      city: ''
    }
  }

  setCity(city) {
    this.setState({city});
    this.props.getCity(city.label);
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

export class AgeSegment extends Component {
  constructor() {
    super();
    this.state = {
      age: ''
    }
  }

  setAge(age) {
    this.setState({age});
    this.props.getAge(age.label);
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
