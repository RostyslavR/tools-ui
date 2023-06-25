import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import "./Layout.css";

const Layout = () => {
  return (
    <>
      <div className="layout">
        <Header />
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
        <Footer />
      </div>
    </>
  );
};

export { Layout };
