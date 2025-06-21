import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./shared/components/root-layout.tsx", [
    index("./routes/home.tsx"),
    route(
      "/intensity-select",
      "./routes/intensity-select/intensity-select.tsx",
    ),
    route("/image-studio", "./routes/image-studio/image-studio.tsx"),
    route("/result", "./routes/result/result.tsx"),
    route("/toast-test", "./routes/toast-test/toast-test.tsx"),
  ]),
] satisfies RouteConfig;
