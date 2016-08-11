import React, {Component} from "react";
import {Link} from 'react-router';

import Select from 'react-select'
export default class SignUpPage extends Component {
      render() {
    return (
      <div>
        <div>
          手机号<input type="text" />
          昵称 <input type="text" />
          性别 <input type="radio" name="sex"/>男<input type="radio" name="sex"/>女
          年龄段<select>
          <option value="vo">50-55</option>
          <option value="saab">55-60</option>
          <option value="opel">60-65</option>
          <option value="audi">65-70</option>
        </select>
          兴趣<HobbyMultiSelectField />
          城市<CitySelectField/>
          密码 <input type="password" />
          确认密码 <input type="password" />
          <Link to="/">返回</Link>
          <Link to="/personPage">注册</Link>
        </div>
      </div>
    )
  }
}

const HobbyMultiSelectField = React.createClass({
  getInitialState(){
    return {
      disabled: false,
      options: [
        { label: '下棋', value: 'chess' },
      	{ label: '打太极', value: 'taiji' },
      	{ label: '打牌', value: 'cards' },
      	{ label: '跳广场舞', value: 'dance' },
      ],
      value: []
    };
  },
  handleSelectChange (value) {
		this.setState({ value });
	},
  render:function () {
    return (<div className='section'>
    <Select multi simpleValue disabled={this.state.disabled} value={this.state.value}
     placeholder="Select your favourite(s)" options={this.state.options}
     onChange={this.handleSelectChange} />
  </div>)
  }
})

const CitySelectField = React.createClass({
  getInitialState:function(){
  return {
    value:''
  }
},
  setValue (value) {
  this.setState({ value });
},
  render:function () {
  var options = [
    { label: '西安', value: 'basic'},
    { label: '北京', value: 'premium'},
    { label: '沈阳', value: 'pro' },
  ];
  return (
    <div className="section">
      <h3 className="section-heading">{this.props.label}</h3>
      <Select
        placeholder="Select your province"
        options={options}
        optionRenderer={this.renderOption}
        onChange={this.setValue}
        value={this.state.value}
        />
    </div>
  );
 }
})
