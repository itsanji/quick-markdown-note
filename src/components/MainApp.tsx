import React, { useEffect, useRef } from "react";
import MarkDownInput from "./MarkdownInput";
import { invoke } from "@tauri-apps/api";
import ReactLoading from "react-loading";
// TODO: Handle save loading
import { updateToFile } from "../utils/utils";
import { appWindow } from "@tauri-apps/api/window";

const MainApp: React.FC = () => {
    const [text, setText] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(true);
    const timeout = useRef<NodeJS.Timeout | null>(null);

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

    // update tmp file content
    useEffect(() => {
        // ANCHOR Update tmp file content when user stop typing for 1 second
        if (!timeout.current) {
            timeout.current = setTimeout(() => {
                timeout.current = null;
                updateToFile(text);
            }, 1000);
        } else {
            clearTimeout(timeout.current);
            // set up onther timeout with new text
            timeout.current = setTimeout(() => {
                timeout.current = null;
                updateToFile(text);
            }, 1000);
        }

        // // ANCHOR update tmp file content when user close the app
        const unlistener = appWindow.onCloseRequested((event) => {
            event.preventDefault();
            updateToFile(text);
        });

        return () => {
            unlistener.then((f) => f());
        };
    }, [text]);

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
                        minHeight: "100vh",
                        paddingTop: "50px",
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
