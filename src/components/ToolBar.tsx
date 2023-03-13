import React, { useContext } from "react";
import { VscEdit, VscPreview } from "react-icons/vsc";
import { BiLock, BiLockOpen } from "react-icons/bi";
import { GlobalContext } from "../context/GlobalContext";
import { invoke } from "@tauri-apps/api";

interface ToolBarProps {
    children?: React.ReactNode;
}

const ToolBar: React.FC<ToolBarProps> = ({}) => {
    const { isEditMode, setIsEditMode, fontSize, isLock, setIsLock } = useContext(GlobalContext);

    const handleClick = () => {
        setIsLock(!isLock);
    };

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }} className="toolbar">
            <button>{fontSize}</button>
            <button
                type="button"
                onClick={() => {
                    if (!isLock) {
                        setIsEditMode(!isEditMode);
                    }
                }}
            >
                {isEditMode ? <VscPreview /> : <VscEdit />}
            </button>
            <button onClick={handleClick}>{isLock ? <BiLock color="red" /> : <BiLockOpen />}</button>
            <button onClick={handleClick}>Click</button>
        </div>
    );
};
export default ToolBar;
