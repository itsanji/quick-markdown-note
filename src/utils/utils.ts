import { invoke } from "@tauri-apps/api";

const updateToFile = async (content: string) => {
    invoke("temp_saving", { content });
};

export { updateToFile };
