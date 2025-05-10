import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),

    route("/flavor-select", "./routes/flavor-select/flavor-select.tsx"),
    route("/settings", "./routes/settings/image.tsx"),
    route("/result", "./routes/result/result.tsx"),



] satisfies RouteConfig;
