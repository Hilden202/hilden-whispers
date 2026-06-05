import { describe, it, expect } from "vitest";
import { getEpisode, getEpisodes } from "@/lib/episodes";

describe("episodes", () => {
  it("includes the real podcast episodes", () => {
    const episodes = getEpisodes();

    expect(episodes).toHaveLength(2);
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
      audioUrl: "/audio/Hilden Podd avsnitt 2.mp3",
      coverImage: "/images/avsnitt_2.png",
    });
    expect(getEpisode("hilden-podd-avsnitt-1")).toBe(episodes[0]);
    expect(getEpisode("hilden-podd-avsnitt-2")).toBe(episodes[1]);
  });
});
