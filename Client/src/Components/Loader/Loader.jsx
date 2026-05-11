import React from "react";
function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "1500px", height: "1500px" }} 
      >
        <source src="/Loader.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Loader;
