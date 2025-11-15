import Elysia from "elysia";
import { storyStore } from "../utils/memory_storage";

// Initialize story at startup
(async () => {
  storyStore
    .initialize()
    .then(() => console.log("Story initialized at startup"))
    .catch((err) => console.error("Failed to initialize story", err));
})();

export const gen = new Elysia({ prefix: "/gen" })
  // Return full story
  .get("/full-story", ({ set }) => {
    try {
      const data = storyStore.getInstance();
      return { data };
    } catch (error) {
      set.status = 500;
      return { error: "Story not ready", details: String(error) };
    }
  })

  // Return only entities
  .get("/entities", ({ set }) => {
    try {
      const { entities } = storyStore.getInstance();
      return { entities };
    } catch (error) {
      set.status = 500;
      return { error: "Entities not ready", details: String(error) };
    }
  })

  // Return only intro/context
  .get("/intro", ({ set }) => {
    try {
      const { context } = storyStore.getInstance();
      return { context };
    } catch (error) {
      set.status = 500;
      return { error: "Intro not ready", details: String(error) };
    }
  })

  // Return only dialogs
  .get("/dialogs", ({ set }) => {
    try {
      const { dialogs } = storyStore.getInstance();
      return { dialogs };
    } catch (error) {
      set.status = 500;
      return { error: "Dialogs not ready", details: String(error) };
    }
  })

  // Regenerate story
  .post("/reset", async ({ set }) => {
    try {
      const reset = await storyStore.reset();
      const init = await storyStore
        .initialize()
        .then(() => console.log("Reinit the data initialized at startup"))
        .catch((err) => console.error("Failed to initialize story", err));
      const data = storyStore.getInstance();
      return { init };
    } catch (error) {
      set.status = 500;
      return { error: "Failed to reset story", details: String(error) };
    }
  });
