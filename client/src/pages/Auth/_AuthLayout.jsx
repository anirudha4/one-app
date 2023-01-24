import React, { useMemo } from 'react'
import { Link, Outlet, useLocation, useParams, useSearchParams } from 'react-router-dom'

function _AuthLayout() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isExistingUser = useMemo(() => searchParams.get('existing_user'), [location.pathname, searchParams]);
  const isRegisterRoute = useMemo(() => location.pathname.includes('/register'), [location.pathname])

  return (
    <div className='flex h-screen bg-white'>
      <div className="flex flex-1 h-full items-center justify-center flex-col">
        <div className='form-header max-w-[500px] w-full mb-12'>
          <div className="heading-text text-3xl font-bold text-gray-700 mb-2">One App</div>
          {isExistingUser ? (
            <div className="text-gray-500">We've already met. Please Login to Continue</div>
          ) : (
            <div className="text-gray-500">{!isRegisterRoute ? 'Welcome back. Please login to continue' : 'Get Started with One App. Please register to continue'}</div>
          )}
        </div>
        <Outlet />
        <div className='mt-2 text-sm'>
          {!isRegisterRoute ? (
            <p className='text-gray-500'>Don't have an Account? <Link className='underline hover:text-black transition-all' to={'/auth/register'}>Create account</Link></p>
          ) : <p className='text-gray-500'>Already a member? <Link className='underline hover:text-black transition-all' to={'/auth'}>Login</Link></p>}
        </div>
      </div>
      <div className="flex flex-1 h-full bg-black">
      </div>
    </div >
  )
}

export default _AuthLayout