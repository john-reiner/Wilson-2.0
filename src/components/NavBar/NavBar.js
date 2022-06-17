import React from 'react';
import './Navbar.css'

const NavBar = (props) => {

    const renderLogin = () => {
        if (!props.loggedIn) {
            return (
                <div className="navbar-right">
                    <li className="item button" onClick={() => props.setAppComponent("signup")}>Sign Up</li>
                    <li className="item button" onClick={() => props.setAppComponent("login")}>Login</li>
                </div>
            )
        } else {
            return (
                <div className="navbar-right">
                    <li className="item button" onClick={props.logout}>Logout</li>
                </div>
            )
        }
    }



    return (
        <nav>
            <ul className='navbar-menu'>
                <li id="logo" onClick={() => props.setAppComponent("landing")}>Wilson</li>
                {renderLogin()}
            </ul>
        </nav>
    );
};
export default NavBar;