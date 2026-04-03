import { Link } from "react-router-dom";
import { Calendar, Headphones } from "lucide-react";
import type { Episode } from "@/lib/episodes";

interface EpisodeCardProps {
  episode: Episode;
  index: number;
}

const EpisodeCard = ({ episode, index }: EpisodeCardProps) => {
  const date = new Date(episode.uploadDate).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      to={`/episode/${episode.id}`}
      className="group block animate-fade-in rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-surface-hover"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
          <Headphones className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="mb-1.5 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {episode.title}
          </h3>
          <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {episode.description}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
            <Calendar className="h-3.5 w-3.5" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EpisodeCard;
