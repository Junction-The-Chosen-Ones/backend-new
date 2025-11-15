export function pickRandom<T>(arr: T[], count: number): T[] {
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy.slice(0, Math.min(count, copy.length));
}
export const Random = {
  randomInt(max: number) {
    return Math.floor(Math.random() * (max + 1));
  },

  randomIndex(max: number) {
    return Math.floor(Math.random() * max);
  },

  randomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};
