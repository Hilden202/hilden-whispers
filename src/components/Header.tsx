import { Link } from "react-router-dom";
// READ-ONLY MODE: auth-related imports kept but unused.
// import { LogOut } from "lucide-react";
// import { useAuth } from "@/hooks/use-auth";
import logo from "@/assets/hilden-media-logo.jpeg";

const Header = () => {
  // const { isLoggedIn, logout } = useAuth();

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

        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Episoder
          </Link>
          {/* READ-ONLY MODE: admin/login UI disabled.
          {isLoggedIn && (
            <Link
              to="/admin"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Ladda upp
            </Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              title="Logga ut"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logga ut</span>
            </button>
          ) : (
            <Link
              to="/admin"
              className="text-xs text-muted-foreground/50 transition-colors hover:text-muted-foreground"
            >
              Admin
            </Link>
          )}
          */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
