import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/ui/Layout/Layout";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home/>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
