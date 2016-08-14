import React, {Component} from "react";
import {Link} from 'react-router';

import {Hobbies, City, AgeSegment} from './select-options';
import ShowFriends from './show-friends';
import MessageTable from './person-message';

export default class PersonPage extends Component {
  constructor() {
    super();
    this.state = {
      userName: 'jack',
      myFriends: [],
      isWantToFindFriends: false,
      friends: [],
      hobbies: [],
      city: '',
      age: '',
      _id: "12345678900",
      message: {name: '', sex: "", age: "0", city: "", hobbies: []},
      show: ""
    }
  }

  findFriends() {
    this.setState({
      isWantToFindFriends: !this.state.isWantToFindFriends,
      show: "find-friends"
    });
  }

  getHobbies(hobby) {
    const hobbies = hobby.split(',');
    this.setState({hobbies});
  }

  getCity(city) {
    this.setState({city});
  }

  getAge(age) {
    this.setState({age});
  }

  confirmSelect() {
    const hobbies = this.state.hobbies;
    const city = this.state.city;
    const age = this.state.age;

    $.ajax({
      type: "POST",
      url: '/friends',
      data: JSON.stringify({hobbies, city, age}),
      contentType: "application/json",
      dataType: 'json',
      success: function (friends) {
        this.setState({friends});
      }.bind(this)
    });
  }

  addFriends(index) {
    const attentionFriend = this.state.friends[index].name;
    $.post('/attention', {name: 'jack', attentionFriend}, function (message) {
      alert(message);
    });
  }

  showMyFriends() {
    const userName = this.state.userName;

    $.get('/myFriends/' + userName, (myFriends) => {
      this.setState({myFriends}, function () {
        console.log(this.state.myFriends);
      });
    })
  }

  selectMessage() {
    $.post('/message', {_id: this.state._id}, function (n) {
      this.setState({message: n, show: "person-message"})
    }.bind(this));
  }

  render() {
    return (
      <div>
        <Header />
        <Mainer isWantToFindFriends={this.state.isWantToFindFriends} findFriends={this.findFriends.bind(this)}
                getHobbies={this.getHobbies.bind(this)} getCity={this.getCity.bind(this)}
                getAge={this.getAge.bind(this)} confirmSelect={this.confirmSelect.bind(this)}
                friends={this.state.friends} message={this.state.message} show={this.state.show}
                onMessage={this.selectMessage.bind(this)} addFriends={this.addFriends.bind(this)}
                showMyFriends={this.showMyFriends.bind(this)}/>
        <Footer />
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
          <Link to="/">退出</Link>/
          <Link to="/">注销</Link>
        </div>
      </div>
    </div>
  }
}

class Mainer extends Component {
  render() {
    return <div>
      <Left findFriends={this.props.findFriends} onMessage={this.props.onMessage}
            showMyFriends={this.props.showMyFriends}/>
      <Right isWantToFindFriends={this.props.isWantToFindFriends} findFriends={this.props.findFriends}
             getHobbies={this.props.getHobbies} getCity={this.props.getCity}
             getAge={this.props.getAge} confirmSelect={this.props.confirmSelect}
             friends={this.props.friends} addFriends={this.props.addFriends}
             message={this.props.message} show={this.props.show}/>
    </div>
  }
}

class Left extends Component {
  toFindFriends() {
    this.props.findFriends();
  }

  showMyFriends() {
    this.props.showMyFriends();
  }

  selectMessage() {
    this.props.onMessage();
  }

  render() {
    return <div className="col-lg-4">
      <div id="leftOfPersonPage">
        <div>
          <img src="../../image/top-picture.jpg" className="pictureOfPersonPage"/>
        </div>
        <div>
          <ul className="list-group">
            <li className="list-group-item"><a onClick={this.toFindFriends.bind(this)}> 推荐好友</a></li>
            <li className="list-group-item"><a onClick={this.showMyFriends.bind(this)}>我的好友</a></li>
            <li className="list-group-item"><a>我的动态</a></li>
            <li className="list-group-item"><a onClick={this.selectMessage.bind(this)}>个人信息</a></li>
            <li className="list-group-item"><a>修改信息</a></li>
            <li className="list-group-item"><a>留言板</a></li>
          </ul>
        </div>
        <div>
          <img src="../../image/bottom-picture.jpg" className="pictureOfPersonPage"/>
        </div>
      </div>
    </div>
  }
}

class Right extends Component {
  render() {
    return <div className="col-lg-6 rightshow" id="showFriends">
      <div className={this.props.isWantToFindFriends ? '' : 'hidden'}>
        <OptionsToFind findFriends={this.props.findFriends} getHobbies={this.props.getHobbies}
                       getCity={this.props.getCity}
                       getAge={this.props.getAge} confirmSelect={this.props.confirmSelect}/>
      </div>
      <div className={this.props.show === "find-friends" ? "" : 'hidden'}>
        <ShowFriends friends={this.props.friends} addFriends={this.props.addFriends}/>
      </div>
      <div className={this.props.show === "person-message" ? "" : 'hidden'}>
        <span>基本资料</span>
        <hr/>
        <div className="col-md-5">
          <MessageTable message={this.props.message} show={this.props.show}/>
        </div>
      </div>
    </div>
  }
}

class Footer extends Component {
  render() {
    return <div className="col-lg-12" id="footerOfPersonPage">
      版权所有@sunset
    </div>
  }
}

class OptionsToFind extends Component {
  closeModal() {
    this.props.findFriends();
  }

  confirmSelect() {
    this.props.confirmSelect();
    this.closeModal();
  }

  render() {
    return <div className="modal-dialog" id="optionsModal">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal"
                  aria-hidden="true" onClick={this.closeModal.bind(this)}>×
          </button>
          <h4 className="modal-title" id="myModalLabel">
            请选择：
          </h4>
        </div>
        <div>
          <br/>
          <Hobbies getHobbies={this.props.getHobbies}/>
          <br/>
          <City getCity={this.props.getCity}/>
          <br/>
          <AgeSegment getAge={this.props.getAge}/>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closeModal.bind(this)}>
            关闭
          </button>
          <button type="button" className="btn btn-primary" onClick={this.confirmSelect.bind(this)}>
            确定
          </button>
        </div>
      </div>
    </div>
  }
}
