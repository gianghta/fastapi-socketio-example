import React, { Component } from 'react';

class MessagesList extends Component {
	render() {
		const styles = {
			container: {
				overflowY: 'scroll',
				flex: 1
			},
			ul: {
				listStyle: 'none'
			},
			li: {
				marginTop: 13,
				marginBottom: 13
			},
			senderUsername: {
				fontWeight: 'bold'
			},
			message: { fontSize: 15 }
		};

		if (this.props.messages) {
			var renderMessages = this.props.messages.map((message, index) => (
				<li key={index} style={styles.li}>
					<div>
						<span style={styles.senderUsername}>Someone</span>{' '}
					</div>
					<p style={styles.message}>{message}</p>
				</li>
			));
		}

		return (
			<div
				style={{
					...this.props.style,
					...styles.container
				}}
			>
				<ul style={styles.ul}>
					{/* {this.props.messages.map((message, index) => (
						<li key={index} style={styles.li}>
							<div>
								<span style={styles.senderUsername}>{message.senderId}</span>{' '}
								<span style={styles.senderUsername}>Someone</span>{' '}
							</div>
							<p style={styles.message}>{message.text}</p>
							<p style={styles.message}>{message}</p>
						</li>
					))} */}
					{renderMessages}
				</ul>
			</div>
		);
	}
}

export default MessagesList;
