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

  // Initialize at startup
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

  // Get current instance
  getInstance(): DataInstance {
    if (!this.instance) {
      throw new Error("Story not initialized yet");
    }
    return this.instance;
  }

  // Reset story
  async reset(): Promise<DataInstance> {
    this.instance = null;
    return this.initialize();
  }
}

// Export a singleton
export const dataStore = new DataStore();
