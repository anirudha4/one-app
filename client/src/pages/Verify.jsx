import React, { useEffect } from 'react'
import { SiMinutemailer } from'react-icons/si';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { currentUserSelector } from '../selectors/current';

function Verify() {
  const user = useSelector(currentUserSelector);
  const navigate = useNavigate();
  useEffect(() => {
    if(user?.isEmailVerified) {
      navigate('/app');
    } 
  }, [user])
  if(!user) {
    return <Navigate to={'/auth'} />
  }
  return (
    <div className='h-screen w-full flex items-center justify-center flex-col'>
        <SiMinutemailer size={100} className="text-slate-700" />
        <div className="heading-text text-6xl text-slate-700 font-bold mt-4 mb-8">Verify Your Email</div>
        <div className="max-w-[900px] text-md text-slate-500">Please check your email for a verification link. Click on the verify link to confirm your email address</div>
    </div>
  )
}

export default Verify;