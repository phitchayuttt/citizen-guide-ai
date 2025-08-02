import { Sparkles, ExternalLink, Clock, MapPin } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  location: string;
  apps: string[];
  category: string;
}

const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'ต่ออายุใบขับขี่',
    description: 'ใบขับขี่ของคุณจะหมดอายุใน 15 วัน แนะนำให้ดำเนินการต่ออายุล่วงหน้า',
    priority: 'high',
    dueDate: '2024-09-15',
    location: 'สำนักงานขนส่งจังหวัด',
    apps: ['DLT Smart Queue', 'QueQ'],
    category: 'การขนส่ง'
  },
  {
    id: '2',
    title: 'ต่ออายุบัตรประจำตัวประชาชน',
    description: 'บัตรประจำตัวประชาชนจะหมดอายุใน 45 วัน สามารถจองคิวออนไลน์ได้',
    priority: 'medium',
    dueDate: '2024-12-31',
    location: 'สำนักงานเขต/อำเภอ',
    apps: ['Promptpay', 'MOI Service'],
    category: 'ทะเบียนราษฎร์'
  },
  {
    id: '3',
    title: 'ตรวจสุขภาพประจำปี',
    description: 'ถึงเวลาตรวจสุขภาพประจำปีแล้ว สิทธิ์ประกันสังคมของคุณครอบคลุม',
    priority: 'low',
    dueDate: '2024-10-30',
    location: 'โรงพยาบาลในเครือข่าย',
    apps: ['SSO Connect', 'ตรวจสุขภาพ 40'],
    category: 'สาธารณสุข'
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-thai-red text-thai-red-foreground';
    case 'medium':
      return 'bg-yellow-500 text-white';
    case 'low':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const getPriorityText = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'เร่งด่วน';
    case 'medium':
      return 'ควรดำเนินการ';
    case 'low':
      return 'แนะนำ';
    default:
      return 'ทั่วไป';
  }
};

const AISummarize = () => {
  return (
    <Card className="shadow-[var(--shadow-elevated)]">
      <CardHeader className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6" />
          <span>AI แนะนำบริการสำหรับคุณ</span>
        </CardTitle>
        <p className="text-sm text-primary-foreground/90">
          ระบบวิเคราะห์ข้อมูลของคุณและแนะนำบริการที่ควรใช้ในช่วงนี้
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {mockRecommendations.map((rec) => (
          <div key={rec.id} className="border border-border rounded-lg p-3 sm:p-5 bg-gradient-to-br from-card to-muted/30 hover:shadow-[var(--shadow-card)] transition-shadow">
            <div className="flex flex-col space-y-3 mb-3">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-2">
                  <h3 className="font-semibold text-base sm:text-lg text-foreground">{rec.title}</h3>
                  <div className="flex space-x-2">
                    <Badge className={`${getPriorityColor(rec.priority)} text-xs`}>
                      {getPriorityText(rec.priority)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">{rec.category}</Badge>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mb-3">{rec.description}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>ครบกำหนด: {rec.dueDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="truncate">{rec.location}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs sm:text-sm font-medium text-foreground mb-2">แอปที่แนะนำ:</p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {rec.apps.map((app, index) => (
                      <Button key={index} variant="outline" size="sm" className="text-xs h-7 px-2 sm:h-8 sm:px-3">
                        <span className="truncate max-w-20 sm:max-w-none">{app}</span>
                        <ExternalLink className="h-3 w-3 ml-1 flex-shrink-0" />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                ดูรายละเอียด
              </Button>
              <Button variant="thai" size="sm" className="text-xs sm:text-sm">
                ดำเนินการ
              </Button>
            </div>
          </div>
        ))}
        
        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">
            💡 ระบบอัปเดตคำแนะนำตามข้อมูลล่าสุดของคุณอัตโนมัติ
          </p>
          <Button variant="thai">
            รีเฟรชคำแนะนำ
            <Sparkles className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISummarize;