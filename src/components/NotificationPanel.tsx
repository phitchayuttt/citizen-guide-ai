import { useState } from "react";
import { Bell, X, Check, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  timestamp: string;
  read: boolean;
};

const NotificationPanel = () => {
  const { t, language } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: language === 'th' ? 'เอกสารได้รับการอนุมัติ' : 'Document Approved',
      message: language === 'th' ? 'เอกสารขอใบอนุญาตของคุณได้รับการอนุมัติเรียบร้อยแล้ว' : 'Your license application has been approved',
      type: 'success',
      timestamp: '2 ชั่วโมงที่แล้ว',
      read: false
    },
    {
      id: '2',
      title: language === 'th' ? 'ต้องเอกสารเพิ่มเติม' : 'Additional Documents Required',
      message: language === 'th' ? 'กรุณาส่งเอกสารเพิ่มเติมสำหรับการขอใบอนุญาต' : 'Please submit additional documents for your application',
      type: 'warning',
      timestamp: '1 วันที่แล้ว',
      read: false
    },
    {
      id: '3',
      title: language === 'th' ? 'ระบบปรับปรุงเสร็จสิ้น' : 'System Maintenance Complete',
      message: language === 'th' ? 'ระบบได้รับการปรับปรุงและพร้อมใช้งานแล้ว' : 'System has been updated and is now available',
      type: 'info',
      timestamp: '3 วันที่แล้ว',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 h-8 w-8 sm:h-10 sm:w-10">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          {unreadCount > 0 && (
            <Badge className="absolute -top-0 -right-0 sm:-top-1 sm:-right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 text-xs bg-thai-red">
              {unreadCount}
            </Badge>
          )}
        </div>
      </DialogTrigger>
      
      <DialogContent className="max-w-md max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>
              {language === 'th' ? 'การแจ้งเตือน' : 'Notifications'}
            </DialogTitle>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-xs"
              >
                {language === 'th' ? 'อ่านทั้งหมด' : 'Mark all read'}
              </Button>
            )}
          </div>
        </DialogHeader>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`cursor-pointer transition-all ${!notification.read ? 'bg-accent/50' : ''}`}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium truncate">
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.timestamp}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationPanel;