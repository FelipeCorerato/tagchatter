import React from 'react';
import './App.css';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MessageForm from './components/MessageForm';
import Message from './components/Message';

import api from './services/api.js';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {},
			messages: [],
			parrotsCount: 0
		}
	}

	async componentDidMount() {
		const user = await api.get('me');
		this.setState({ user: user.data });

		this.loadMessages(() => {
			var scrollDiv = document.getElementById("messages");
			scrollDiv.scrollTop = scrollDiv.scrollHeight;
		});
		setInterval(this.loadMessages, 3000);

		const parrotsCount = await api.get('messages/parrots-count');
		this.setState({ parrotsCount: parrotsCount.data });
	}

	componentWillUnmount() {
		clearInterval();
	}

	loadMessages = async callback => {
		const messages = await api.get('messages');
		this.setState({ messages: messages.data });

		if (callback) return callback(); 
	}

	formatTimestamp(timestamp) {
		const time = new Date(timestamp);

		var hours = '00';
		var minutes = '00';

		hours = time.getHours();
		minutes = time.getMinutes();

		if (time.getHours() < 10) 
			hours = `0${hours}`;
		if (time.getMinutes() < 10)
			minutes = `0${minutes}`;

		return `${hours}:${minutes}`;
	}

	render() {
		return (
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<Sidebar />
	
				<div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
					<Header parrotsCount={this.state.parrotsCount} ref={this.header} />
	
					<div id='messages'>
						{ this.state.messages.map(message => (
							<Message key={message.id}
								id={message.id}
								avatar={message.author.avatar}
								name={message.author.name}
								time={this.formatTimestamp(message.created_at)}
								isParrot={message.has_parrot}
								message={message.content}
							/>
						)) }
					</div>
	
					<MessageForm avatar={this.state.user.avatar} userId={this.state.user.id} />
				</div>
			</div>
		);
	}
}

export default App;