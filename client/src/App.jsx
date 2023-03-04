import React from 'react'
import { Provider, useSelector } from 'react-redux'
// toastify
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthLayout, Login, Register } from './pages/Auth';
import { createBrowserRouter, createRoutesFromElements, Navigate, redirect, Route, RouterProvider } from 'react-router-dom';
import { Transactions } from './pages/Dashboard';

// import store
import { store } from './store';
import Layout from './shared/components/Layout';
import { history } from './shared/slices/router';
import { currentAuthStatusSelector } from './selectors/current';
import AppLayout from './shared/components/AppLayout';
import Invoices from './pages/Dashboard/Invoices';

import './styles/app.css';
import "react-datepicker/dist/react-datepicker.css";
import IntergrationLayout from './pages/Integrations/IntergrationLayout';
import SplitwiseConnect from './pages/Integrations/Splitwise/SplitwiseConnect';
import Splitwise from './pages/Integrations/Splitwise/Splitwise';
import Integrations from './pages/Integrations';
import Verify from './pages/Verify';
import { Insights } from './pages/Insights';
import AccountLayout from './pages/Account/AccountLayout';
import Profile from './pages/Account/Profile';
import ManageCategories from './pages/Account/ManageCategories';

function App() {
  const { isLoggedIn } = useSelector(currentAuthStatusSelector);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<AppLayout />} />
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
          <Route path='transactions' element={<Transactions />}>
            <Route path=':id' element={<Transactions />} />
          </Route>
          <Route path='invoices' element={<Invoices />} />
          <Route path='insights' element={<Insights />} />
          <Route path='integrations' element={<IntergrationLayout />}>
            <Route index element={<Integrations />} />
            <Route path='splitwise/connect' element={<SplitwiseConnect />} />
            <Route path='splitwise/:id' element={<Splitwise />} />
          </Route>
          <Route path='accounts' element={<AccountLayout />}>
            <Route index element={<Navigate to={'/app/accounts/profile'} />} />
            <Route path='profile' element={<Profile />} />
            <Route path='categories' element={<ManageCategories />} />
          </Route>
        </Route>
        <Route path='/verify_email' element={<Verify />} />
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
      <ToastContainer
        className={'toast-container'}
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        progressClassName={'toast-progress'}
        newestOnTop={false}
        closeOnClick
        style={{ padding: 5 }}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
        theme="dark"
      />
    </Provider>
  )
}
export default AppWrapper;