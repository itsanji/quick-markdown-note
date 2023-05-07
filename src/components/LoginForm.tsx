import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { setStorage } from "../utils/storage";
import { toast } from "react-toastify";

interface LoginFormProps {
    callback: (isSuccess: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ callback }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios({
            method: "POST",
            url: `${import.meta.env.VITE_API_URL}/auth/login`,
            data: {
                email,
                password,
            },
        })
            .then(({ data, status }) => {
                console.log(data);
                if (status === 200) {
                    setStorage("accessToken", { accessToken: data.data.accessToken });
                    setStorage("refreshToken", { refreshToken: data.data.refreshToken });
                    toast.success("Login success");
                    callback(true);
                }
            })
            .catch((e: AxiosError) => {
                if (e.response) {
                    console.log(e.response.data);
                    toast.error("loggin failed. check credentials");
                }
                callback(false);
            });
    };

    return (
        <>
            <h3>Login</h3>
            <form onSubmit={loginHandler}>
                <div>
                    <input type="text" value={email} placeholder="email" onChange={(e) => setEmail(e.currentTarget.value)} />
                </div>
                <div>
                    <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.currentTarget.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default LoginForm;
