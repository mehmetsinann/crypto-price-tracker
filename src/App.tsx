import React from "react";
import "./App.css";
import AppBar from "./components/AppBar";
import CoinContainer from "./components/CoinContainer";

function App() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <AppBar />
      <CoinContainer />
    </div>
  );
}

export default App;
