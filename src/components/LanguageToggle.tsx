import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-primary-foreground hover:bg-white/10 font-medium"
      onClick={() => setLanguage(language === "th" ? "en" : "th")}
    >
      {language === "th" ? "🇺🇸 EN" : "🇹🇭 TH"}
    </Button>
  );
}