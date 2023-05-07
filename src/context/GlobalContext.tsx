import React from "react";
import { homeDir } from "@tauri-apps/api/path";

interface IGlobalContext {
    logged: boolean;
    setLogged: (arg: boolean) => void;
    fontSize: number;
    updateFontSize: React.Dispatch<React.SetStateAction<number>>;
    isEditMode: boolean;
    isLock: boolean;
    setIsLock: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    homeDir: Promise<string>;
}

export const GlobalContext = React.createContext<IGlobalContext>({
    fontSize: 20,
    updateFontSize: () => {},
    isEditMode: false,
    isLock: false,
    setIsLock: () => {},
    setIsEditMode: () => {},
    homeDir: homeDir(),
    logged: false,
    setLogged: () => {},
});
