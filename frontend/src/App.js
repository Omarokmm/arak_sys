import { BrowserRouter as Router, Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/home/home";
import Login from "./pages/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Departments from "./components/Layout/Departments";
import Users from "./components/Layout/Users";
import Doctors from "./components/Layout/Doctors";
import RequireAuth from "./actions/RequiredAuth";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <div className="pages">
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Login />} />
            <Route element={<RequireAuth allowedRoles={[0]} />}>
              <Route path="layout" element={<Layout />}>
                <Route path="users" element={<Users />} />
                <Route path="departments" element={<Departments />} />
                <Route path="doctors" element={<Doctors />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
