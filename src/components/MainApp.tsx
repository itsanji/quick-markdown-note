import React, { useEffect } from "react";
import MarkDownInput from "./MarkdownInput";
import { invoke } from "@tauri-apps/api";
import ReactLoading from "react-loading";

const MainApp: React.FC = () => {
    const [text, setText] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(true);

    useEffect(() => {
        const getTempText = async () => {
            const text = await invoke("get_temp_content");
            setTimeout(() => {
                setText(text as string);
                setLoading(false);
            }, 500);
        };

        getTempText();
    }, []);

    return (
        <>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80vh",
                    }}
                >
                    <ReactLoading type="spinningBubbles" color="#2a9134" />
                </div>
            ) : (
                <MarkDownInput
                    value={text}
                    onChange={(value) => setText(value)}
                    style={{
                        height: "100vh",
                    }}
                    inputStyle={{
                        height: "100vh",
                    }}
                    // autofocus
                />
            )}
        </>
    );
};

export default MainApp;
