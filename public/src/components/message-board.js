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
    $.post('/messageBoard', {userId: this.props.userId}, function (leaveMessage) {
      this.setState({leaveMessage});
    }.bind(this))
  }

  toLeaveWord(name, words) {
    const date = new Date().toLocaleString();
    $.post('/messageBoard', {name, words, date, userId: this.props.userId}, function (leaveMessage) {
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
    if (name && words) {
      this.props.toLeaveWord(name, words);
    } else {
      alert("输入不能为空");
    }
  }

  render() {
    return <div className="form-group">
      <div className="board-form">
        <input className="form-control" type="text" name="name" placeholder="请输入您的姓名"/>
      </div>
      <div>
        <textarea className="form-control" name="words" placeholder="请输入您的留言"></textarea>
      </div>
      <button className="board-form btn btn-primary" type="submit" onClick={this.leaveWord.bind(this)}>提交</button>
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
