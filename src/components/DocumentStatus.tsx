import { Calendar, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface Document {
  id: string;
  type: string;
  number: string;
  expiryDate: string;
  status: 'expired' | 'expiring' | 'valid';
  daysUntilExpiry: number;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    type: 'บัตรประจำตัวประชาชน',
    number: '1-2345-67890-12-3',
    expiryDate: '2024-12-31',
    status: 'expiring',
    daysUntilExpiry: 45
  },
  {
    id: '2', 
    type: 'ใบขับขี่',
    number: '12345678',
    expiryDate: '2024-09-15',
    status: 'expiring',
    daysUntilExpiry: 15
  },
  {
    id: '3',
    type: 'หนังสือเดินทาง',
    number: 'AB1234567',
    expiryDate: '2027-03-20',
    status: 'valid',
    daysUntilExpiry: 890
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'expired':
      return 'bg-thai-red text-thai-red-foreground';
    case 'expiring':
      return 'bg-yellow-500 text-white';
    case 'valid':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'expired':
    case 'expiring':
      return <AlertTriangle className="h-4 w-4" />;
    case 'valid':
      return <CheckCircle className="h-4 w-4" />;
    default:
      return <Calendar className="h-4 w-4" />;
  }
};

const getStatusText = (status: string, days: number) => {
  switch (status) {
    case 'expired':
      return 'หมดอายุแล้ว';
    case 'expiring':
      return `หมดอายุใน ${days} วัน`;
    case 'valid':
      return `ใช้ได้อีก ${days} วัน`;
    default:
      return 'ไม่ทราบสถานะ';
  }
};

const DocumentStatus = () => {
  const { t } = useLanguage();
  return (
    <Card className="shadow-[var(--shadow-card)]">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-primary" />
          <span>{t('docs.title')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockDocuments.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-background to-muted/50 border border-border">
            <div className="flex-1">
              <h3 className="font-medium text-foreground">{doc.type}</h3>
              <p className="text-sm text-muted-foreground">{doc.number}</p>
              <p className="text-xs text-muted-foreground">หมดอายุ: {doc.expiryDate}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={`${getStatusColor(doc.status)} flex items-center space-x-1`}>
                {getStatusIcon(doc.status)}
                <span className="text-xs">{getStatusText(doc.status, doc.daysUntilExpiry)}</span>
              </Badge>
              {(doc.status === 'expired' || doc.status === 'expiring') && (
                <Button size="sm" variant="thai">
                  ต่ออายุ
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DocumentStatus;