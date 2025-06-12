import { BsMenuButton } from "react-icons/bs";
import { CiClock1 } from "react-icons/ci";
function getRandomHexColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

const Task = () => {
  const randomColor = getRandomHexColor();
  return (
    <div className="border border-orange-200 p-5 rounded-lg bg-white flex flex-col gap-3">
      <span
        className={`text-sm rounded-sm text-white px-2 w-fit`}
        style={{ backgroundColor: randomColor }}
      >
        Product
      </span>
      <div>Product</div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-gray-500">
          <CiClock1 />
          <span>Oct 31</span>
          <BsMenuButton />
        </span>
        <span className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-gray-300"></div>
          <div className="h-7 w-7 rounded-full bg-gray-300"></div>
        </span>
      </div>
    </div>
  );
};

export default Task;
