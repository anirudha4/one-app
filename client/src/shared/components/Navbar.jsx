import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector } from '../../selectors/current';
import { requestLogout } from '../../shared/slices/auth';

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
            <nav className="flex justify-between p-3 shadow items-center">
                <NavLink
                    to={'/'}
                    className="text-gray-700 h-fit"
                >
                    OneApp
                </NavLink>
                <div className="flex align-middle gap-3">
                    {user ? (
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    ) : (
                        <div className="flex align-middle gap-2">
                            <Link to={'/auth'} className="btn btn-primary-fill">Register</Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar