import React, { CSSProperties, useContext, useEffect, useRef } from "react";
import MarkdownCore from "./MarkdownCore";
import { GlobalContext } from "../context/GlobalContext";

interface MarkDownInputProps {
    children?: React.ReactNode;
    value: string;
    onChange: (newValue: string) => void;
    style?: CSSProperties;
    autofocus?: boolean;
    inputStyle?: CSSProperties;
}

const MarkDownInput: React.FC<MarkDownInputProps> = (props) => {
    const { value, onChange, style, autofocus = false, inputStyle = {} } = props;
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { fontSize, isEditMode, setIsEditMode } = useContext(GlobalContext);

    // Focus on textarea when edit mode
    useEffect(() => {
        if (isEditMode && textareaRef.current) {
            textareaRef.current.focus();
            // move cursor to end
            textareaRef.current.selectionStart = textareaRef.current.value.length;
        }
    }, [isEditMode]);

    return (
        <>
            <div
                className="markdown-container"
                style={{
                    position: "relative",
                    minHeight: 150,
                    padding: "5px",
                    ...style,
                }}
            >
                {isEditMode ? (
                    <textarea
                        ref={textareaRef}
                        autoFocus={autofocus}
                        value={value}
                        onChange={(e) => {
                            onChange(e.currentTarget.value);
                        }}
                        style={{
                            border: "none",
                            padding: "10px 5px 5px 5px",
                            width: "100%",
                            minHeight: 150,
                            fontSize: fontSize,
                            ...inputStyle,
                        }}
                    ></textarea>
                ) : (
                    <div
                        style={{
                            border: "none",
                            minHeight: 150,
                            padding: 5,
                            height: "100%",
                            fontSize: fontSize,
                        }}
                        onClick={() => {
                            setIsEditMode(true);
                        }}
                    >
                        <MarkdownCore>{value}</MarkdownCore>
                    </div>
                )}
            </div>
        </>
    );
};
export default MarkDownInput;
