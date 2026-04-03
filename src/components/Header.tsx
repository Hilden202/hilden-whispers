import { Link } from "react-router-dom";
import logo from "@/assets/hilden-media-logo.jpeg";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <a
          href="https://hildenmedia.se"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <img
            src={logo}
            alt="Hilden Media – Teknik med själ"
            className="h-10 w-10 rounded-lg object-cover"
          />
          <span className="text-sm font-medium text-foreground/80">
            Hilden Media
          </span>
        </a>

        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Episoder
          </Link>
          <Link
            to="/admin"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Ladda upp
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
