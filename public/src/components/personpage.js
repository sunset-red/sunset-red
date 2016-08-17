import React, {Component} from "react";
import {Link} from "react-router";
import {Hobbies, City, AgeSegment} from "./select-options";
import ShowFriends from "./show-friends";
import MessageTable from "./person-message";
import MessageBoard from "./message-board";
import ShowMyFriends from "./show-my-friends";
import {Publishform, Dynamics} from "./myhouse";
import ModifyPersonMessage from "./modify-person-message";

export default class PersonPage extends Component {
  constructor() {
    super();
    this.state = {
      myFriends: [],
      friends: [],
      hobbies: [],
      city: '',
      age: '',
      message: {name: '', sex: "", age: "0", city: "", hobbies: []},
      show: "",
      myDynamics: []
    }
  }

  showDynamics(newValue) {
    const time = new Date().toLocaleString();
    if (newValue) {
      $.post('/dynamics', {userId: this.props.userId, dynamic: newValue, time}, (data)=> {
        this.setState({myDynamics: data, show: 'show_myhouse'});
      });
    } else {
      $.post('/dynamics', {userId: this.props.userId}, (data)=> {
        this.setState({myDynamics: data, show: 'show_myhouse'});
      });
    }
  }

  showSelectModal() {
    this.setState({show: "select-modal"})
  }

  HiddenSelectModal() {
    this.setState({show: ""});
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
    const userId = this.props.userId;
    const hobbies = this.state.hobbies;
    const city = this.state.city;
    const age = this.state.age;

    $.ajax({
      type: "POST",
      url: '/friends/' + userId,
      data: JSON.stringify({hobbies, city, age}),
      contentType: "application/json",
      dataType: 'json',
      success: function (friends) {
        this.setState({
          friends,
          show: "find-friends"
        });
      }.bind(this)
    });
  }

  addFriends(index) {
    const userId = this.props.userId;
    const attentionFriend = this.state.friends[index];
    $.post('/attention/' + userId, {attentionFriend}, function (message) {
      alert(message);
    });
  }

  showMyFriends() {
    const userId = this.props.userId;

    $.get('/myFriends/' + userId, (myFriends) => {
      this.setState({
        myFriends,
        show: "show-myFriends"
      });
    })
  }

  selectMessage() {
    $.post('/message', {userId: this.props.userId}, function (n) {
      this.setState({message: n, show: "person-message"})
    }.bind(this));
  }

  leaveWords() {
    this.setState({show: "leave-words"});
  }

  modifyPersonMessage() {
    this.setState({show: "modify-person-message"})
  }

  confirmModify() {
    this.setState({show: "person-message"})
  }

  render() {
    return (
      <div>
        <Header name={this.props.name} userId={this.props.userId}/>
        <Mainer showSelectModal={this.showSelectModal.bind(this)} HiddenSelectModal={this.HiddenSelectModal.bind(this)}
                getHobbies={this.getHobbies.bind(this)} getCity={this.getCity.bind(this)}
                getAge={this.getAge.bind(this)} confirmSelect={this.confirmSelect.bind(this)}
                friends={this.state.friends} message={this.state.message} show={this.state.show}

                leaveWords={this.leaveWords.bind(this)}
                onMessage={this.selectMessage.bind(this)} addFriends={this.addFriends.bind(this)}
                showMyFriends={this.showMyFriends.bind(this)} myFriends={this.state.myFriends}

                mydynamics={this.state.myDynamics} onDynamics={this.showDynamics.bind(this)}
                name={this.props.name}


                onModify={this.modifyPersonMessage.bind(this)}
                confirmModify={this.confirmModify.bind(this)}/>
        <Footer />
      </div>
    )
  }
}

class Header extends Component {
  clearCookie() {
    cookie.remove('userId', {path: '/'});
    Object.keys(cookie.select(/^session.*/i)).forEach(name => cookie.remove(name, {path: '/'}));
  }

  render() {
    return <div className="col-lg-12" id="headerOfPersonPage">
      <div className="col-lg-4">
        <div>
          <img className="img-circle" src="../../image/logo.jpg" id="logo"/>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="col-lg-offset-9" id="welcome">
          <span>欢迎, <em>{this.props.name}</em></span>&nbsp;&nbsp;
          <Link to="/" onClick={this.clearCookie.bind(this)}>退出登录</Link>
        </div>
      </div>
    </div>
  }
}

class Mainer extends Component {
  render() {
    return <div>
      <Left findFriends={this.props.findFriends} onMessage={this.props.onMessage} onLeaveWords={this.props.leaveWords}

            showMyFriends={this.props.showMyFriends} onDynamics={this.props.onDynamics}
            onPersonMessage={this.props.onPersonMessage} showSelectModal={this.props.showSelectModal}/>
      <Right isWantToFindFriends={this.props.isWantToFindFriends} HiddenSelectModal={this.props.HiddenSelectModal}
             getHobbies={this.props.getHobbies} getCity={this.props.getCity}
             getAge={this.props.getAge} confirmSelect={this.props.confirmSelect}
             friends={this.props.friends} addFriends={this.props.addFriends}
             message={this.props.message} show={this.props.show}

             myFriends={this.props.myFriends} myDynamics={this.props.mydynamics} onDynamics={this.props.onDynamics}
             name={this.props.name}/>
      onModify={this.props.onModify} confirmModify={this.props.confirmModify}/>
    </div>
  }
}

class Left extends Component {
  dynamics() {
    this.props.onDynamics();
  }

  toFindFriends() {
    this.props.showSelectModal();
  }

  showMyFriends() {
    this.props.showMyFriends();
  }

  selectMessage() {
    this.props.onMessage();
  }

  toLeaveWords() {
    this.props.onLeaveWords();
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
            <li className="list-group-item"><a onClick={this.dynamics.bind(this)}>我的动态</a></li>
            <li className="list-group-item"><a onClick={this.selectMessage.bind(this)}>个人信息</a></li>
            <li className="list-group-item"><a onClick={this.toLeaveWords.bind(this)}>留言板</a></li>
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
    return <div className="col-lg-8 " id="showMyHouse">

      <div className={this.props.show === "select-modal" ? "" : 'hidden'}>
        <OptionsToFind HiddenSelectModal={this.props.HiddenSelectModal} getHobbies={this.props.getHobbies}
                       getCity={this.props.getCity} getAge={this.props.getAge}
                       confirmSelect={this.props.confirmSelect}/>
      </div>
      <div className={this.props.show === "find-friends" ? "" : 'hidden'}>
        <ShowFriends friends={this.props.friends} addFriends={this.props.addFriends}/>
      </div>
      <div className={this.props.show === "show-myFriends" ? "" : 'hidden'}>
        <ShowMyFriends myFriends={this.props.myFriends}/>
      </div>
      <div className={this.props.show === "person-message" ? "" : 'hidden'}>
        <span>基本资料</span>
        <hr/>
        <div className="col-md-5">
          <MessageTable message={this.props.message} show={this.props.show}
                        onModify={this.props.onModify}/>
        </div>
      </div>
      <div className={this.props.show === "leave-words" ? "" : 'hidden'}>
        <MessageBoard />
      </div>
      <div className={this.props.show === "show_myhouse" ? "" : 'hidden'}>
        <Publishform onDynamics={this.props.onDynamics}/>
        <Dynamics myDynamics={this.props.myDynamics} name={this.props.name}/>
      </div>
      <div className={this.props.show === "modify-person-message" ? "" : 'hidden'}>
        <span>基本资料</span>
        <hr/>
        <div className="col-md-5">
          <ModifyPersonMessage confirmModify={this.props.confirmModify}/>
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

export class OptionsToFind extends Component {
  closeModal() {
    this.props.HiddenSelectModal();
  }

  confirmSelect() {
    this.props.confirmSelect();
    this.closeModal();
  }

  render() {
    return <div className="modal-dialog" id="optionsModal">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true"
                  onClick={this.closeModal.bind(this)}>×
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
