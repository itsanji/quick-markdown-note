import { useEffect, useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import "./App.css";
import { moveWindow, Position } from "tauri-plugin-positioner-api";
import MainApp from "./components/MainApp";
import { GlobalContext } from "./context/GlobalContext";
import ToolBar from "./components/ToolBar";

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

        // ANCHOR move window to top right corner
        moveWindow(Position.TopRight);
        document.addEventListener("keydown", hideAppInsteadOfClose);
        document.addEventListener("keydown", changeFontSize);
        return () => {
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
