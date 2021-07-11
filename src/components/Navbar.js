import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const xIcon = <svg xmlns="http://www.w3.org/2000/svg" width={30} fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
</svg>;

const menuIcon = <svg xmlns="http://www.w3.org/2000/svg" width={30} fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
</svg>;

const navData = [
    {
        title: 'Home',
        path: '/'
    },
    {
        title: 'Booking',
        path: '/booking'
    },
    {
        title: 'Login',
        path: '/login'
    },
];

const Navbar = () => {

    const [navbarToggle, setNavbarToggle] = useState(false);

    const handleNavbar = () => setNavbarToggle(preValue=> !preValue);

    return (
        <div className="navbar">
            <div className="navbar-container">
                <div className='top-nav'>
                    <h2>
                        <Link to="/">Airland Service BD</Link>
                    </h2>
                    <button onClick={handleNavbar} className="toggler-btn primary-btn">
                        {navbarToggle?xIcon:menuIcon} 
                    </button>
                </div>
                <div className="list-group">
                    <ul className={navbarToggle?"toggler-active":""}>
                        {
                            navData.map(({title, path}) => (
                                <li key={path}>
                                    <NavLink onClick={handleNavbar} to={path} exact activeClassName="active">{title}</NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;