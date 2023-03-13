import React, { useContext } from "react";
import { VscEdit, VscPreview } from "react-icons/vsc";
import { BiLock, BiLockOpen } from "react-icons/bi";
import { GlobalContext } from "../context/GlobalContext";
import Tippy from "@tippyjs/react";

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
            <Tippy placement="bottom" content="ctrl+[ | ctrl + ]">
                <button>{fontSize}</button>
            </Tippy>
            <Tippy placement="bottom" content="esc">
                <button
                    type="button"
                    onClick={() => {
                        if (!isLock) {
                            setIsEditMode(!isEditMode);
                        }
                    }}
                >
                    <div>{isEditMode ? <VscPreview /> : <VscEdit />}</div>
                </button>
            </Tippy>
            <Tippy placement="bottom" content="ctrl + L">
                <button onClick={handleClick}>{isLock ? <BiLock color="red" /> : <BiLockOpen />}</button>
            </Tippy>
        </div>
    );
};
export default ToolBar;
