// utils/memory_storage.ts
import { Story, Entity, Dialog } from "../models/models";
import { generateStory } from "../services/generation.service";

type StoryInstance = Story;

class StoryStore {
  private instance: StoryInstance | null = null;
  private initializing: Promise<void> | null = null;

  // Initialize at startup
  async initialize(): Promise<StoryInstance> {
    if (!this.instance && !this.initializing) {
      this.initializing = (async () => {
        this.instance = await generateStory();
      })();

      await this.initializing;
      this.initializing = null;
    }
    return this.instance!;
  }

  // Get current instance
  getInstance(): StoryInstance {
    if (!this.instance) {
      throw new Error("Story not initialized yet");
    }
    return this.instance;
  }

  // Reset story
  async reset(): Promise<StoryInstance> {
    this.instance = null;
    return this.initialize();
  }
}

// Export a singleton
export const storyStore = new StoryStore();
