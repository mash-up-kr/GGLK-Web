import { Outlet } from "react-router";
import Toaster from "./toast/toaster";

export default function RootLayout() {
  return (
    <div className="flex h-screen flex-col items-center">
      <div className="relative h-full w-full max-w-3xl">
        <Outlet />
        <div className="pointer-events-none absolute inset-0">
          <Toaster position="bottom-center" />
        </div>
      </div>
    </div>
  );
}
