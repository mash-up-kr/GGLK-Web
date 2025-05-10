import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./shared/components/root-layout.tsx", [
    index("./routes/home.tsx"),
    route("/flavor-select", "./routes/flavor-select/flavor-select.tsx"),
    route("/image-studio", "./routes/image-studio/image-studio.tsx"),
    route("/result", "./routes/result/result.tsx"),
  ]),
] satisfies RouteConfig;
