import React from "react";
import Footer from "../components/Footer.jsx";
import AppBar from "../components/AppBar.jsx";

export default function Layout({ children }) {
  return (
    <>
      <AppBar />
      {children}
      <Footer />
    </>
  );
}
