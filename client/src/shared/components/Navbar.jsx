import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector } from '../../selectors/current';
import { requestLogout } from '../../pages/Auth/saga';

function Navbar() {
    // dispatch
    const dispatch = useDispatch();

    const user = useSelector(currentUserSelector);

    // handlers
    const handleLogout = () => {
        dispatch(requestLogout());
    }
    return (
        <header className='navbar-container'>
            <nav className="navbar">
                <div className="left">
                    <Link to={'/'}>
                        <div className="logo">react-sails-template</div>
                    </Link>
                </div>
                <div className="right">
                    {user ? (
                        <div className="auth-link">
                            <span className="primary">Welcome, {user.name}</span>
                            <button className='btn-danger' onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <div className='navbar-links'>
                            <Link to={'/auth'} className="navbar-links-link">
                                Login
                            </Link>
                            <Link to={'/auth/register'} className="navbar-links-link">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar