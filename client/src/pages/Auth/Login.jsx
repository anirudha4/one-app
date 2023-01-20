import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { requestLogin } from './saga';

function Login() {
  // get dispatch
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(requestLogin(form));
  }
  return (
    <div className='form-container'>
      <h3 className='form-header'>react-sails-template</h3>
      <br />
      <form onSubmit={handleSubmit} className='form'>
        {Object.keys(form).map(key => {
          return (
            <div className="field" key={key}>
              <label htmlFor={key}>{key}</label>
              <input className='form-field-input' key={key} type={key} placeholder={key} onChange={e => setForm({ ...form, [key]: e.target.value })} />
            </div>
          )
        })}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;
