import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Field from '../../components/Field';
import { requestRegister } from '../../shared/slices/auth';

function Register() {
  // get dispatch
  const dispatch = useDispatch();
  // selectors
  const { loading } = useSelector(state => state.auth);
  // local state
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    organizationName: ''
  });
  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(requestRegister({ ...form }));
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-[500px] w-full gap-3" >
      <Field
        autoFocus
        name={'name'}
        id={'name'}
        type={'name'}
        label={'Name'}
        placeholder={'Eg. John Doe'}
        value={form.name}
        onChange={onChange}
      />
      <Field
        name={'email'}
        id={'email'}
        type={'email'}
        label={'Email'}
        placeholder={'Eg. john@gmail.com'}
        value={form.email}
        onChange={onChange}
      />
      <Field
        name={'password'}
        id={'password'}
        type={'password'}
        label={'Password'}
        placeholder={'*********'}
        value={form.password}
        onChange={onChange}
      />
      <Field
        name={'organizationName'}
        id={'organizationName'}
        type={'text'}
        label={'Organization Name'}
        placeholder={'Eg. Apple'}
        value={form.organizationName}
        onChange={onChange}
      />
      <button disabled={loading} className="btn-primary justify-center">{loading ? 'Please wait...' : 'Register'}</button>
    </form >
  )
}

export default Register;
