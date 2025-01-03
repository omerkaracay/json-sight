import { LanguageSwitcher } from "@/components/language-switcher";
import { FlipWords } from "../ui/flip-words";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const words = ["Support", "Buy Coffee", "Energize"];

  return (
    <div className="flex justify-between items-start">
      <div className="text-center flex-1">
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
        <div className="text-md mx-auto font-normal text-neutral-600 dark:text-neutral-400">
          <FlipWords words={words} />
          <a
            href="https://buymeacoffee.com/karacay"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:text-primary transition-colors"
          >
            Developer
          </a>
        </div>
      </div>
      <LanguageSwitcher />
    </div>
  );
}
