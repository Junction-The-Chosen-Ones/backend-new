import Elysia from "elysia";
import {
  generateEntities,
  generateIntro,
  generateStory,
} from "../services/generation.service";

export const gen = new Elysia({ prefix: "/gen" })
  .state("entities", {})
  .get("/full-story", async ({ set, store }) => {
    try {
      const data = await generateStory();
      return { data };
    } catch (error) {
      console.error("Error generating story:", error);
      set.status = 500;

      return {
        error: "Story generation failed",
        details: String(error),
      };
    }
  })
  .get("/entities", async ({ set, store }) => {
    try {
      const entities = await generateEntities();
      store.entities;
      return { entities };
    } catch (error) {
      console.error("Error generating entities:", error);
      set.status = 500;

      return {
        error: "Entities generation failed",
        details: String(error),
      };
    }
  })
  .get("/intro", async ({ set }) => {
    try {
      const intro = await generateIntro();
      return { context: intro };
    } catch (error) {
      console.error("Error generating intro:", error);
      set.status = 500;

      return {
        error: "Intro generation failed",
        details: String(error),
      };
    }
  });
// .get("/dialogs", async ({ set, store }) => {
//   try {
//     const dialogs = await generateDialogs(store.);
//     return { dialogs };
//   } catch (error) {
//     console.error("Error generating dialogs:", error);
//     set.status = 500;

//     return {
//       error: "Dialogs generation failed",
//       details: String(error),
//     };
//   }
// });
