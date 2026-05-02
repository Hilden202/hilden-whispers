export interface Episode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  uploadDate: string;
}

const STORAGE_KEY = "hilden-visioner-episodes";

export function getEpisodes(): Episode[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  return JSON.parse(data);
}

export function getEpisode(id: string): Episode | undefined {
  return getEpisodes().find((e) => e.id === id);
}

// READ-ONLY MODE: write operations are disabled but kept for future restoration.
export function saveEpisode(episode: Omit<Episode, "id" | "uploadDate">): Episode {
  console.warn("[read-only mode] saveEpisode is disabled.");
  // const episodes = getEpisodes();
  // const newEpisode: Episode = {
  //   ...episode,
  //   id: crypto.randomUUID(),
  //   uploadDate: new Date().toISOString(),
  // };
  // episodes.unshift(newEpisode);
  // localStorage.setItem(STORAGE_KEY, JSON.stringify(episodes));
  // return newEpisode;
  return {
    ...episode,
    id: "",
    uploadDate: new Date().toISOString(),
  };
}

export function deleteEpisode(id: string): void {
  console.warn("[read-only mode] deleteEpisode is disabled.", id);
  // const episodes = getEpisodes().filter((e) => e.id !== id);
  // localStorage.setItem(STORAGE_KEY, JSON.stringify(episodes));
}
