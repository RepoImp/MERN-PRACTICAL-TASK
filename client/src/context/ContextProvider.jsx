import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [boards, setBoards] = useState([]);
  const [boardId, setBoardId] = useState("");
  const navigate = useNavigate();
  const serverOrigin = "http://localhost:5000/api";

  const registerUser = async (userData) => {
    try {
      const res = await axios.post(`${serverOrigin}/user/register`, userData, {
        headers: { "Content-Type": "application/json" },
      });
      const { message, data } = res.data;
      Cookies.set("token", data.token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      setUser(data.user);
      navigate("/dashboard");
      toast.success(message);
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (userData) => {
    try {
      const res = await axios.post(`${serverOrigin}/user/login`, userData, {
        headers: { "Content-Type": "application/json" },
      });
      const { message, data } = res.data;
      Cookies.set("token", data.token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      setUser(data.user);
      navigate("/dashboard");
      toast.success(message);
    } catch (error) {
      console.log(error);
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

  const getAllBoards = async () => {
    try {
      const res = await axios.get(`${serverOrigin}/board/get`, {
        headers: { "Content-Type": "application/json", token },
      });
      const { data } = res;
      const boards = data.data.map((ele) => {
        return { title: ele.title, id: ele._id };
      });
      setBoards(boards);
      setBoardId(boards[0]?.id);
    } catch (error) {
      const { message } = error.response.data;
      // toast.error(message);
      console.log(message);
    }
  };

  const getAllColumns = async (board_id) => {
    try {
      const res = await axios.get(`${serverOrigin}/columns/get/${board_id}`, {
        headers: { "Content-Type": "application/json", token },
      });
      const { data } = res;
      const columns = data.data.map((ele) => {
        return { title: ele.title, id: ele._id };
      });
      return columns;
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message);
    }
  };

  const getAllTasks = async (column_id) => {
    try {
      const res = await axios.get(`${serverOrigin}/task/get/${column_id}`, {
        headers: { "Content-Type": "application/json", token },
      });
      const { data } = res;
      const tasks = data.data.map((ele) => {
        return {
          title: ele.title,
          id: ele._id,
          column_id: ele.column_id,
          priority: ele.priority,
          description: ele.description,
          dueDate: ele.dueDate,
          color: ele.color,
        };
      });
      return tasks;
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message);
    }
  };
  const deleteTask = async (task_id) => {
    try {
      const res = await axios.delete(`${serverOrigin}/task/delete/${task_id}`, {
        headers: { "Content-Type": "application/json", token },
      });
      const { message } = res.data;
      toast.success(message);
      navigate("/dashboard");
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message);
    }
  };

  useEffect(() => {
    getAllBoards();
    if (boards.length < 1) {
      navigate("/add-board");
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        token,
        user,
        registerUser,
        loginUser,
        logOut,
        boards,
        getAllColumns,
        getAllTasks,
        serverOrigin,
        deleteTask,
        boardId,
        setBoardId,
      }}
    >
      <Navbar />
      {/* <div className="max-w-[1280px] mx-auto"> */}
      {children}
      {/* </div> */}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
