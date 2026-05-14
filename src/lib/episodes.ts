import { publicAssetUrl } from "@/lib/public-assets";

export interface Episode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  uploadDate: string;
}

const EPISODES: Episode[] = [
  {
    id: "hilden-podd-avsnitt-1",
    title: "Hilden Podd Avsnitt 1",
    description: "Första avsnittet av Hilden Podd.",
    audioUrl: publicAssetUrl("/audio/hilden-podd-avsnitt-1.mp3"),
    uploadDate: "2026-05-14T00:00:00.000Z",
  },
];

export function getEpisodes(): Episode[] {
  return EPISODES;
}

export function getEpisode(id: string): Episode | undefined {
  return getEpisodes().find((e) => e.id === id);
}

// READ-ONLY MODE: write operations are disabled but kept for future restoration.
export function saveEpisode(episode: Omit<Episode, "id" | "uploadDate">): Episode {
  console.warn("[read-only mode] saveEpisode is disabled.");
  return {
    ...episode,
    id: "",
    uploadDate: new Date().toISOString(),
  };
}

export function deleteEpisode(id: string): void {
  console.warn("[read-only mode] deleteEpisode is disabled.", id);
}
