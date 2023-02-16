import React, { useRef, useState } from 'react'
import { TbArrowLeft } from 'react-icons/tb'
import { MdLogin } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Divider from '../../../shared/components/Divider'
import Field from '../../../components/Field';
import { createObjectFromFormData, validateTransaction } from '../../../utils/transactions'
import { createSplitwiseIntegrationAction } from '../../../shared/actions/entry/splitwise-integrations'
import { useDispatch } from 'react-redux'
import Alert from '../../../components/Alert'

function SplitwiseConnect() {
  // local states
  const [error, setError] = useState(null);
  // refs
  const formRef = useRef();

  // dispatch 
  const dispatch = useDispatch();

  // handlers
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formData = createObjectFromFormData(formRef.current);
      await validateTransaction(formData, ['clientId', 'clientSecret']);
      dispatch(createSplitwiseIntegrationAction(formData));
      setError(null);
    } catch (error) {
      setError(error.message);
      const errorElement = formRef.current[error.key];
      if (errorElement) {
        errorElement.focus();
      }
    }
  }
  return (
    <div className='p-3 max-w-[1200px] w-full mx-auto'>
      <div className="p-6 border bg-white border-slate-100 rounded">
        <div className="mb-2 flex items-center">
          <div className="flex items-center gap-3">
            <Link to={'/app/integrations'}>
              <TbArrowLeft size={20} />
            </Link>
            <div className="heading-text text-lg text-slate-700 font-medium">
              Splitwise Integration
            </div>
          </div>
        </div>
        <Divider />
        {error && <Alert type="danger" message={error} />}
        <form onSubmit={handleSubmit} className='mt-4' ref={formRef}>
          <div className="flex gap-4 w-full">
            <Field
              type={'text'}
              label='Client ID'
              placeholder="Eg. 3MVG9FS3IyroMOh5cyk8BvKPJuouh3fUHXv3HTuPbNy5kksfSNiGKgkB1wGMvfTm"
              style={{ flex: 1 }}
              name='clientId'
              id='clientId'
            />
            <Field
              label='Client Secret'
              type={'password'}
              placeholder="Eg. A646075C6EF1EF5E87CC98C84EF85C2C374E955CE71E9644F376326481795DE"
              style={{ flex: 1 }}
              name='clientSecret'
              id='clientSecret'
            />
          </div>

          <button className="btn-primary mt-3">
            <MdLogin />
            Save and Authorize
          </button>
        </form>
      </div>
    </div >
  )
}

export default SplitwiseConnect