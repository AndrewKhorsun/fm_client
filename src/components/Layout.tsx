import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <h1>THIS IS LAYOUT</h1>

      <Outlet />
    </div>
  );
};
