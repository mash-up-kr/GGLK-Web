import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="flex h-screen flex-col items-center">
      <div className="h-full w-full max-w-3xl">
        <Outlet />
      </div>
    </div>
  );
}
