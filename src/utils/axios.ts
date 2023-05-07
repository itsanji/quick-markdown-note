import axios from "axios";
import { getStorage, setStorage } from "./storage";

const customAxiosInstance = axios.create();

// Routes ( Check $server/server.ts/app.use )
const AuthAPI = `${import.meta.env.VITE_API_URL}/auth`;

// Send access token in header in every request
customAxiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = getStorage("accessToken");
        console.log(accessToken);
        if (!accessToken.accessToken) {
            throw new Error("Access Token Not Found");
        } else {
            config.headers["Authorization"] = `Bearer ${accessToken.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Resend request with new access token if access token is expired
// new access token is fetched with refresh token
customAxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        // the flag of refreshToken validate result
        let refreshTokenValidationResult: boolean = false;
        if (error.response.status === 401) {
            let newAccessToken;
            // refresh access token
            const localRefreshToken = getStorage("refreshToken");
            if (!localRefreshToken.refreshToken) {
                console.log("Refresh Token Not Found");
                return Promise.reject(error);
            }

            try {
                const res = await axios({
                    method: "post",
                    url: `${AuthAPI}/token/refresh`,
                    headers: { Authorization: `Bearer ${localRefreshToken}` },
                });
                newAccessToken = res.data.data.newAccessToken;
                setStorage("accessToken", newAccessToken);
                refreshTokenValidationResult = true;
            } catch (error) {
                refreshTokenValidationResult = false;
            }
        }
        return refreshTokenValidationResult ? axios(originalRequest) : Promise.reject(error);
    }
);

export { customAxiosInstance };
