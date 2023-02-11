import { exists, createDir } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";

async function configFolder(homePath: Promise<string>) {
    let homeDir = await homePath;
    const configPath = await join(homeDir, ".config", "qmnote");
    // check .config dir exists
    if (!(await exists(configPath))) {
        try {
            createDir(configPath);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    return true;
}

const updateToFile = async (homePath: Promise<string>, content: string) => {};

export { updateToFile, configFolder };
