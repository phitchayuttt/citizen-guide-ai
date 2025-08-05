
import { useState } from "react";
import { Bell, X, Check, Clock, AlertCircle, Eye } from "lucide-react";
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
  details?: string;
  actionRequired?: boolean;
};

const NotificationPanel = () => {
  const { t, language } = useLanguage();
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: language === 'th' ? 'เอกสารได้รับการอนุมัติ' : 'Document Approved',
      message: language === 'th' ? 'เอกสารขอใบอนุญาตของคุณได้รับการอนุมัติเรียบร้อยแล้ว' : 'Your license application has been approved',
      type: 'success',
      timestamp: '2 ชั่วโมงที่แล้ว',
      read: false,
      details: 'ใบอนุญาตประกอบธุรกิจอาหารของคุณได้รับการอนุมัติเรียบร้อยแล้ว เลขที่อนุมัติ: LA-2024-001234 สามารถดาวน์โหลดใบอนุญาตได้ที่เมนูเอกสารของฉัน',
      actionRequired: true
    },
    {
      id: '2',
      title: language === 'th' ? 'ต้องเอกสารเพิ่มเติม' : 'Additional Documents Required',
      message: language === 'th' ? 'กรุณาส่งเอกสารเพิ่มเติมสำหรับการขอใบอนุญาต' : 'Please submit additional documents for your application',
      type: 'warning',
      timestamp: '1 วันที่แล้ว',
      read: false,
      details: 'การขอใบอนุญาตก่อสร้างต้องการเอกสารเพิ่มเติม: 1. ใบรับรองการออกแบบโดยสถาปนิก 2. แผนผังที่ดิน 3. หนังสือยินยอมจากเพื่อนบ้าน กรุณาส่งเอกสารภายใน 7 วัน',
      actionRequired: true
    },
    {
      id: '3',
      title: language === 'th' ? 'ระบบปรับปรุงเสร็จสิ้น' : 'System Maintenance Complete',
      message: language === 'th' ? 'ระบบได้รับการปรับปรุงและพร้อมใช้งานแล้ว' : 'System has been updated and is now available',
      type: 'info',
      timestamp: '3 วันที่แล้ว',
      read: true,
      details: 'ระบบ GovBotAI ได้รับการปรับปรุงเพิ่มฟีเจอร์ใหม่: การแจ้งเตือนแบบเรียลไทม์, ระบบจองคิวออนไลน์, และการติดตามสถานะเอกสารแบบละเอียด ระบบพร้อมให้บริการแล้ว',
      actionRequired: false
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

  const openPreview = (notification: Notification) => {
    setSelectedNotification(notification);
    setPreviewOpen(true);
    markAsRead(notification.id);
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
    <>
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
                className={`cursor-pointer transition-all hover:shadow-md ${!notification.read ? 'bg-accent/50' : ''}`}
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
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {notification.timestamp}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openPreview(notification)}
                          className="h-6 px-2 text-xs"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          ดูรายละเอียด
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Notification Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {selectedNotification && getIcon(selectedNotification.type)}
              <span>{selectedNotification?.title}</span>
            </DialogTitle>
          </DialogHeader>
          
          {selectedNotification && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={selectedNotification.type === 'success' ? 'bg-green-500' : 
                  selectedNotification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}>
                  {selectedNotification.type === 'success' ? 'สำเร็จ' : 
                   selectedNotification.type === 'warning' ? 'ต้องดำเนินการ' : 'ข้อมูล'}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {selectedNotification.timestamp}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {selectedNotification.message}
              </p>
              
              {selectedNotification.details && (
                <div className="p-3 bg-muted/30 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">รายละเอียดเพิ่มเติม:</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedNotification.details}
                  </p>
                </div>
              )}
              
              {selectedNotification.actionRequired && (
                <div className="flex space-x-2 pt-4">
                  <Button variant="thai" className="flex-1">
                    ดำเนินการ
                  </Button>
                  <Button variant="outline" onClick={() => setPreviewOpen(false)}>
                    ปิด
                  </Button>
                </div>
              )}
              
              {!selectedNotification.actionRequired && (
                <div className="flex justify-end pt-4">
                  <Button variant="outline" onClick={() => setPreviewOpen(false)}>
                    ปิด
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotificationPanel;
