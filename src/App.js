import './App.css';
import {BrowserRouter, Routes , Route,} from "react-router-dom";
import Post from "./components/Post/Post";
import Home from "./components/Home/Home";
import User from "./components/User/User";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar></Navbar>
          <Post></Post>
        <Routes >
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/users/:userId" element={<User/>}></Route>
        </Routes >
      </BrowserRouter>
    </div>
  );
}

export default App;
