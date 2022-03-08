import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/ui/Layout/Layout";
import { AuthContext } from "./context/AuthContext";
import Accommodation from "./pages/accomodation/Accommodation";
import { AccommodationList } from "./pages/accomodation/AccommodationList";
import Attraction from "./pages/attraction/Attraction";
import AttractionList from "./pages/attraction/AttractionList";
import Flight from "./pages/flight/Flight";
import FlightList from "./pages/flight/FlightList";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Profile from "./pages/profile/Profile";
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
              <Route path={"/profile/:uid"} element={user && <Profile />} />
              <Route
                path={"/signup"}
                element={!user ? <Signup /> : <Navigate to={"/"} />}
              />
              <Route
                path={"/login"}
                element={!user ? <Login /> : <Navigate to={"/"} />}
              />
              {/* --Accommodation page-- */}
              <Route path={"/accommodation"} element={<Accommodation />} />
              <Route
                path={"/accommodation/:place"}
                element={<AccommodationList />}
              />
              {/* --Flight page-- */}
              <Route path={"/flight"} element={<Flight />} />
              <Route path={"/flight/flightList"} element={<FlightList />} />
              {/* --attraction page-- */}
              <Route path={"/attraction"} element={<Attraction />} />
              <Route path={"/attraction/:place"} element={<AttractionList />} />
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
