import React from "react";

interface IGlobalContext {
    fontSize: number;
    updateFontSize: React.Dispatch<React.SetStateAction<number>>;
}

export const GlobalContext = React.createContext<IGlobalContext>({
    fontSize: 20,
    updateFontSize: () => {},
});
