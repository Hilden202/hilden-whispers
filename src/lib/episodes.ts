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

export function saveEpisode(episode: Omit<Episode, "id" | "uploadDate">): Episode {
  const episodes = getEpisodes();
  const newEpisode: Episode = {
    ...episode,
    id: crypto.randomUUID(),
    uploadDate: new Date().toISOString(),
  };
  episodes.unshift(newEpisode);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(episodes));
  return newEpisode;
}

export function deleteEpisode(id: string): void {
  const episodes = getEpisodes().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(episodes));
}
