import React, { useContext, useEffect, useRef, useState } from "react";
import MarkDownInput from "./MarkdownInput";
import { invoke } from "@tauri-apps/api";
import ReactLoading from "react-loading";
// TODO: Handle save loading
import { updateToFile } from "../utils/utils";
import { appWindow } from "@tauri-apps/api/window";
import { customAxiosInstance } from "../utils/axios";
import { AxiosError, HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { GlobalContext } from "../context/GlobalContext";

const catchHandler = (e: AxiosError<ResponsePayload>) => {
    let err = "Sync failed! Please check your internet connection. Or you can try to login again.";
    if (e.response?.data) {
        console.log(e.response);
    }
    toast.error(err);
};

/**
 * Rewrite local content with server content
 * @param title Note title
 */
function syncLocalToServer(_title: string, content: string) {
    updateToFile(content);
}

/**
 * Rewrite server content with local conten
 * @param title Note title
 */
async function syncServerToLocal(title: string, content: string) {
    await customAxiosInstance
        .post(`${import.meta.env.VITE_API_URL}/sync/${title}`, {
            content: content,
        })
        .then(({ data }) => {
            console.log(data);
            if (data.ok) {
                toast.success("Sync success!");
            }
        })
        .catch(catchHandler);
}

async function syncChecker(title: string, content: string, cb?: (content: string) => void) {
    await customAxiosInstance
        .get(`${import.meta.env.VITE_API_URL}/sync/${title}`)
        .then(({ data }) => {
            console.log(data);
            switch (true) {
                case data.data.note === null || data.data.note === undefined:
                    console.log("no server content");
                    syncServerToLocal(title, content).then(() => {
                        cb && cb(content);
                    });
                    break;
                case data.data.note.content === content:
                    console.log("same content");
                    break;
                case data.data.note.content.includes(content):
                    console.log("server content is container", {
                        local: content,
                        server: data.data.note.content,
                    });
                    syncLocalToServer(title, content);
                    cb && cb(content);
                    break;
                case content.includes(data.data.note.content):
                    console.log("local content is container");
                    syncServerToLocal(title, content).then(() => {
                        cb && cb(content);
                    });
                    break;
                default:
                    console.log("conflict");
                    // conflict must resolve
                    console.log({
                        local: content,
                        server: data.data.note.content,
                    });
                    cb && cb(content);
                    break;
            }
        })
        .catch(catchHandler);
}

const MainApp: React.FC = () => {
    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const { logged } = useContext(GlobalContext);
    const [isSync, setIsSync] = useState<boolean>(false);
    const title = "__temp";

    useEffect(() => {
        const getTempText = async () => {
            const text = await invoke("get_temp_content");
            console.log("runed", { text });
            // delay 500ms to show loading
            setTimeout(() => {
                setText(text as string);
                setLoading(false);
            }, 500);
        };

        const handleNewLine = (e: KeyboardEvent) => {
            console.log(e.key);
            if (e.key === "Enter") {
                e.preventDefault();
                setText((prev) => prev + "\n");
            }
        };
        document.addEventListener("keydown", handleNewLine);
        getTempText();

        return () => {
            document.removeEventListener("keydown", handleNewLine);
        };
    }, []);

    useEffect(() => {
        if (!isSync && logged) {
            if (text.length > 0) {
                console.log(text);
                syncChecker(title, text, (content) => {
                    setIsSync(true);
                    setText(content);
                });
            }
        }

        if (!logged) {
            setIsSync(false);
        }
    }, [isSync, logged, text]);

    // update tmp file content
    useEffect(() => {
        // ANCHOR Update tmp file content when user stop typing for 1 second
        if (!timeout.current) {
            timeout.current = setTimeout(() => {
                timeout.current = null;
                updateToFile(text);
            }, 500);
        } else {
            clearTimeout(timeout.current);
            // set up onther timeout with new text
            timeout.current = setTimeout(() => {
                timeout.current = null;
                updateToFile(text);
            }, 500);
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
                    onChange={(value) => {
                        setText(value);
                    }}
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
