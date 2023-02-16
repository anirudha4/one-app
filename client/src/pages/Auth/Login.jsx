import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Field from '../../components/Field'
import useQueryParams from '../../hooks/useQueryParams';
import { requestLogin } from '../../shared/slices/auth';

function Login() {
  const dispatch = useDispatch();
  const { verified } = useQueryParams(['verified']);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(requestLogin(form));
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-[500px] w-full gap-5">
      {verified && (
        <div className="text-xs p-2 bg-blue-50 font-medium text-blue-500 rounded">Email Verified Successfully.</div>
      )}
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
      <button className="btn-primary justify-center">Login</button>
    </form>
  )
}

export default Login