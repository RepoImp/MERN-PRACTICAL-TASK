import Task from "./Task";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

const Column = () => {
  return (
    <div className="relative flex flex-col gap-2 px-5 py-2 border-2 border-gray-600 w-full bg-gray-100 h-full">
      <div className="flex w-full justify-between items-center px-10">
        <h2 className="font-semibold">Teams</h2>
        <span className="cursor-pointer">
          <BsThreeDots />
        </span>
      </div>
      <Task />
      <Task />
      <Task />
      <div className="px-5 bottom-5 flex items-center justify-center gap-5 w-fit h-[50px] cursor-pointer">
        <FaPlus />
        Add another Card
      </div>
    </div>
  );
};

export default Column;
