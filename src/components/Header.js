import React from 'react';
import './Header.css';

import parrot from '../assets/light-parrot.svg';
import api from '../services/api';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            parrotsCount: 0
        };
    }

    componentDidMount() {
        setInterval(this.loadParrotsCount, 250);
        this.loadParrotsCount();
    }

    componentWillUnmount() {
        clearInterval();        
    }

    loadParrotsCount = async () => {
        var count = await api.get('messages/parrots-count');
        this.setState({ parrotsCount: count.data });
    }

    render() {
        return (
            <header>
                <div id='channel-name'>
                    <h2 id='channel-name-text'>#tagchatter</h2>
                </div>
    
                <div id='parrots-count'>
                    <img src={parrot} alt='parrot' style={{ height: 36, alignSelf: 'center', marginRight: '10px' }} />
                    <h2 id='parrots-count-number'> {this.state.parrotsCount} </h2>
                </div>
            </header>
        );
    }
}