import React, { useContext } from "react";
import ReactModal from "react-modal";
import { GlobalContext } from "../context/GlobalContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface LoginModalProps {
    children?: React.ReactNode;
    modalState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const AuthModal: React.FC<LoginModalProps> = ({ modalState }) => {
    const [isOpenModal, setOpenModal] = modalState;
    const { logged, setLogged } = useContext(GlobalContext);
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
                        <>{/* User card and logout */}</>
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
