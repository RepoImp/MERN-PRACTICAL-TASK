import "./App.css";
import Auth from "./pages/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AuthProvider from "./context/ContextProvider";
import PrivateRoute from "./pages/PrivateRoute";
import AddBoard from "./pages/AddBoard";
import AddTask from "./pages/AddTask";
import UpdateTask from "./pages/UpdateTask";
import UpdateBoard from "./pages/UpdateBoard";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-board" element={<AddBoard />} />
          <Route path="/update-board/:board_id" element={<UpdateBoard />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/update-task/:task_id" element={<UpdateTask />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
