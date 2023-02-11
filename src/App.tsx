import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
import { useEffect, useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { moveWindow, Position } from "tauri-plugin-positioner-api";
import MainApp from "./components/MainApp";
import { GlobalContext } from "./context/GlobalContext";
import ToolBar from "./components/ToolBar";
import { homeDir } from "@tauri-apps/api/path";
import { configFolder } from "./utils/utils";
import { toast } from "react-toastify";

// ANCHOR hide app instead of close
async function hideAppInsteadOfClose(evt: KeyboardEvent) {
    const { key } = evt;
    if ((evt.metaKey && key === "q") || (evt.ctrlKey && key === "w")) {
        console.log("hide app instead of close");
        evt.preventDefault();
        appWindow.hide();
    }
}

function App() {
    const [fontSize, setFontSize] = useState(20);
    const [isEditMode, setIsEditMode] = useState(false);

    // SECTION App setups
    useEffect(() => {
        configFolder(homeDir()).catch(() => {
            toast("Error Occur. File won't be saved. Check $HOME/.config/qmnote your permission.", {
                type: "error",
            });
        });
        // ANCHOR Change apps font size with ctrl + [] keys
        function changeFontSize(evt: KeyboardEvent) {
            const { key } = evt;
            if (evt.ctrlKey || evt.metaKey) {
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

        // ANCHOR change to view mode when app is not focused
        const unlisten = appWindow.onFocusChanged(({ payload: focused }) => {
            if (!focused) {
                setIsEditMode(false);
            }
        });

        // ANCHOR change to view mode on ESC key
        const escListener = (evt: KeyboardEvent) => {
            if (evt.key === "Escape") {
                setIsEditMode(false);
            }
        };

        // ANCHOR move window to top right corner
        moveWindow(Position.TopRight);
        document.addEventListener("keydown", escListener);
        document.addEventListener("keydown", hideAppInsteadOfClose);
        document.addEventListener("keydown", changeFontSize);
        return () => {
            document.removeEventListener("keydown", escListener);
            document.removeEventListener("keydown", changeFontSize);
            document.removeEventListener("keydown", hideAppInsteadOfClose);
            unlisten.then((f) => f());
        };
    }, []);
    // !SECTION

    return (
        <GlobalContext.Provider
            value={{
                fontSize,
                updateFontSize: setFontSize,
                isEditMode,
                setIsEditMode,
                homeDir: homeDir(),
            }}
        >
            <div className="container">
                <ToolBar />
                <MainApp />
            </div>
        </GlobalContext.Provider>
    );
}

export default App;
