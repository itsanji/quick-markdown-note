import React, { useContext } from "react";
import { VscEdit, VscPreview } from "react-icons/vsc";
import { GlobalContext } from "../context/GlobalContext";
import { invoke } from "@tauri-apps/api";

interface ToolBarProps {
    children?: React.ReactNode;
}

const ToolBar: React.FC<ToolBarProps> = ({}) => {
    const { isEditMode, setIsEditMode, fontSize } = useContext(GlobalContext);

    const handleClick = () => {
        invoke("get_tmp_content").then((payload) => {
            console.log(payload);
        });
    };

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
            <button onClick={handleClick}>Click</button>
        </div>
    );
};
export default ToolBar;
