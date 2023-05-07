// Add PLATFROM to environment variables in .env or build command

/**
 * Get storage from local storage ( don't need to parse )
 * @param key key to get from storage
 * @param options options for storage
 */
const getStorage = (key: string) => {
    let result = "{}";
    switch (import.meta.env.PLATFORM || "web") {
        case "web":
            result = localStorage.getItem(key) || "{}";
            break;
        case "desktop":
            result = "{}";
            break;
    }

    try {
        return JSON.parse(result);
    } catch (e) {
        return {};
    }
};

/**
 * Set storage to local storage ( don't need to stringify )
 * @param key  key to set in storage
 * @param value value to set in storage
 * @param options options for storage
 */
const setStorage = (key: string, value: any) => {
    switch (import.meta.env.PLATFORM || "web") {
        case "web":
            window.localStorage.setItem(key, JSON.stringify(value));
            break;
        case "desktop":
            break;
    }
};

export { getStorage, setStorage };
