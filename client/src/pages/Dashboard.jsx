import Column from "../components/Column";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-3 p-5  rounded-3xl gap-5 w-[100dvw]">
      <Column></Column>
      <Column></Column>
      <Column></Column>
    </div>
  );
};

export default Dashboard;
