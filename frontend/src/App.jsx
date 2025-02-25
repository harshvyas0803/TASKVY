import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Todos from "./pages/Todos";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Analytics from "./pages/Analytics";
import Reminder from "./pages/Reminder";
import Settings from "./pages/Settings";


const App = () => {

  
  return (
    <Layout>
      <Routes >
        <Route path="/" element={<Home/>} /> 
        <Route path="/todos" element={<Todos />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reminder" element={<Reminder />} />
        <Route path="/settings" element={<Settings />} />
 
      </Routes>
    </Layout>
  );
};

export default App;
