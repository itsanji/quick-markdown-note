import React from "react";
import MarkDownInput from "./MarkdownInput";

const MainApp: React.FC = () => {
    const [text, setText] = React.useState<string>("");
    return (
        <>
            <MarkDownInput
                value={text}
                onChange={(value) => setText(value)}
                style={{
                    height: "100vh",
                }}
                inputStyle={{
                    height: "100vh",
                }}
                // autofocus
            />
        </>
    );
};

export default MainApp;
