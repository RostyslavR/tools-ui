import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Layout } from "./components/Layuot/Layout";

const Home = lazy(() => import("./pages/Home"));
const CheckLink = lazy(() => import("./pages/CheckLink"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="checklink" element={<CheckLink />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
