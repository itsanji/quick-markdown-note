import React, { useContext, useEffect, useState } from "react";
import { customAxiosInstance } from "../utils/axios";
import { GlobalContext } from "../context/GlobalContext";
import { setStorage } from "../utils/storage";
import { toast } from "react-toastify";
import { BiUserCircle } from "react-icons/bi";

interface UserInfoCardProps {
    children?: React.ReactNode;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({}) => {
    const [user, setUser] = useState({} as User);
    const { setLogged } = useContext(GlobalContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            customAxiosInstance
                .get(`${import.meta.env.VITE_API_URL}/user/profile`)
                .then(({ data }) => {
                    console.log(data.data.user);
                    setUser(data.data.user);
                    setLoading(false);
                })
                .catch((e) => {
                    console.log(e);
                    setStorage("accessToken", "");
                    setStorage("refreshToken", "");
                    setLogged(false);
                    toast.error("Your session has expired. Please login again.");
                });
        };
        getUser();
    }, []);
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <BiUserCircle size={70} />
                        <div>{user.profile.username}</div>
                        <div>{user.email}</div>
                        <hr style={{ width: "50%", marginTop: 20 }} />
                        <div>Created At: {new Date(user.profile.createdAt).toDateString()}</div>
                        <div>Update At: {new Date(user.profile.updatedAt).toDateString()}</div>
                    </>
                )}
            </div>
        </>
    );
};
export default UserInfoCard;
