import { useEffect, useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import "./App.css";
import { moveWindow, Position } from "tauri-plugin-positioner-api";
import MainApp from "./components/MainApp";
import { GlobalContext } from "./context/GlobalContext";

function App() {
    const [fontSize, setFontSize] = useState(20);
    useEffect(() => {
        async function hideAppInsteadOfClose(evt: KeyboardEvent) {
            const { key } = evt;
            if ((evt.metaKey && key === "q") || (evt.ctrlKey && key === "w")) {
                console.log("hide app instead of close");
                evt.preventDefault();
                appWindow.hide();
            }
        }
        moveWindow(Position.TopRight);
        document.addEventListener("keydown", hideAppInsteadOfClose);
        return () => {
            document.removeEventListener("keydown", hideAppInsteadOfClose);
        };
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                fontSize,
                updateFontSize: setFontSize,
            }}
        >
            <div className="container">
                {/* <ToolBar /> */}
                <MainApp />
            </div>
        </GlobalContext.Provider>
    );
}

export default App;
