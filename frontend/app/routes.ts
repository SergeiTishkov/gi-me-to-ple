import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  {
    path: "*",
    file: "routes/not-found.tsx",
  },
  {
    path: "test",
    file: "routes/test-route.tsx",
  }
] satisfies RouteConfig;
