import { Route, Routes } from "react-router-dom/";
import "./App.css";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:5000";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
