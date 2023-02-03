import React from 'react'
import { useState } from 'react'
import Divider from '../../shared/components/Divider';
import Tabs from '../../shared/components/Tabs';
import FriendList from './FriendList';
import TagList from './TagList';
import CategoryList from './CategoryList';
import { useMemo } from 'react';
const TAB_OPTIONS = [
    // {
    //     id: 1,
    //     label: 'Members',
    //     component: <FriendList />
    // },
    {
        id: 2,
        label: 'Categories',
        component: <CategoryList />
    },
    {
        id: 3,
        label: 'Tags',
        component: <TagList />
    }
];
function Manage() {
    const [activeTab, setActiveTab] = useState(TAB_OPTIONS[0].id);
    const tab = useMemo(() => {
        return TAB_OPTIONS.find(tab => tab.id === activeTab);
    }, [activeTab])
    const handleTabChange = tab => {
        setActiveTab(tab);
    }
    return (
        <div className="manage flex flex-col  p-4 card h-full overflow-hidden">
            <div className="heading-text text-slate-700 text-lg font-medium mb-2">Manage {tab.label}</div>
            <Divider />
            <Tabs tabs={TAB_OPTIONS} onChange={handleTabChange} activeTab={activeTab} />
        </div>
    )
}

export default Manage