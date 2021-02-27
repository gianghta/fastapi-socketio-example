import React, { Component } from 'react';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import TypingIndicator from './components/TypingIndicator';
import WhosOnlineList from './components/WhosOnlineList';
import { io } from 'socket.io-client';

class ChatScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// currentUser: {},
			currentRoom: {},
			messages: [],
			usersWhoAreTyping: []
		};
		this.sendMessage = this.sendMessage.bind(this);
		// this.sendTypingEvent = this.sendTypingEvent.bind(this);

		// Connect to server socket
		const SERVER = 'http://127.0.0.1:5000';
		this.socket = io(SERVER, {
			path: '/ws/socket.io'
		});

		// Socket events
		this.socket.on('connect', () => {
			console.log('Connected!');
		});

		this.socket.on('response', (message) => {
			this.setState({
				messages: [ ...this.state.messages, message ]
			});
		});

		this.socket.on('disconnect', () => {
			console.log('Lost connection to the server.');
		});
	}

	sendMessage(text) {
		this.socket.emit('message', text);
	}

	// sendTypingEvent(message) {
	// 	this.state.currentUser
	// 		.isTypingIn({ roomId: this.state.currentRoom.id })
	// 		.catch((error) => console.error('error', error));
	// }

	// componentDidMount() {
	// 	const chatManager = new Chatkit.ChatManager({
	// 		instanceLocator: 'YOUR INSTANCE LOCATOR',
	// 		userId: this.props.currentUsername,
	// 		tokenProvider: new Chatkit.TokenProvider({
	// 			url: 'http://localhost:3001/authenticate'
	// 		})
	// 	});

	// 	chatManager
	// 		.connect()
	// 		.then((currentUser) => {
	// 			this.setState({ currentUser });
	// 			return currentUser.subscribeToRoom({
	// 				roomId: 10,
	// 				messageLimit: 100,
	// 				hooks: {
	// 					onMessage: (message) => {
	// 						this.setState({
	// 							messages: [ ...this.state.messages, message ]
	// 						});
	// 					},
	// 					onUserStartedTyping: (user) => {
	// 						this.setState({
	// 							usersWhoAreTyping: [ ...this.state.usersWhoAreTyping, user.name ]
	// 						});
	// 					},
	// 					onUserStoppedTyping: (user) => {
	// 						this.setState({
	// 							usersWhoAreTyping: this.state.usersWhoAreTyping.filter((username) => username !== user.name)
	// 						});
	// 					},
	// 					onPresenceChange: () => this.forceUpdate()
	// 				}
	// 			});
	// 		})
	// 		.then((currentRoom) => {
	// 			this.setState({ currentRoom });
	// 		})
	// 		.catch((error) => console.error('error', error));
	// }

	render() {
		const styles = {
			container: {
				height: '100vh',
				display: 'flex',
				flexDirection: 'column'
			},
			chatContainer: {
				display: 'flex',
				flex: 1
			},
			whosOnlineListContainer: {
				width: '300px',
				flex: 'none',
				padding: 20,
				backgroundColor: '#2c303b',
				color: 'white'
			},
			chatListContainer: {
				padding: 20,
				width: '85%',
				display: 'flex',
				flexDirection: 'column'
			}
		};

		return (
			<div style={styles.container}>
				<div style={styles.chatContainer}>
					<aside style={styles.whosOnlineListContainer}>
						<WhosOnlineList currentUser={this.state.currentUser} users={this.state.currentRoom.users} />
					</aside>
					<section style={styles.chatListContainer}>
						<MessageList messages={this.state.messages} style={styles.chatList} />
						<TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
						<SendMessageForm onSubmit={this.sendMessage} />
					</section>
				</div>
			</div>
		);
	}
}

export default ChatScreen;
