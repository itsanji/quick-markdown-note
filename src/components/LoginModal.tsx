import React, { useContext } from "react";
import ReactModal from "react-modal";
import { GlobalContext } from "../context/GlobalContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { getStorage, setStorage } from "../utils/storage";
import UserInfoCard from "./UserInfoCard";
import { toast } from "react-toastify";
import axios from "axios";

interface LoginModalProps {
    children?: React.ReactNode;
    modalState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const AuthModal: React.FC<LoginModalProps> = ({ modalState }) => {
    const [isOpenModal, setOpenModal] = modalState;
    const { logged, setLogged } = useContext(GlobalContext);

    const logout = () => {
        const refreshToken = getStorage("refreshToken");
        if (!refreshToken.refreshToken) {
            setLogged(false);
            setStorage("accessToken", "");
            toast.warn("You are not logged in.");
            return;
        }
        axios({
            url: `${import.meta.env.VITE_API_URL}/auth/token/logout`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${refreshToken.refreshToken}`,
            },
        })
            .then(({ data }) => {
                console.log(data);
                toast.success("Logout successfully.");
            })
            .catch((e) => {
                console.log(e);
                toast.warn("some error occured. but u logged out anyway");
            });
        setStorage("accessToken", "");
        setStorage("refreshToken", "");
        setLogged(false);
    };

    return (
        <>
            <ReactModal
                isOpen={isOpenModal}
                onRequestClose={() => {
                    setOpenModal(false);
                }}
                ariaHideApp={false}
                style={{
                    overlay: {
                        zIndex: 2,
                        backgroundColor: "rgba(128, 135, 130, 0.9)",
                    },
                    content: {
                        borderRadius: "10px",
                        width: "400px",
                        left: "50%",
                        transform: "translateX(-50%)",
                    },
                }}
            >
                <div>
                    {logged ? (
                        <>
                            <UserInfoCard />
                            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 20 }}>
                                <button onClick={logout}>Logout</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <LoginForm
                                callback={(result) => {
                                    console.log(result);
                                    if (result) {
                                        setLogged(true);
                                        setOpenModal(false);
                                    }
                                }}
                            />
                            <h4>Or</h4>
                            {/* Or register */}
                            <RegisterForm
                                callback={(result) => {
                                    console.log(result);
                                }}
                            />
                        </>
                    )}
                </div>
            </ReactModal>
        </>
    );
};
export default AuthModal;
