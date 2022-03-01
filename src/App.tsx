import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/ui/Layout/Layout";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Signup from "./pages/signup/Signup";

function App() {
  const { authIsReady, user } = useContext<string | any>(AuthContext);
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path={"/signup"}
                element={!user ? <Signup /> : <Navigate to={"/"} />}
              />
              <Route
                path={"/login"}
                element={!user ? <Login /> : <Navigate to={"/"} />}
              />
               {/* 404 pages */}
               <Route path={"*"} element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
