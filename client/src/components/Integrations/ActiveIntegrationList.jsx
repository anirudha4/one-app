import React from 'react'
import { useSelector } from 'react-redux';
import { allActiveIntegrationSelector } from '../../selectors/all';
import Divider from '../../shared/components/Divider';
import ActiveIntegrationCard from './ActiveIntegrationCard';

function ActiveIntegrationList() {
    const integrations = useSelector(allActiveIntegrationSelector);
    return (
        <>
            {integrations.length > 0 && (
                <>
                    <div className="flex items-center">
                        <div className="heading-text text-lg text-slate-700 font-medium">
                            Active Integrations
                        </div>
                    </div>
                    <Divider />
                    <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-3 sm:grid-cols-1 mt-3'>
                        {integrations.map(integration => {
                            return (
                                <ActiveIntegrationCard
                                    {...integration}
                                />
                            )
                        })}
                    </div>
                    <div className="mb-6"></div>
                </>
            )}
        </>
    )
}

export default ActiveIntegrationList