import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Music } from "lucide-react";
import { saveEpisode } from "@/lib/episodes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
    } else {
      toast({
        title: "Ogiltigt format",
        description: "Vänligen välj en ljudfil.",
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

    // Convert to base64 for localStorage storage
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

  return (
    <div className="container pb-20 pt-28">
      <div className="mx-auto max-w-xl animate-fade-in">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">
          Ladda upp episod
        </h1>
        <p className="mb-8 text-muted-foreground">
          Lägg till en ny episod till Hilden Visioner.
        </p>

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
            <label className="mb-1.5 block text-sm font-medium">
              Beskrivning
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Beskriv episoden..."
              rows={4}
              className="bg-card/50"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Ljudfil
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
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
                  <span className="text-xs text-muted-foreground">
                    Klicka för att byta fil
                  </span>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-muted-foreground/50" />
                  <span className="text-sm text-muted-foreground">
                    Klicka för att välja ljudfil
                  </span>
                  <span className="text-xs text-muted-foreground/50">
                    MP3, WAV, OGG, M4A
                  </span>
                </>
              )}
            </button>
          </div>

          <Button
            type="submit"
            disabled={isUploading}
            className="mt-2 w-full"
            size="lg"
          >
            {isUploading ? "Laddar upp..." : "Publicera episod"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              // Generate a tiny valid WAV as data URL
              const header = new ArrayBuffer(44);
              const view = new DataView(header);
              const sampleRate = 8000;
              const numSamples = 8000;
              const dataSize = numSamples * 2;
              // RIFF header
              const writeString = (offset: number, str: string) => { for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i)); };
              writeString(0, 'RIFF');
              view.setUint32(4, 36 + dataSize, true);
              writeString(8, 'WAVE');
              writeString(12, 'fmt ');
              view.setUint32(16, 16, true);
              view.setUint16(20, 1, true);
              view.setUint16(22, 1, true);
              view.setUint32(24, sampleRate, true);
              view.setUint32(28, sampleRate * 2, true);
              view.setUint16(32, 2, true);
              view.setUint16(34, 16, true);
              writeString(36, 'data');
              view.setUint32(40, dataSize, true);
              const samples = new Int16Array(numSamples);
              for (let i = 0; i < numSamples; i++) samples[i] = Math.sin(2 * Math.PI * 440 * i / sampleRate) * 10000;
              const blob = new Blob([header, samples.buffer], { type: 'audio/wav' });
              const reader2 = new FileReader();
              reader2.onload = () => {
                saveEpisode({
                  title: "Avsnitt 1: Framtidens teknik",
                  description: "I detta avsnitt utforskar vi vart tekniken är på väg och vilka möjligheter som väntar. En lugn reflektion om AI, kreativitet och mänsklighetens nästa steg.",
                  audioUrl: reader2.result as string,
                });
                toast({ title: "Demo-episod tillagd!" });
                navigate("/");
              };
              reader2.readAsDataURL(blob);
            }}
          >
            Lägg till demo-episod
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
