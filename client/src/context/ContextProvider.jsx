import { createContext, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("token") || "");
  const navigate = useNavigate();
  const serverOrigin = "http://localhost:5000/api";

  const registerUser = async (userData) => {
    try {
      const res = await axios.post(`${serverOrigin}/user/register`, userData, {
        headers: { "Content-Type": "application/json" },
      });
      const { message, data } = res;

      toast.success(message);
      Cookies.set("token", data.data.token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      setUser(data.data.user);
      await navigate("/dashboard");
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message);
    }
  };

  const loginUser = async (userData) => {
    try {
      const res = await axios.post(`${serverOrigin}/user/login`, userData, {
        headers: { "Content-Type": "application/json" },
      });
      const { message, data } = res.data;
      toast.success(message);
      Cookies.set("token", data.token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      setUser(data.user);
      await navigate("/dashboard");
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    Cookies.remove("token");
    navigate("/auth");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, registerUser, loginUser, logOut }}
    >
      <Navbar />
      {/* <div className="max-w-[1280px] mx-auto"> */}
      {children}
      {/* </div> */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
