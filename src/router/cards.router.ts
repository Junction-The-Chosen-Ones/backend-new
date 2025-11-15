import Elysia from "elysia";

export const cards = new Elysia({ prefix: "/cards" }).get("/", async () => {
  return "Hello, World!";
});
