import React from 'react'
import { Link } from 'react-router-dom'
import { TbArrowRight } from 'react-icons/tb';
import { getServerAssetUrl } from '../../utils';
import { INTEGRATION_ICONS } from '../../constants/config';

function ActiveIntegrationCard({ id, name }) {
    return (
        <div className="p-4 rounded bg-white border border-slate-100">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={getServerAssetUrl(INTEGRATION_ICONS[name])} width={25} height={25} alt="" />
                    <span className='font-medium text-slate-700'>Splitwise</span>
                </div>
                <Link to={`/app/integrations/splitwise/${id}`} className='btn-sm'>
                    <span>
                        Configure
                    </span>
                    <TbArrowRight />
                </Link>
            </div>
        </div>
    )
}

export default ActiveIntegrationCard