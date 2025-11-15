import { Elysia } from "elysia";
import { gen } from "./router/generation.router";
import cors from "@elysiajs/cors";
import openapi from "@elysiajs/openapi";
import { dataStore } from "./utils/memory_storage";

const port = process.env.PORT || 3000;
async function fu() {
  console.log("Initializing data store...");
  try {
    await dataStore.initialize();
    console.log("Data store initialized at startup");
  } catch (err) {
    console.error("Failed to initialize story", err);
    process.exit(1); // exit if initialization fails
  }
}

function main(): void {
  const app = new Elysia()
    .use(openapi())
    .use(cors())
    .use(gen) // your /gen routes
    .get("/", () => "Hello Elysia")
    .listen(port);

  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
  );
}

// Initialize first, then run main
fu().then(() => {
  main();
});
