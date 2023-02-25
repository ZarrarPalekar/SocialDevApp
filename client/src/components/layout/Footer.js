import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#1e1812",
        textAlign: "center",
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100vw",
        color: "white",
      }}
    >
      Copyright &copy; {new Date().getFullYear()}{" "}
      <a href="https://www.zarrarpalekar.com" target="_blank" rel="noreferrer">
        Zarrar
      </a>{" "}
      Dev Social
    </footer>
  );
};

export default Footer;
