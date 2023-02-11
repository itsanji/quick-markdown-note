import React from "react";

interface IGlobalContext {
    fontSize: number;
    updateFontSize: React.Dispatch<React.SetStateAction<number>>;
    isEditMode: boolean;
    setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = React.createContext<IGlobalContext>({
    fontSize: 20,
    updateFontSize: () => {},
    isEditMode: false,
    setIsEditMode: () => {},
});
