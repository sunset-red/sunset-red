import React, {Component} from "react";
import {Link} from 'react-router';

import Select from 'react-select';
export default class SignUpPage extends Component {
  render() {
    return (
      <div>
        <div className="panel panel-default">
          <img className="img-circle" src="../../logo.jpg" id="logo"/>
          <label id="name">欢迎加入老年俱乐部</label>
        </div>
        <div className="panel panel-default col-md-6 col-md-offset-3" id="panel1">

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
            <input type="radio" name="sex"/>男<input type="radio" name="sex"/>女
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon">年龄段</span>
            <select>
              <option value="vo">50-55</option>
              <option value="saab">55-60</option>
              <option value="opel">60-65</option>
              <option value="audi">65-70</option>
            </select>
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon">兴趣</span>
            <Select options={[{value: 'one', label: 'One'},
              {value: 'two', label: 'Two'},
              {value: 'three', label: 'Three'},
              {value: 'a', label: 'Apple'},
              {value: 'b', label: 'Banana'},
              {value: 'o', label: 'Orange'},
              {value: 'm', label: 'Mango'}]}/>
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon">城市</span>
            <Select options={[{value: 'one', label: '西安'}]}/>
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
    return <div className="col-lg-12" id="headerOfPersonPage">
      <div className="col-lg-4">
        <div>
          <img className="img-circle" src="../../image/logo.jpg" id="logo"/>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="col-lg-offset-9" id="welcome">
          <span>欢迎,Tom</span>&nbsp;&nbsp;
        </div>
      </div>
    </div>
  }
}


