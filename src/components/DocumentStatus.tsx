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
      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
        {mockDocuments.map((doc) => (
          <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg bg-gradient-to-r from-background to-muted/50 border border-border space-y-3 sm:space-y-0">
            <div className="flex-1">
              <h3 className="font-medium text-foreground text-sm sm:text-base">{doc.type}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{doc.number}</p>
              <p className="text-xs text-muted-foreground">หมดอายุ: {doc.expiryDate}</p>
            </div>
            <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-3">
              <Badge className={`${getStatusColor(doc.status)} flex items-center space-x-1 text-xs`}>
                {getStatusIcon(doc.status)}
                <span className="hidden sm:inline">{getStatusText(doc.status, doc.daysUntilExpiry)}</span>
                <span className="sm:hidden">{doc.status === 'expired' ? 'หมดอายุ' : doc.status === 'expiring' ? `${doc.daysUntilExpiry}วัน` : 'ใช้ได้'}</span>
              </Badge>
              {(doc.status === 'expired' || doc.status === 'expiring') && (
                <Button size="sm" variant="thai" className="text-xs px-2 py-1 sm:px-3 sm:py-2">
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