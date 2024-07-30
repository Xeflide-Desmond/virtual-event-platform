import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import LiveStream from "./components/LiveStream";
import AuthProvider from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/stream/:roomId" element={<LiveStream />} />
          <Route path="/" element={<EventList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
