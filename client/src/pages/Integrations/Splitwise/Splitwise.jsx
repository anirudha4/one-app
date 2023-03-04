import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { TbArrowLeft, TbTrash } from 'react-icons/tb';
import Divider from '../../../shared/components/Divider';
import ConfigureSplitwise from '../../../components/Integrations/Splitwise/ConfigureSplitwise';
import { Helmet } from 'react-helmet';

function Splitwise() {
  const { id } = useParams();
  return (
    <div className='integration-container p-3 max-w-[1200px] w-full mx-auto'>
      <Helmet>
        <title>One App | Splitwise Integration</title>
      </Helmet>
      <div className="flex flex-col pt-6 pb-3 px-6 border bg-white border-slate-100">
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
        <ConfigureSplitwise id={id} />
      </div>
    </div>
  )
}

export default Splitwise