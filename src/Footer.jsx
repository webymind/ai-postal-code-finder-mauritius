import React from "react";

const Footer = () => (
  <footer
    className="text-center py-3 shadow-lg hoe mt-4"
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.85)", // Translucent white background
      backdropFilter: "blur(1px)", // Blur effect for consistency
      borderRadius: "10px", // Rounded corners for card-like appearance
      // width: "fit-content", // Make width compact
      // margin: "0 auto", // Center align horizontally
      padding: "10px 20px", // Add padding for better spacing
      color: "#000", // Dark text color for readability
      display: "flex",
      justifyContent: "center",
    }}
  >
    &copy;{" "}
    <a
      style={{
        color: "#76c014",
        textDecoration: "none",
      }}
      href="https://tizardin.mu"
      rel="follow"
    >
      Tizardin.mu
    </a>{" "}
    - All Rights Reserved
  </footer>
);

export default Footer;
