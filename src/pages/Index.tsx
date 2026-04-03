import { useState, useEffect } from "react";
import { Podcast } from "lucide-react";
import { getEpisodes, type Episode } from "@/lib/episodes";
import EpisodeCard from "@/components/EpisodeCard";

const Index = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    setEpisodes(getEpisodes());
  }, []);

  return (
    <div className="container pb-20 pt-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 animate-fade-in text-center">
          <h1 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl">
            <span className="text-gradient">Hilden Visioner</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Teknik, tankar och visioner – en podcast av Hilden Media
          </p>
        </div>

        {episodes.length === 0 ? (
          <div className="animate-fade-in-slow flex flex-col items-center justify-center rounded-2xl border border-border/30 bg-card/20 py-20 text-center">
            <Podcast className="mb-4 h-12 w-12 text-muted-foreground/40" />
            <h2 className="mb-2 text-xl font-medium text-foreground/70">
              Inga episoder ännu
            </h2>
            <p className="text-sm text-muted-foreground">
              Ladda upp din första episod via admin-panelen.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {episodes.map((episode, i) => (
              <EpisodeCard key={episode.id} episode={episode} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
