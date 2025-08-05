import { User, Menu, MessageCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import NotificationPanel from "@/components/NotificationPanel";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  return (
    <header className="bg-gradient-to-r from-primary to-primary-light shadow-[var(--shadow-elevated)] border-b border-border">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
            <div className="md:hidden">
              <Button variant="ghost" size="icon" className="text-primary-foreground h-8 w-8">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center cursor-pointer flex-shrink-0" onClick={() => navigate('/')}>
                <span className="text-primary font-bold text-sm sm:text-lg">🇹🇭</span>
              </div>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-xl font-bold text-primary-foreground cursor-pointer truncate" onClick={() => navigate('/')}>{t('header.title')}</h1>
                <p className="text-xs sm:text-sm text-primary-foreground/80 hidden lg:block">{t('header.subtitle')}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant={location.pathname === '/' ? 'secondary' : 'ghost'} 
              className={`text-primary-foreground ${location.pathname === '/' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => navigate('/')}
            >
              <Home className="h-4 w-4 mr-2" />
              {t('header.home')}
            </Button>
            <Button 
              variant={location.pathname === '/chat' ? 'secondary' : 'ghost'} 
              className={`text-primary-foreground ${location.pathname === '/chat' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => navigate('/chat')}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              {t('header.aiAssistant')}
            </Button>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">{/* Theme and Language toggles */}
            <div className="hidden sm:flex items-center space-x-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
            {/* Notifications */}
            <NotificationPanel />

            {/* User Profile */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              <div className="hidden lg:block text-right">
                <p className="text-sm font-medium text-primary-foreground">{t('header.userName')}</p>
                <p className="text-xs text-primary-foreground/80">{t('header.userId')}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 h-8 w-8 sm:h-10 sm:w-10">
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
            
            {/* Mobile Theme/Language toggles */}
            <div className="sm:hidden flex items-center space-x-1">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;