import React, {useState} from 'react'

import './PreAuth.css'

import Login from './Login/Login'
import SignUp from './SignUp/SignUp';

export default function PreAuth(props) {

    const [componentViewName, setComponentViewName] = useState('login');

    let componentViews = [
        [<SignUp setComponentViewName={setComponentViewName} setLoggedInStatusChange={props.setLoggedInStatusChange} />, "signup"],
        [<Login setComponentViewName={setComponentViewName} setLoggedInStatusChange={props.setLoggedInStatusChange}/>, "login"],
    ]

    const renderView = (componentViewName, componentViews) => {
        if (componentViewName) {
            let combo = componentViews.find(combo => combo[1] === componentViewName)
            return combo[0]
        }
    }

    return (
        <div className="page-container">
            <h1><span className="wilson-logo">Wilson</span></h1>
            {renderView(componentViewName, componentViews)}
        </div>
    )
}
