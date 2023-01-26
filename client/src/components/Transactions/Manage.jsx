import React from 'react'
import { useState } from 'react'
import Divider from '../../shared/components/Divider';
import Tabs from '../../shared/components/Tabs';
import FriendList from './FriendList';
import TagList from './TagList';
import CategoryList from './CategoryList';
const TAB_OPTIONS = [
    {
        id: 1,
        label: 'Friends',
        component: <FriendList />
    },
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
    const handleTabChange = tab => {
        setActiveTab(tab);
    }
    return (
        <div className="manage flex flex-col bg-white p-4 rounded h-full">
            <div className="heading-text text-slate-700 text-lg font-medium mb-2">Manage</div>
            <Divider />
            <Tabs tabs={TAB_OPTIONS} onChange={handleTabChange} activeTab={activeTab} />
        </div>
    )
}

export default Manage