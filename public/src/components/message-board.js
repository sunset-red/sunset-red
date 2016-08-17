import React, {Component} from "react";
import cookie from 'react-cookie';

export default class MessageBoard extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      words: '',
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
    $.post('/messageBoard', {name, words, userId: this.props.userId}, function (leaveMessage) {
      this.setState({leaveMessage});
    }.bind(this))
  }

  inputName(event) {
    const name = event.target.value;
    this.setState({name})
  }

  inputWords(event) {
    const words = event.target.value;
    this.setState({words})
  }

  render() {
    return <div>
      <div className={this.state.isOwner ? 'hidden' : ''}>
        <MessageForm name={this.state.name} words={this.state.words}
                     toLeaveWord={this.toLeaveWord.bind(this)}
                     inputName={this.inputName.bind(this)}
                     inputWords={this.inputWords.bind(this)}/>
      </div>
      <MessageList leaveMessage={this.state.leaveMessage}/>
    </div>
  }
}

class MessageForm extends Component {
  leaveWord() {
    const name = this.props.name;
    const words = this.props.name;
    if (name && words) {
      this.props.toLeaveWord(name, words);
    } else {
      alert("输入不能为空");
    }
  }

  inputName(event) {
    this.props.inputName(event);
  }

  inputWords(event) {
    this.props.inputWords(event);
  }

  render() {
    return <div className="form-group">
      <div className="board-form">
        <input className="form-control"
               type="text" name="name"
               placeholder="请输入您的姓名"
               onChange={this.inputName.bind(this)}/>
      </div>
      <div>
        <textarea className="form-control"
                  name="words"
                  placeholder="请输入您的留言"
                  onChange={this.inputWords.bind(this)}></textarea>
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
