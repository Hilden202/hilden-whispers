import { describe, it, expect } from "vitest";
import { getEpisode, getEpisodes } from "@/lib/episodes";

describe("episodes", () => {
  it("includes the real first episode", () => {
    const episodes = getEpisodes();

    expect(episodes).toHaveLength(1);
    expect(episodes[0]).toMatchObject({
      id: "hilden-podd-avsnitt-1",
      title: "Hilden Podd Avsnitt 1",
      audioUrl: "/audio/hilden-podd-avsnitt-1.mp3",
    });
    expect(getEpisode("hilden-podd-avsnitt-1")).toBe(episodes[0]);
  });
});
