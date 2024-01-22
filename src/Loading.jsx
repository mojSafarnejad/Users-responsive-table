import React from "react";
import loading from "./image/loading.gif";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <img src={loading} alt="loading..."></img>
    </div>
  );
};
export default Loading;
