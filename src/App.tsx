import React, { useEffect } from "react";
import Header from "./components/views/Header";
import AppRouter from "./components/routing/routers/AppRouter";

const App = () => {
  useEffect(() => {
    // Check for the token on page load
    const token = localStorage.getItem("token");
    // You may want to implement further logic based on the token, e.g., user authentication
    console.log("Token on page load:", token);
  }, []);

  return (
    <div>
      <Header height="100" />
      <AppRouter />
    </div>
  );
};

export default App;
