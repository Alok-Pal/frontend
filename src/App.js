import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Components/Login";
import UserTable from "./Components/Table";
import AddTask from './pages/AddTask'
import Registration from "./Components/Registration";
import { Toaster } from "react-hot-toast";
import { ToastErrorSvg, ToastSuccessSvg } from "./utils/svg";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/table" element={<UserTable />} />
        <Route path="/registration" element={< Registration />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
    <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName="toast-container-custom"
        toastOptions={{
          success: {
            icon: (
              <div className="toast-container-div">
                <ToastSuccessSvg />
              </div>
            ),
            style: {
              backgroundColor: "#009049",
              color: "#fff",
              fontSize: "16px",
            },
          },
          error: {
            icon: (
              <div className="toast-container-div">
                <ToastErrorSvg />
              </div>
            ),
            style: {
              backgroundColor: "red",
              color: "#fff",
              fontSize: "16px",
            },
          },
        }}
      />
    </>
  );
}

export default App;
