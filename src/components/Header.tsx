import { Bell, User, Menu, MessageCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <header className="bg-gradient-to-r from-primary to-primary-light shadow-[var(--shadow-elevated)] border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="md:hidden">
              <Button variant="ghost" size="icon" className="text-primary-foreground">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center cursor-pointer" onClick={() => navigate('/')}>
                <span className="text-primary font-bold text-lg">🇹🇭</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary-foreground cursor-pointer" onClick={() => navigate('/')}>ระบบบริการประชาชน</h1>
                <p className="text-sm text-primary-foreground/80 hidden sm:block">AI Government Services Recommendation</p>
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
              หน้าหลัก
            </Button>
            <Button 
              variant={location.pathname === '/chat' ? 'secondary' : 'ghost'} 
              className={`text-primary-foreground ${location.pathname === '/chat' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => navigate('/chat')}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              ผู้ช่วย AI
            </Button>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                <Bell className="h-5 w-5" />
              </Button>
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-thai-red">
                3
              </Badge>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-primary-foreground">นายสมชาย ใจดี</p>
                <p className="text-xs text-primary-foreground/80">1-2345-67890-12-3</p>
              </div>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;