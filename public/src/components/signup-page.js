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
          兴趣<Select options={[{value: 'one', label: 'One'},
          {value: 'two', label: 'Two'},
          {value: 'three', label: 'Three'},
          {value: 'a', label: 'Apple'},
          {value: 'b', label: 'Banana'},
          {value: 'o', label: 'Orange'},
          {value: 'm', label: 'Mango'}]}/>
          城市<Select options={[{value: 'one', label: '西安'}]}/>
          密码 <input type="password" />
          确认密码 <input type="password" />
          <Link to="/">返回</Link>
          <Link to="/personPage">注册</Link>
        </div>
      </div>
    )
  }
}

