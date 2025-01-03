import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full mt-auto border-t backdrop-blur-sm bg-white/50">
      <div className="max-w-6xl mx-auto py-4 px-8 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © 2025{" "}
          <a href="https://karacay.fi" target="_blank">
            karacay.fi
          </a>{" "}
          Built with ❤️ in Helsinki 🇫🇮
        </p>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/yourusername/jsonmind"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <Github className="h-5 w-5" />
            <span>Github</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
