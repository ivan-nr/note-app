import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

const App = () => {
  const id = localStorage.getItem("userID");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path={`users/${id}`} element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
