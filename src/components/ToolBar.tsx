import React, { useContext } from "react";
import { VscEdit, VscPreview } from "react-icons/vsc";
import { GlobalContext } from "../context/GlobalContext";

interface ToolBarProps {
    children?: React.ReactNode;
}

const ToolBar: React.FC<ToolBarProps> = ({}) => {
    const { isEditMode, setIsEditMode } = useContext(GlobalContext);
    return (
        <div>
            <button
                type="button"
                onClick={() => {
                    setIsEditMode(!isEditMode);
                }}
            >
                {isEditMode ? <VscPreview /> : <VscEdit />}
            </button>
        </div>
    );
};
export default ToolBar;
