import React from 'react';
import './Sidebar.css';

import logo from '../assets/logo.png';

export default function Sidebar() {
    return (
        <aside>
            <div>
                <img src={logo} alt="TagChatter" id='logo' />
            </div>
        </aside>
    );
}