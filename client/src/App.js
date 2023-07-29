import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { SignIn, SignUp, Error, Dashboard, ProtectedRoute } from "./Pages";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>

        <Route path="/" element={<SignIn />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
