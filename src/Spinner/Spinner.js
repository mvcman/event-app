import React from 'react';
import './Style.css';

export default function Spinner(){
    return (
        <div className="main">
            <div className="lds-dual-ring"></div>
        </div>
    );
}