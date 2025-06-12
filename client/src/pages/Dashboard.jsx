import { useContext, useEffect, useState } from "react";
import Column from "../components/Column";
import { AppContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [columns, setColumns, boards] = useState([]);
  const { getAllColumns, boardId } = useContext(AppContext);
  const navigate = useNavigate();

  // console.log({ boardId });

  useEffect(() => {
    (async () => {
      if (boardId) {
        const cols = await getAllColumns(boardId);
        setColumns(cols);
      }
    })();
  }, [boardId]);
  useEffect(() => {
    if (!boards || boards.length < 1) {
      navigate("/add-board");
    }
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-5  rounded-3xl gap-5 w-[100dvw]">
      {columns.map((ele) => {
        return <Column key={ele.id} {...ele} />;
      })}
    </div>
  );
};

export default Dashboard;
