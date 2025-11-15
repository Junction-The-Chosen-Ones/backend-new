import { Elysia } from "elysia";
import { gen } from "./router/generation.router";
import cors from "@elysiajs/cors";
import openapi from "@elysiajs/openapi";

const port = process.env.PORT || 3000;
const app = new Elysia()
  .use(openapi())
  .get("/", () => "Hello Elysia")
  .use(cors())
  .listen(port)
  .use(gen);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
