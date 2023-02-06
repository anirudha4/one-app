import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { requestLogout } from '../slices/auth';
import { currentUserSelector } from '../../selectors/current';
import { allMembersSelector } from '../../selectors/all';

function Header() {
    const dispatch = useDispatch();
    const user = useSelector(currentUserSelector)
    const members = useSelector(allMembersSelector);
    const handleLogout = () => {
        dispatch(requestLogout());
    }
    return (
        <div className="min-h-[50px] px-3 border-b border-slate-200 bg-white">
            <div className="flex justify-between items-center h-full">
                <div className="flex items-center">
                    {/* {members.map((member, idx) => {
                        return (
                            <div
                                title={member.name || member.email}
                                style={{ backgroundColor: member.color, color: 'white', transform: `translateX(-${idx * 7}px)` }}
                                className={classNames("relative text-xs rounded-full w-[30px] h-[30px] flex items-center justify-center")}
                            >
                                {(member.name || member.email).charAt(0).toUpperCase()}
                            </div>
                        )
                    })} */}
                </div>
                <div
                    className='[ text-sm h-8 w-8 rounded cursor-pointer flex items-center justify-center ]
                    [ bg-slate-200 text-black font-medium transition-all hover:bg-slate-300 ]'
                    onClick={handleLogout}
                >
                    {user.name.charAt(0).toUpperCase()}
                </div>
            </div>
        </div>
    )
}

export default Header