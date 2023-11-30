import { Routes, Route } from "react-router-dom";
import { FC } from "react";
import { Layout } from "./components/Layout";

export const App: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<h1>LOGIN</h1>} />
      <Route path="/" element={<Layout />}>
        <Route path="personal" element={<h1>Personal</h1>} />
        <Route path="family" element={<h1>Family</h1>} />
      </Route>

      <Route path="*" element={<h1>NOT FOUND</h1>} />
    </Routes>
  );
};
