import React, { useContext } from "react";
import { VscEdit, VscPreview } from "react-icons/vsc";
import { GlobalContext } from "../context/GlobalContext";

interface ToolBarProps {
    children?: React.ReactNode;
}

const ToolBar: React.FC<ToolBarProps> = ({}) => {
    const { isEditMode, setIsEditMode, fontSize } = useContext(GlobalContext);
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }} className="toolbar">
            <button>{fontSize}</button>
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
