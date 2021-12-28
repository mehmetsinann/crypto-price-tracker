import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_RIGHT,
  timeout: 4000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const AlertTemplate = ({ message }: any) => (
  <div className="w-full bg-transparent items-center flex h-full text-xl">
    {message}
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider
      template={AlertTemplate}
      {...options}
      className="bg-transparent"
    >
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
