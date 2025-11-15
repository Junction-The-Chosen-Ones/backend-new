// utils/memory_storage.ts
import { Story, Card } from "../models/models";
import { generateCards, generateStory } from "../services/generation.service";

type DataInstance = {
  story: Story;
  cards: Card[];
};

class DataStore {
  private instance: DataInstance | null = null;
  private initializing: Promise<void> | null = null;

  // Existing behavior — unchanged
  async initialize(): Promise<DataInstance> {
    if (!this.instance) {
      if (!this.initializing) {
        this.initializing = (async () => {
          const story = await generateStory();
          const cards = await generateCards();
          this.instance = { story, cards };
        })();
      }
      await this.initializing;
      this.initializing = null;
    }
    return this.instance!;
  }

  // Existing behavior — unchanged
  getInstance(): DataInstance {
    if (!this.instance) {
      throw new Error("Story not initialized yet");
    }
    return this.instance;
  }

  // Existing behavior — unchanged
  async reset(): Promise<DataInstance> {
    this.instance = null;
    return this.initialize();
  }

  // NEW METHOD (does not touch original ones)
  async reinitialize(): Promise<{ previous: DataInstance; current: DataInstance }> {
    if (!this.instance) {
      throw new Error("Cannot reinitialize before initialization.");
    }

    const previous = this.instance;

    // Generate NEW story + cards
    const newStory = await generateStory();
    const newCards = await generateCards();

    const current = { story: newStory, cards: newCards };

    // Replace instance with new one
    this.instance = current;

    // Return both old AND new
    return { previous, current };
  }
}

export const dataStore = new DataStore();
