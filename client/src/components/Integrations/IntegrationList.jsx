import React, { useMemo } from 'react'
import { INTEGRATIONS } from '../../constants/config';
import { getServerAssetUrl } from '../../utils';
import IntegrationCard from './IntegrationCard';
function IntegrationList() {
    const INTEGRATION_LIST = useMemo(() => {
        return INTEGRATIONS.map(integration => ({
            ...integration,
            path: getServerAssetUrl(integration.icon)
        }))
    }, []);
    return (
        <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-3 sm:grid-cols-1 mt-3'>
            {INTEGRATION_LIST.map(integration => {
                return (
                    <IntegrationCard
                        key={integration.id}
                        {...integration}
                    />
                )
            })}
        </div>
    )
}

export default IntegrationList