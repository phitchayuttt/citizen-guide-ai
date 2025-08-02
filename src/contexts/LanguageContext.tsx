import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'th' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  th: {
    // Header
    'header.title': 'ระบบบริการประชาชน',
    'header.subtitle': 'AI Government Services Recommendation',
    'header.home': 'หน้าหลัก',
    'header.aiAssistant': 'ผู้ช่วย AI',
    'header.userName': 'นายสมชาย ใจดี',
    'header.userId': '1-2345-67890-12-3',
    
    // Stats Overview
    'stats.title': 'สถิติการใช้บริการ',
    'stats.totalRequests': 'คำขอทั้งหมด',
    'stats.pendingDocs': 'เอกสารรอดำเนินการ',
    'stats.completedTasks': 'งานเสร็จสิ้น',
    'stats.activeApps': 'แอปที่ใช้งาน',
    
    // Document Status
    'docs.title': 'สถานะเอกสารสำคัญ',
    'docs.driverLicense': 'ใบขับขี่',
    'docs.idCard': 'บัตรประชาชน',
    'docs.passport': 'หนังสือเดินทาง',
    'docs.workPermit': 'ใบอนุญาตทำงาน',
    'docs.expiresIn': 'หมดอายุใน',
    'docs.days': 'วัน',
    'docs.valid': 'ใช้งานได้',
    'docs.years': 'ปี',
    'docs.viewDetails': 'ดูรายละเอียด',
    
    // AI Summarize
    'ai.title': 'สรุปและคำแนะนำ AI',
    'ai.urgentTasks': 'งานเร่งด่วนที่ต้องทำ',
    'ai.driverLicenseExpiring': 'ใบขับขี่ใกล้หมดอายุ (15 วัน)',
    'ai.renewDriverLicense': 'ต่ออายุใบขับขี่ผ่านแอป DLT Smart Queue หรือ QueQ',
    'ai.idCardExpiring': 'บัตรประชาชนใกล้หมดอายุ (45 วัน)',
    'ai.renewIdCard': 'จองคิวต่ออายุบัตรประชาชนผ่านแอป MOI Service',
    'ai.healthCheckup': 'ตรวจสุขภาพประจำปี',
    'ai.bookHealthCheckup': 'จองตรวจสุขภาพผ่านแอป SSO Connect (มีสิทธิ์ฟรี)',
    'ai.recommendedApps': 'แอปที่แนะนำ',
    'ai.dltSmartQueue': 'DLT Smart Queue - ต่ออายุใบขับขี่',
    'ai.queq': 'QueQ - จองคิวบริการรัฐ',
    'ai.moiService': 'MOI Service - บริการกระทรวงมหาดไทย',
    'ai.ssoConnect': 'SSO Connect - ประกันสังคม',
    
    // Chat Page
    'chat.title': 'ผู้ช่วย AI บริการประชาชน',
    'chat.subtitle': 'พร้อมช่วยเหลือและแนะนำบริการภาครัฐ 24/7',
    'chat.online': 'ออนไลน์',
    'chat.inputPlaceholder': 'พิมพ์คำถามของคุณ...',
    'chat.popularQuestions': 'คำถามยอดนิยม',
    'chat.faq': 'คำถามที่ถามบ่อย:',
    'chat.greeting': 'สวัสดีครับ คุณสมชาย! ผมเป็นผู้ช่วย AI ของระบบบริการประชาชน ผมสามารถช่วยแนะนำบริการต่างๆ ตอบคำถาม และให้คำปรึกษาเกี่ยวกับการใช้บริการภาครัฐได้ครับ มีอะไรให้ช่วยไหมครับ?',
    
    // Quick suggestions
    'suggestion.driverLicenseExpiry': 'ใบขับขี่กำลังจะหมดอายุ ต้องทำอย่างไร?',
    'suggestion.renewIdCard': 'วิธีต่ออายุบัตรประชาชน',
    'suggestion.socialSecurity': 'ตรวจสอบสิทธิ์ประกันสังคม',
    'suggestion.bookQueue': 'จองคิวบริการภาครัฐออนไลน์',
    'suggestion.documents': 'เอกสารที่ต้องเตรียมสำหรับต่ออายุ',
    'suggestion.govApps': 'แอปของภาครัฐที่น่าใช้',
  },
  en: {
    // Header
    'header.title': 'Citizen Services System',
    'header.subtitle': 'AI Government Services Recommendation',
    'header.home': 'Home',
    'header.aiAssistant': 'AI Assistant',
    'header.userName': 'Mr. Somchai Jaidee',
    'header.userId': '1-2345-67890-12-3',
    
    // Stats Overview
    'stats.title': 'Service Usage Statistics',
    'stats.totalRequests': 'Total Requests',
    'stats.pendingDocs': 'Pending Documents',
    'stats.completedTasks': 'Completed Tasks',
    'stats.activeApps': 'Active Apps',
    
    // Document Status
    'docs.title': 'Important Document Status',
    'docs.driverLicense': 'Driver License',
    'docs.idCard': 'ID Card',
    'docs.passport': 'Passport',
    'docs.workPermit': 'Work Permit',
    'docs.expiresIn': 'Expires in',
    'docs.days': 'days',
    'docs.valid': 'Valid',
    'docs.years': 'years',
    'docs.viewDetails': 'View Details',
    
    // AI Summarize
    'ai.title': 'AI Summary & Recommendations',
    'ai.urgentTasks': 'Urgent Tasks',
    'ai.driverLicenseExpiring': 'Driver License expiring (15 days)',
    'ai.renewDriverLicense': 'Renew driver license via DLT Smart Queue or QueQ app',
    'ai.idCardExpiring': 'ID Card expiring (45 days)',
    'ai.renewIdCard': 'Book ID card renewal via MOI Service app',
    'ai.healthCheckup': 'Annual Health Checkup',
    'ai.bookHealthCheckup': 'Book health checkup via SSO Connect app (Free)',
    'ai.recommendedApps': 'Recommended Apps',
    'ai.dltSmartQueue': 'DLT Smart Queue - Driver License Renewal',
    'ai.queq': 'QueQ - Government Service Queue',
    'ai.moiService': 'MOI Service - Ministry of Interior',
    'ai.ssoConnect': 'SSO Connect - Social Security',
    
    // Chat Page
    'chat.title': 'AI Government Services Assistant',
    'chat.subtitle': 'Ready to help and recommend government services 24/7',
    'chat.online': 'Online',
    'chat.inputPlaceholder': 'Type your question...',
    'chat.popularQuestions': 'Popular Questions',
    'chat.faq': 'Frequently Asked:',
    'chat.greeting': 'Hello Mr. Somchai! I am the AI assistant for the citizen services system. I can help recommend various services, answer questions, and provide advice on using government services. How can I help you?',
    
    // Quick suggestions
    'suggestion.driverLicenseExpiry': 'Driver license expiring, what should I do?',
    'suggestion.renewIdCard': 'How to renew ID card',
    'suggestion.socialSecurity': 'Check social security benefits',
    'suggestion.bookQueue': 'Book government service queue online',
    'suggestion.documents': 'Documents needed for renewal',
    'suggestion.govApps': 'Useful government apps',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('th');
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};