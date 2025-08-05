import { Home, MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-4">
        <Button
          variant={isActive('/') ? 'default' : 'ghost'}
          onClick={() => navigate('/')}
          className="flex flex-col items-center space-y-1 h-auto py-2 px-3"
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">{t('header.home')}</span>
        </Button>
        
        <Button
          variant={isActive('/chat') ? 'default' : 'ghost'}
          onClick={() => navigate('/chat')}
          className="flex flex-col items-center space-y-1 h-auto py-2 px-3"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs">{t('header.aiAssistant')}</span>
        </Button>
      </div>
    </div>
  );
};

export default MobileBottomNav;