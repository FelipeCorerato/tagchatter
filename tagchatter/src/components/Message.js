import React from 'react';
import './Message.css';

import unparrot from '../assets/light-parrot.svg';
import parrot from '../assets/parrot.gif';

import api from '../services/api';

export default class Message extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            hasParrot: false
        }
    }

    componentDidMount() {
        this.setState({ hasParrot: this.props.isParrot })
    }

    toggleParrot() {
        this.setState({ hasParrot: !this.state.hasParrot });
    }

    handleParrot = async event => {
        event.preventDefault();

        this.toggleParrot();
        
        const messageId = this.props.id;
        this.state.hasParrot ?
            await api.put(`messages/${messageId}/unparrot`) : 
            await api.put(`messages/${messageId}/parrot`);
    }

    render() {
        return (
            <div id={this.state.hasParrot ? 'marked-message-container' : 'message-container'}>
                <img id='avatar' src={this.props.avatar} alt={this.props.name} />
    
                <div id='message'>
                    <div id='message-header'>
                        <label id='name-text'>{this.props.name}</label>
                        <label id='time-text'>• {this.props.time} •</label>
                        
                        <button id='parrot-button' onClick={this.handleParrot}>
                            <img src={this.state.hasParrot ? parrot : unparrot} id='parrot' alt='' />
                        </button>
                    </div>
    
                    <label id='message-text'>{this.props.message}</label>
                </div>
            </div>
        );
    }
}
