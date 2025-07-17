import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./shared/components/root-layout.tsx", [
    index("./routes/home.tsx"),
    route("/analyze", "./routes/analyze/analyze.tsx"),
    route("/result", "./routes/result/result.tsx"),
    route("/auth/kakao", "./routes/auth/kakao.tsx"),
  ]),
] satisfies RouteConfig;
