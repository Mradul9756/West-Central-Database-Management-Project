//import {BrowserRouter, Switch, Routes, Route} from "react-router-dom";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// use react toastify - https://www.npmjs.com/package/react-toastify
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home.js";
import Login from "./pages/Login";
import View from "./pages/View.js"
import Sort from "./pages/Sort.js";

import { useEffect, useState } from "react";
// register the route to home (use switch)
function App() {
const fectechStatus = localStorage.getItem("status")
const [status, setStatus] = useState(false)

useEffect(() => {
  console.log("chaged", status)
  setStatus(fectechStatus)
}, [status])

  return (
    <Router>
      <div className="App">
          <Routes>
            <Route path="/" element={status?  <Home/>: <Login/>} />
            <Route path="/addContact" element={status? <AddEdit/> : <Login/>} />
            <Route path="/update/:Id" element={status? <AddEdit/> : <Login/>} />
            <Route path="/view/:Id" element={status? <View/> : <Login/>} />
            <Route path="/login" element={ status? <Login />: <Login/>} />
            <Route path="/sort" element={status? <Sort /> : <Login/>} />
         </Routes>
      </div>
    </Router>
  );
}
export default App;