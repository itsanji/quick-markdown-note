import React, { useContext } from "react";
import { VscEdit, VscPreview } from "react-icons/vsc";
import { BiLock, BiLockOpen, BiUserCheck, BiUserCircle, BiUserX } from "react-icons/bi";
import { GlobalContext } from "../context/GlobalContext";
import Tippy from "@tippyjs/react";

interface ToolBarProps {
    children?: React.ReactNode;
    modalState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const ToolBar: React.FC<ToolBarProps> = ({ modalState }) => {
    const { isEditMode, setIsEditMode, fontSize, isLock, setIsLock, logged } = useContext(GlobalContext);
    const [isOpenModal, setOpenModal] = modalState;

    const changeLockMode = () => {
        setIsLock(!isLock);
    };

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }} className="toolbar">
            <Tippy placement="bottom" content="ctrl+[ | ctrl + ]">
                <button style={{ fontSize }}>{fontSize}</button>
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
                    <div>{isEditMode ? <VscPreview fontSize={fontSize} /> : <VscEdit fontSize={fontSize} />}</div>
                </button>
            </Tippy>
            <Tippy placement="bottom" content="Sync Setting">
                <button
                    onClick={() => {
                        setOpenModal(true);
                    }}
                >
                    <BiUserCircle fontSize={fontSize} />
                </button>
            </Tippy>
            <Tippy placement="bottom" content="ctrl + L">
                <button onClick={changeLockMode}>{isLock ? <BiLock color="red" fontSize={fontSize} /> : <BiLockOpen fontSize={fontSize} />}</button>
            </Tippy>
        </div>
    );
};
export default ToolBar;
