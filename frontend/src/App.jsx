import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Projects from "./Pages/Projects";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />

        <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
       </Route>

        {/* Private Routes */}

        <Route element = {<ProtectedRoute />}>
             <Route path="/dashboard" element ={<DashboardLayout />}> 
             <Route index element={<Dashboard />} />
             <Route path="/dashboard/projects"element={<Projects />} />
             </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;