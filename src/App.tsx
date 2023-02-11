import { useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";
import "./App.css";
import { moveWindow, Position } from "tauri-plugin-positioner-api";
import MainApp from "./components/MainApp";

function App() {
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
        <div className="container">
            {/* <ToolBar /> */}
            <MainApp />
        </div>
    );
}

export default App;
