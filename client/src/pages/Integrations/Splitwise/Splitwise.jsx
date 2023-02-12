import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { splitwiseIntegrationById } from '../../../selectors/by-id';
import { TbArrowLeft, TbTrash } from 'react-icons/tb';
import Divider from '../../../shared/components/Divider';

function Splitwise() {
  const { id } = useParams();
  const splitwiseIntegration = useSelector(state => splitwiseIntegrationById(state, id));
  return (
    <div className='p-3 max-w-[1200px] w-full mx-auto'>
      <div className="p-6 border bg-white border-slate-100 rounded">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to={'/app/integrations'}>
              <TbArrowLeft size={20} />
            </Link>
            <div className="heading-text text-lg text-slate-700 font-medium">
              Splitwise Integration
            </div>
          </div>
          <button className='btn btn-danger'>
            <TbTrash size={14} />
            Remove Integration
          </button>
        </div>
        <Divider />
      </div>
    </div>
  )
}

export default Splitwise