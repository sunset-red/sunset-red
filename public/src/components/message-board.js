import React, {Component} from "react";
import cookie from 'react-cookie';

export default class MessageBoard extends Component {
  constructor() {
    super();
    this.state = {
      leaveMessage: [],
      isOwner: false
    };
  }

  componentDidMount() {

    $.post('/leaveMessage', {_id: cookie.load('userId')}, function (leaveMessage) {
      this.setState({leaveMessage});
    }.bind(this))
  }

  toLeaveWord(name, words) {
    const date = new Date().toLocaleString();
    $.ajax({
      url: '/leaveWord',
      type: 'PUT',
      data: {name, words, date,_id: cookie.load('userId')},
    });
    $.post('/leaveMessage', {_id: cookie.load('userId')}, function (leaveMessage) {
      this.setState({leaveMessage});
    }.bind(this))
  }

  render() {
    return <div>
      <div className={this.state.isOwner ? 'hidden' : ''}>
        <MessageForm toLeaveWord={this.toLeaveWord.bind(this)}/>
      </div>
      <MessageList leaveMessage={this.state.leaveMessage}/>
    </div>
  }
}

class MessageForm extends Component {
  leaveWord() {
    const name = $('input[name=name]').val();
    const words = $('textarea[name=words]').val();
    this.props.toLeaveWord(name, words);
  }

  render() {
    return <div>
      <div className="board-name">
        姓名: <input type="text" name="name"/>
      </div>
      <div className="board-words">
        留言: <textarea cols="30" name="words" rows="2"></textarea>
      </div>
      <button className="btn btn-primary" type="submit" onClick={this.leaveWord.bind(this)}>提交</button>
    </div>
  }
}

class MessageList extends Component {

  render() {
    const leaveMessage = this.props.leaveMessage;
    const messageList = leaveMessage.map((leaveWords, index) => {
      return <div key={index} className="leave-words">
        <div className="leave-name">{leaveWords.name}</div>
        <div className="message">{leaveWords.words}</div>
        <div className="leave-date">{leaveWords.date}</div>
      </div>
    });
    return <div className="message-list"> {messageList.reverse()} </div>
  }
}
