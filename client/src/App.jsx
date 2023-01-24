import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { createBrowserRouter, createRoutesFromElements, redirect, Route, RouterProvider } from 'react-router-dom';
import { AuthLayout, Login, Register } from './pages/Auth';
import { Transactions } from './pages/Dashboard';

// import store
import { store } from './store';
import Layout from './shared/components/Layout';
import { history } from './shared/slices/router';
import { currentAuthStatusSelector } from './selectors/current';
import AppLayout from './shared/components/AppLayout';

import './styles/app.css';
import Invoices from './pages/Dashboard/Invoices';
import Tasks from './pages/Dashboard/Tasks';

function App() {
  const { isLoggedIn } = useSelector(currentAuthStatusSelector);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<Transactions />} />
        <Route path='auth' element={<AuthLayout />}>
          <Route index loader={() => {
            if (isLoggedIn) {
              return redirect('/app');
            }
            return null;
          }} element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path='app' element={<AppLayout />}>
          <Route path='transactions' element={<Transactions />} />
          <Route path='invoices' element={<Invoices />} />
          <Route path='tasks' element={<Tasks />} />
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