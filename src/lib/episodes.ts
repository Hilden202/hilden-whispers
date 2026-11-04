import { publicAssetUrl } from "@/lib/public-assets";

export interface Episode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  coverImage: string;
  coverAspect?: "square" | "video";
  uploadDate: string;
}

const EPISODES: Episode[] = [
  {
    id: "hilden-podd-avsnitt-1",
    title: "Hilden Podd Avsnitt 1",
    description: "Första avsnittet av Hilden Podd.",
    audioUrl: publicAssetUrl("/audio/hilden-podd-avsnitt-1.mp3"),
    coverImage: publicAssetUrl("/images/avsnitt_1.png"),
    uploadDate: "2026-05-14T00:00:00.000Z",
  },
  {
    id: "hilden-podd-avsnitt-2",
    title: "Hilden Podd – Avsnitt 2: Dinosaurierna som fortfarande syns",
    description:
      "Ett tankeexperiment om dinosaurier, information, observation och vad 'nuet' egentligen betyder.",
    audioUrl: publicAssetUrl("/audio/hilden-Podd-avsnitt-2.mp3"),
    coverImage: publicAssetUrl("/images/avsnitt_2.png"),
    uploadDate: "2026-06-05T00:00:00.000Z",
  },
  {
    id: "hilden-podd-avsnitt-3",
    title: "Hilden Podd – Avsnitt 3: Medvetandet och själsteorin",
    description:
      "Vad är det egentligen som gör att vi fortfarande är oss själva? Ett utforskande av identitet, medvetande och Hilden Själsteori.",
    audioUrl: publicAssetUrl("/audio/hilden-Podd-avsnitt-3.mp3"),
    coverImage: publicAssetUrl("/images/avsnitt_3.png"),
    uploadDate: "2026-07-09T00:00:00.000Z",
  },
  {
    id: "hilden-podd-avsnitt-4",
    title: "Hilden Podd – Avsnitt 4: Tidsresor och paradoxen",
    description:
      "Kan man verkligen resa i tiden? Och om man kan, vad händer då med paradoxen? Vi utforskar tidsresor och dess konsekvenser.",
    audioUrl: publicAssetUrl("/audio/hilden-podd-avsnitt-4.mp3"),
    coverImage: publicAssetUrl("/images/avsnitt_4.png"),
    uploadDate: "2026-08-12T00:00:00.000Z",
  },
  {
    id: "hilden-podd-avsnitt-5",
    title: "Hilden Podd – Avsnitt 5: Vad ser vi egentligen när vi ser ett svart hål?",
    description:
      "Vad visar egentligen bilden av ett svart hål? Elias och Sara utforskar ljus, skuggor, händelsehorisonter och gränsen mellan det vi kan observera och det vi försöker förstå.",
    audioUrl: publicAssetUrl("/audio/hilden-podd-avsnitt-5.mp3"),
    coverImage: publicAssetUrl("/images/avsnitt_5.png"),
    uploadDate: "2026-10-31T00:00:00.000Z",
  },
  {
    id: "hilden-podd-avsnitt-6",
    title: "Hilden Podd – Avsnitt 6: Kan evolutionen börja samarbeta med AI?",
    description:
      "Tänk om nästa stora steg i evolutionen inte är en robot, utan något som föds. Elias och Sara utforskar hur AI och levande system skulle kunna utvecklas tillsammans, vilka nya förmågor det kan öppna för och vilket ansvar vi har för de första stegen. Ett samtal som skiljer dagens forskning från möjliga framtida tekniker och filosofiska hypoteser.",
    audioUrl: publicAssetUrl("/audio/hilden-podd-avsnitt-6.mp3"),
    coverImage: publicAssetUrl("/images/avsnitt_6.png"),
    coverAspect: "video",
    uploadDate: "2026-11-05T00:00:00.000Z",
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
