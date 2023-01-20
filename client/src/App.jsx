import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { createBrowserRouter, createRoutesFromElements, redirect, Route, RouterProvider } from 'react-router-dom';
import { AuthLayout, Login, Register } from './pages/Auth';
import { Transactions } from './pages/Dashboard';
import Routing from './shared/components/Routing';

// import styles
import './styles/_global.scss';

// import store
import { store } from './store';
import Layout from './shared/components/Layout';
import { history } from './shared/slices/router';
import { currentAuthStatusSelector } from './selectors/current';

function App() {
  const { isLoggedIn } = useSelector(currentAuthStatusSelector);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<Transactions />} />
        <Route path='auth' loader={() => {
          if (isLoggedIn) {
            return redirect('/');
          }
          return null;
        }} element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Route>
    )
  )
  return (
    <RouterProvider history={history} router={router} />
  )
}

// wrapper component for application
function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
export default AppWrapper;