import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { VscEdit, VscPreview } from "react-icons/vsc";
import MarkdownCore from "./MarkdownCore";

interface MarkDownInputProps {
    children?: React.ReactNode;
    value: string;
    onChange: (newValue: string) => void;
    style?: CSSProperties;
    defaultMode?: "edit" | "view";
    onChangeMode?: () => void;
    autofocus?: boolean;
    inputStyle?: CSSProperties;
}

const MarkDownInput: React.FC<MarkDownInputProps> = ({
    value,
    onChange,
    style,
    defaultMode = "view",
    onChangeMode,
    autofocus = false,
    inputStyle = {},
}) => {
    const [isEdit, setIsEdit] = useState(defaultMode === "edit" ? true : false);
    const isBlurEvent = useRef(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [fontSize, setFontSize] = useState(20);

    // Change apps font size with ctrl + [] keys
    useEffect(() => {
        function changeFontSize(evt: KeyboardEvent) {
            const { key } = evt;
            if (evt.ctrlKey || evt.metaKey) {
                console.log("ctrl + key pressed", key);
                if (key === "]") {
                    evt.preventDefault();
                    setFontSize((prev) => prev + 1);
                }
                if (key === "[") {
                    evt.preventDefault();
                    setFontSize((prev) => prev - 1);
                }
            }
        }
        document.addEventListener("keydown", changeFontSize);
        return () => {
            document.removeEventListener("keydown", changeFontSize);
        };
    }, []);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.fontSize = `${fontSize}px`;
        }
    }, [fontSize]);

    // Focus on textarea when edit mode
    useEffect(() => {
        if (isEdit && textareaRef.current) {
            textareaRef.current.focus();
            // move cursor to end
            textareaRef.current.selectionStart = textareaRef.current.value.length;
        }
    }, [isEdit]);

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
                <div className="togger">
                    <button
                        type="button"
                        onClick={() => {
                            if (!isBlurEvent.current) {
                                setIsEdit(!isEdit);
                            }
                        }}
                        style={{
                            position: "absolute",
                            top: 5,
                            right: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        {isEdit ? <VscPreview /> : <VscEdit />}
                    </button>
                </div>
                {isEdit ? (
                    <textarea
                        ref={textareaRef}
                        autoFocus={autofocus}
                        value={value}
                        onChange={(e) => onChange(e.currentTarget.value)}
                        onBlur={() => {
                            isBlurEvent.current = true;
                            setTimeout(() => {
                                isBlurEvent.current = false;
                            }, 500);
                            setIsEdit(false);
                            onChangeMode && onChangeMode();
                        }}
                        style={{
                            border: "none",
                            padding: "10px 5px 5px 5px",
                            width: "100%",
                            minHeight: 150,
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
                        }}
                        onClick={() => {
                            setIsEdit(true);
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
