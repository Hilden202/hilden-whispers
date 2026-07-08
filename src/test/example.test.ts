import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { getEpisode, getEpisodes } from "@/lib/episodes";

const publicDir = join(process.cwd(), "public");

describe("episodes", () => {
  it("includes the real podcast episodes", () => {
    const episodes = getEpisodes();

    expect(episodes).toHaveLength(3);
    expect(episodes[0]).toMatchObject({
      id: "hilden-podd-avsnitt-1",
      title: "Hilden Podd Avsnitt 1",
      audioUrl: "/audio/hilden-podd-avsnitt-1.mp3",
      coverImage: "/images/avsnitt_1.png",
    });
    expect(episodes[1]).toMatchObject({
      id: "hilden-podd-avsnitt-2",
      title: "Hilden Podd – Avsnitt 2: Dinosaurierna som fortfarande syns",
      description:
        "Ett tankeexperiment om dinosaurier, information, observation och vad 'nuet' egentligen betyder.",
      audioUrl: "/audio/hilden-Podd-avsnitt-2.mp3",
      coverImage: "/images/avsnitt_2.png",
    });
    expect(episodes[2]).toMatchObject({
      id: "hilden-podd-avsnitt-3",
      title: "Hilden Podd – Avsnitt 3: Medvetandet och själsteorin",
      description:
        "Vad är det egentligen som gör att vi fortfarande är oss själva? Ett utforskande av identitet, medvetande och Hilden Själsteori.",
      audioUrl: "/audio/hilden-Podd-avsnitt-3.mp3",
      coverImage: "/images/avsnitt_3.png",
    });
    expect(getEpisode("hilden-podd-avsnitt-1")).toBe(episodes[0]);
    expect(getEpisode("hilden-podd-avsnitt-2")).toBe(episodes[1]);
    expect(getEpisode("hilden-podd-avsnitt-3")).toBe(episodes[2]);
  });

  it("points every episode at existing public media files", () => {
    for (const episode of getEpisodes()) {
      const audioPath = join(publicDir, episode.audioUrl.replace(/^\//, ""));
      const coverPath = join(publicDir, episode.coverImage.replace(/^\//, ""));

      expect(existsSync(audioPath), `${episode.id} audio`).toBe(true);
      expect(existsSync(coverPath), `${episode.id} cover`).toBe(true);
    }
  });
});
