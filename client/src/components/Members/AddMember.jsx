import React, { useRef, useState } from 'react'
import { TbX } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createMemberAction } from '../../shared/actions/entry/members';
import Divider from '../../shared/components/Divider';
import { createObjectFromFormData, validateTransaction } from '../../utils/transactions';
import Field from '../Field';

function AddMember() {
    // state
    const [error, setError] = useState(null);

    // refs
    const formRef = useRef();

    // dispatch 
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const formData = createObjectFromFormData(formRef.current);
            validateTransaction(formData, ['email']);
            dispatch(createMemberAction({ member: formData }));
            formRef.current.reset();
        } catch (error) {
            setError(error.message);
            const errorElement = formRef.current[error.key];
            if (errorElement) {
                errorElement.focus();
            }
        }
    }

    return (
        <div className='add-member-modal-container flex items-center justify-center'>
            <Link to={'/app/transactions'}>
                <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-40 z-10"></div>
            </Link>
            <div className="fixed z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded add-transaction-card p-4 bg-white max-w-[500px] w-full transition-all duration-75">
                <div className="mb-2 flex items-center justify-between">
                    <div className="heading-text text-slate-700 text-lg font-medium">Invite Member</div>
                    <Link replace to={'/app/transactions'} className="h-7 w-7 bg-slate-100 flex items-center justify-center rounded-md hover:bg-slate-200 cursor-pointer transition-all">
                        <TbX className='text-slate-600' />
                    </Link>
                </div>
                <Divider />
                {error && <div className="p-2 text-xs capitalize bg-red-100 text-red-500 mb-1 rounded">{error}</div>}
                <form ref={formRef} onSubmit={handleSubmit} className='mb-2 flex flex-col gap-4 pt-4'>
                    <Field
                        label={'Email'}
                        placeholder={'Eg. john@email.com'}
                        name={'email'}
                        type={'email'}
                        autoComplete="off"
                    />
                    <button className="btn-primary flex justify-center">Add Member</button>
                </form>
            </div>
        </div>
    )
}

export default AddMember