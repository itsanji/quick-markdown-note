import React from "react";
import { homeDir } from "@tauri-apps/api/path";

interface IGlobalContext {
    fontSize: number;
    updateFontSize: React.Dispatch<React.SetStateAction<number>>;
    isEditMode: boolean;
    setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    homeDir: Promise<string>;
}

export const GlobalContext = React.createContext<IGlobalContext>({
    fontSize: 20,
    updateFontSize: () => {},
    isEditMode: false,
    setIsEditMode: () => {},
    homeDir: homeDir(),
});
