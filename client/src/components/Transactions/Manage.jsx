import React, { useState } from 'react'
import Divider from '../../shared/components/Divider';
import Tabs from '../../shared/components/Tabs';
import FriendList from './FriendList';
import TagList from './TagList';
import CategoryList from './CategoryList';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TbPlus } from 'react-icons/tb';
import classNames from 'classnames';
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
const FLOATING_BUTTON_CONFIG = {
    1: {
        label: 'Add Members',
        query: '?add_member=true'
    },
    2: {
        label: 'Add Categories',
        query: '?add_categories=true'
    },
    3: {
        label: 'Add Tags',
        query: '?add_tags=true'
    },
}
function Manage({ expanded }) {
    const [activeTab, setActiveTab] = useState(TAB_OPTIONS[0].id);
    const { tab, label, query } = useMemo(() => {
        return { tab: TAB_OPTIONS.find(tab => tab.id === activeTab), ...FLOATING_BUTTON_CONFIG[activeTab] }
    }, [activeTab])
    const handleTabChange = tab => {
        setActiveTab(tab);
    }
    return (
        <div className={classNames("manage flex flex-col  p-4 card h-full overflow-hidden relative transition-all duration-150", {
            'orientation-slant': expanded
        })}>
            <div className="heading-text text-slate-700 text-lg font-medium mb-2">Manage {tab.label}</div>
            {!expanded && (
                <>
                    <Divider />
                    <Tabs tabs={TAB_OPTIONS} onChange={handleTabChange} activeTab={activeTab} />
                    <Link to={query}>
                        <button className="btn-floating transition-all group hover:gap-2 hover:w-32">
                            <TbPlus />
                            <span className="text-xs text-white whitespace-nowrap w-0 overflow-hidden transition-all group-hover:block  group-hover:w-fit">
                                {label}
                            </span>
                        </button>
                    </Link>
                </>
            )}
        </div>
    )
}

export default Manage;
