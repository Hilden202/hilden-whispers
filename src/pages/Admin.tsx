// ============================================================
// READ-ONLY MODE: The admin page is disabled.
// All original logic (login, upload form, file handling, save)
// is preserved below in a commented block so it can be restored.
// ============================================================

import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

/*
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Music } from "lucide-react";
import { saveEpisode } from "@/lib/episodes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

const ADMIN_PASSWORD = "hilden2024";
*/

const Admin = () => {
  /* READ-ONLY MODE: original admin logic disabled.
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoggedIn, login } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      login();
    } else {
      toast({
        title: "Fel lösenord",
        description: "Försök igen.",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac', '.wma'];
    const isAudio = file.type.startsWith("audio/") || audioExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    if (isAudio) {
      setAudioFile(file);
    } else {
      toast({
        title: "Ogiltigt format",
        description: "Vänligen välj en ljudfil (MP3, WAV, OGG, M4A).",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !audioFile) {
      toast({
        title: "Fyll i alla fält",
        description: "Titel, beskrivning och ljudfil krävs.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const audioUrl = reader.result as string;
      saveEpisode({ title, description, audioUrl });
      toast({
        title: "Episod uppladdad!",
        description: `"${title}" har lagts till.`,
      });
      navigate("/");
    };
    reader.onerror = () => {
      toast({
        title: "Fel vid uppladdning",
        description: "Något gick fel. Försök igen.",
        variant: "destructive",
      });
      setIsUploading(false);
    };
    reader.readAsDataURL(audioFile);
  };

  if (!isLoggedIn) {
    return (
      <div className="container pb-20 pt-28">
        <div className="mx-auto max-w-sm animate-fade-in">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Admin</h1>
            <p className="text-sm text-muted-foreground">
              Ange lösenord för att fortsätta.
            </p>
            <form onSubmit={handleLogin} className="mt-2 flex w-full flex-col gap-3">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Lösenord..."
                className="bg-card/50 text-center"
                autoFocus
              />
              <Button type="submit" className="w-full">Logga in</Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container pb-20 pt-28">
      <div className="mx-auto max-w-xl animate-fade-in">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-1 text-3xl font-bold tracking-tight">
              Ladda upp episod
            </h1>
            <p className="text-muted-foreground">
              Lägg till en ny episod till Hilden Visioner.
            </p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Inloggad som Admin
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Titel</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Episodtitel..."
              className="bg-card/50"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Beskrivning</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Beskriv episoden..."
              rows={4}
              className="bg-card/50"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Ljudfil</label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".mp3,.wav,.ogg,.m4a,.aac,.flac,.wma,audio/mpeg,audio/wav,audio/ogg,audio/mp4,audio/aac,audio/flac,audio/x-m4a"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border/50 bg-card/20 px-6 py-10 transition-all hover:border-primary/30 hover:bg-surface-hover"
            >
              {audioFile ? (
                <>
                  <Music className="h-8 w-8 text-primary" />
                  <span className="text-sm text-foreground">{audioFile.name}</span>
                  <span className="text-xs text-muted-foreground">Klicka för att byta fil</span>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-muted-foreground/50" />
                  <span className="text-sm text-muted-foreground">Klicka för att välja ljudfil</span>
                  <span className="text-xs text-muted-foreground/50">MP3, WAV, OGG, M4A</span>
                </>
              )}
            </button>
          </div>

          <Button type="submit" disabled={isUploading} className="mt-2 w-full" size="lg">
            {isUploading ? "Laddar upp..." : "Publicera episod"}
          </Button>
        </form>
      </div>
    </div>
  );
  */

  // Read-only placeholder UI:
  return (
    <div className="container pb-20 pt-28">
      <div className="mx-auto max-w-sm animate-fade-in">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Admin är avstängd</h1>
          <p className="text-sm text-muted-foreground">
            Den här appen körs i läsläge. Inga uppladdningar eller ändringar är möjliga just nu.
          </p>
          <Link
            to="/"
            className="mt-2 text-sm text-primary hover:underline"
          >
            Tillbaka till episoderna
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
