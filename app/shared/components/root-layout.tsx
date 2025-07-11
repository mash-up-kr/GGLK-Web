import { Outlet } from "react-router";
import Toaster from "./toast/toaster";

export default function RootLayout() {
  return (
    <div className="flex h-svh flex-col items-center">
      <div className="relative w-full max-w-3xl grow">
        <Outlet />
        <div className="pointer-events-none absolute inset-0">
          <Toaster position="bottom-center" />
        </div>
      </div>
    </div>
  );
}
