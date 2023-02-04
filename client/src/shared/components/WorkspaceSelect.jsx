import { TbSelector } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const WorkspaceSelector = ({ name }) => {
    const navigate = useNavigate();
    const handleOpenWorkspaceSelector = () => {
        navigate('?switch_workspace=true')
    }
    return (
        <div className="workspace p-2 h-[50px] items-center cursor-pointer border-b border-slate-200 transition-all hover:bg-slate-200" onClick={handleOpenWorkspaceSelector}>
            <div className="flex items-center gap-2 truncate">
                <div className="avatar h-6 w-6 bg-black rounded flex items-center justify-center">
                    <div className="avatar-initial text-xs font-medium text-gray-100">{name.charAt(0).toUpperCase()}</div>
                </div>
                <div className="workspace-name text-xs font-medium truncate w-full flex-1 text-black">{name}</div>
            </div>
            <div className="workspace-select-icon min-w-[20px] min-h-[20px]">
                <TbSelector size={18} className='text-slate-500' />
            </div>
        </div>
    )
}
export default WorkspaceSelector;