import { FileText, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface StatCard {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const StatsOverview = () => {
  const { t } = useLanguage();
  
  const statsData: StatCard[] = [
    {
      title: t('stats.totalRequests'),
      value: "8",
      description: t('stats.pendingDocs'),
      icon: <FileText className="h-8 w-8" />,
      color: "text-primary"
    },
    {
      title: t('stats.pendingDocs'),
      value: "2",
      description: "เอกสารกำลังหมดอายุ", 
      icon: <AlertCircle className="h-8 w-8" />,
      color: "text-yellow-600"
    },
    {
      title: t('stats.completedTasks'),
      value: "5",
      description: "เอกสารยังไม่หมดอายุ",
      icon: <CheckCircle className="h-8 w-8" />,
      color: "text-green-600"
    },
    {
      title: t('stats.activeApps'),
      value: "1",
      description: "ต้องต่ออายุด่วน",
      icon: <Clock className="h-8 w-8" />,
      color: "text-thai-red"
    }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <Card key={index} className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow bg-gradient-to-br from-card to-muted/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
              <div className={`${stat.color} opacity-80`}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;