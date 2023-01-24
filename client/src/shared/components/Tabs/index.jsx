import React, { useEffect, useState } from 'react'
import classNames from 'classnames';

import styles from './Tab.module.css';
import { useMemo } from 'react';
import PropTypes from 'prop-types';

function Tabs({ tabs, onChange, activeTab }) {
    const Component = useMemo(() => {
        return tabs.find(tab => tab.id === activeTab).component
    }, [activeTab])
    return (
        <div className={styles.tabsContainer}>
            <div className='p-1 bg-slate-100 rounded-md flex justify-between items-center'>
                {tabs.map(tab => {
                    return (
                        <div key={tab.id} onClick={() => onChange(tab.id)} className={classNames("p-[7px] text-xs font-medium flex-1 text-center rounded cursor-pointer select-none text-slate-700", {
                            ['bg-white']: activeTab === tab.id
                        })}>{tab.label}</div>
                    )
                })}
            </div>
            {Component}
        </div>
    )
}

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, label: PropTypes.string, component: PropTypes.node })),
    onChange: PropTypes.func,
    activeTab: PropTypes.number
}
export default Tabs