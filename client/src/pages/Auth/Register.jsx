import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { requestRegister } from './saga';

function Register() {
  // get dispatch
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(requestRegister(form));
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
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register;
