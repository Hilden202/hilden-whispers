import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Trash2 } from "lucide-react";
import { getEpisode, deleteEpisode } from "@/lib/episodes";
import AudioPlayer from "@/components/AudioPlayer";
import { Button } from "@/components/ui/button";

const EpisodePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const episode = id ? getEpisode(id) : undefined;

  if (!episode) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center pt-28">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-semibold">Episoden hittades inte</h2>
          <Link to="/" className="text-primary hover:underline">
            Tillbaka till startsidan
          </Link>
        </div>
      </div>
    );
  }

  const date = new Date(episode.uploadDate).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDelete = () => {
    if (confirm("Är du säker på att du vill ta bort denna episod?")) {
      deleteEpisode(episode.id);
      navigate("/");
    }
  };

  return (
    <div className="container pb-20 pt-28">
      <div className="mx-auto max-w-3xl animate-fade-in">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Tillbaka
        </Link>

        <div className="mb-8">
          <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            {episode.title}
          </h1>
          <div className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <p className="leading-relaxed text-foreground/80">
            {episode.description}
          </p>
        </div>

        <AudioPlayer src={episode.audioUrl} isActive />

        <div className="mt-8 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Ta bort episod
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EpisodePage;
