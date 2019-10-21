import React from 'react';
import './MessageForm.css';

import send from '../assets/send_icon.svg';
import api from '../services/api';

export default class MessageForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            message: ''
        };
    }

    handleChange = event => {
        this.setState({ message: event.target.value});
    }

    sendMessage = async event => {
        event.preventDefault();

        const message = {
            message: this.state.message,
            author_id: this.props.userId
        };

        await api.post('messages?stable=true', message);

        this.setState({ message: '' });
    }

    render() {
        return (
            <form id='form' onSubmit={this.sendMessage}>
                <img id='user-avatar' alt='' src={this.props.avatar} />
    
                <input type='text' placeholder='Hello world!' value={this.state.message} onChange={this.handleChange} />
    
                <button id='submit-button' value='Send' onClick={this.sendMessage}>
                    <img id='submit-img' src={send} alt='Send message' />
                </button>
            </form>
        );
    }
}