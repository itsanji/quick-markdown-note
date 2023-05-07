import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface RegisterFormProps {
    callback: (isSuccess: boolean) => void;
}

export type RegisterError = {
    location: string;
    msg: string;
    param: string;
    value: string;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ callback }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios({
            method: "POST",
            url: `${import.meta.env.VITE_API_URL}/auth/register`,
            data: {
                username: name,
                email,
                password,
                firstname,
                lastname,
            },
        })
            .then(({ data }) => {
                console.log(data);
                if (data.ok) {
                    callback(true);
                    toast.success("Register successed");
                } else {
                    callback(false);
                    console.log(data);
                    toast.error("Register failed");
                }
            })
            .catch((e: AxiosError<ResponsePayload>) => {
                if (e.response && e.response.data) {
                    console.log(e.response.data);
                    if (e.response.data.message! === "Input validation error") {
                        const errors = e.response.data.data.error as RegisterError[];
                        errors.forEach((error) => {
                            toast.error(error.msg);
                        });
                    }
                }
                callback(false);
            });
    };
    return (
        <>
            <h3>Register</h3>
            <form onSubmit={registerHandler}>
                <div>
                    <input type="text" value={name} placeholder="name" onChange={(e) => setName(e.currentTarget.value)} />
                </div>
                <div>
                    <input type="text" value={email} placeholder="email" onChange={(e) => setEmail(e.currentTarget.value)} />
                </div>

                <div>
                    <input type="text" value={firstname} placeholder="firstname" onChange={(e) => setFirstname(e.currentTarget.value)} />
                </div>
                <div>
                    <input type="text" value={lastname} placeholder="lastname" onChange={(e) => setLastname(e.currentTarget.value)} />
                </div>
                <div>
                    <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.currentTarget.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default RegisterForm;
