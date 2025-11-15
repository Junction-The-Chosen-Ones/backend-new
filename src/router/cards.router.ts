import Elysia from "elysia";
import { generateCards } from "../services/generation.service";
import { dataStore } from "../utils/memory_storage";
import { pickRandom } from "../utils/randomize";

export const cards = new Elysia({ prefix: "/cards" })
  .get("/all-cards", ({ set }) => {
    try {
      const data = dataStore.getInstance();
      return { data: data.cards };
    } catch (error) {
      set.status = 500;
      return { error: "Story not ready", details: String(error) };
    }
  })
  .get("/random-card", ({ set }) => {
    try {
      const data = dataStore.getInstance();
      const randomCard = pickRandom(data.cards, 4)[0];
      
      return { data: randomCard };
    } catch (error) {
      set.status = 500;
      return { error: "Story not ready", details: String(error) };
    }
  });
