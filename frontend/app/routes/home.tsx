import type { Route } from "./+types/home";
import { Welcome } from "../components/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Give Me Tokens Please!!!" },
    { name: "description", content: "Gi-Me-To-Ple!!! home page" },
  ];
}

export default function Home() {
  return <Welcome />;
}
