import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const mockBotResponses = [
  "สวัสดีครับ! ผมเป็นผู้ช่วย AI ของระบบบริการประชาชน ผมสามารถช่วยแนะนำบริการภาครัฐ ตรวจสอบสถานะเอกสาร และตอบคำถามต่างๆ ได้ครับ",
  "จากข้อมูลของคุณ ผมเห็นว่าใบขับขี่จะหมดอายุใน 15 วัน คุณสามารถต่ออายุผ่านแอป DLT Smart Queue หรือ QueQ ได้เลยครับ",
  "สำหรับการต่ออายุบัตรประชาชน คุณสามารถจองคิวล่วงหน้าผ่านแอป MOI Service ได้ครับ และอย่าลืมเตรียมเอกสารที่จำเป็นด้วยนะครับ",
  "คุณสามารถตรวจสอบสิทธิ์ประกันสังคมและจองตรวจสุขภาพประจำปีผ่านแอป SSO Connect ได้ครับ"
];

const quickSuggestions = [
  "ใบขับขี่กำลังจะหมดอายุ ต้องทำอย่างไร?",
  "วิธีต่ออายุบัตรประชาชน",
  "ตรวจสอบสิทธิ์ประกันสังคม",
  "จองคิวบริการภาครัฐออนไลน์",
  "เอกสารที่ต้องเตรียมสำหรับต่ออายุ",
  "แอปของภาครัฐที่น่าใช้"
];

const ChatPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: t('chat.greeting'),
      timestamp: new Date(),
      suggestions: quickSuggestions.slice(0, 3)
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('ใบขับขี่') || lowerMessage.includes('ขับรถ')) {
      return "สำหรับการต่ออายุใบขับขี่ คุณสามารถ:\n\n1. จองคิวออนไลน์ผ่านแอป DLT Smart Queue\n2. เตรียมเอกสาร: ใบขับขี่เดิม, บัตรประชาชน, ใบรับรองแพทย์\n3. ชำระค่าธรรมเนียม 605 บาท\n4. ไปรับใบขับขี่ใหม่ตามคิวที่จอง\n\nแนะนำให้ทำก่อนหมดอายุ 30-60 วันครับ";
    }
    
    if (lowerMessage.includes('บัตรประชาชน') || lowerMessage.includes('บัตรปชช')) {
      return "การต่ออายุบัตรประชาชน:\n\n1. จองคิวผ่านแอป MOI Service\n2. เตรียมเอกสาร: บัตรประชาชนเดิม, ทะเบียนบ้าน\n3. ค่าธรรมเนียม 60 บาท\n4. ใช้เวลาทำการประมาณ 15-30 นาที\n\nสามารถทำได้ที่สำนักงานเขตหรืออำเภอครับ";
    }
    
    if (lowerMessage.includes('ประกันสังคม') || lowerMessage.includes('สิทธิ์')) {
      return "ตรวจสอบสิทธิ์ประกันสังคม:\n\n1. ใช้แอป SSO Connect\n2. เข้าสู่ระบบด้วยบัตรประชาชน\n3. ดูประวัติการจ่ายเงิน สิทธิ์การรักษา\n4. จองตรวจสุขภาพประจำปี\n\nหากมีปัญหา สามารถติดต่อสำนักงานประกันสังคมได้ครับ";
    }

    return mockBotResponses[Math.floor(Math.random() * mockBotResponses.length)];
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(content),
        timestamp: new Date(),
        suggestions: quickSuggestions.slice(Math.floor(Math.random() * 3), Math.floor(Math.random() * 3) + 3)
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="max-w-4xl mx-auto p-2 sm:p-4 h-screen flex flex-col">
        {/* Header */}
        <Card className="mb-2 sm:mb-4 shadow-[var(--shadow-elevated)]">
          <CardHeader className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground rounded-t-lg p-3 sm:p-6">
            <CardTitle className="flex items-center space-x-2 sm:space-x-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground hover:bg-white/10 h-8 w-8 sm:h-10 sm:w-10"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Bot className="h-4 w-4 sm:h-6 sm:w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-base sm:text-xl font-bold truncate">{t('chat.title')}</h1>
                <p className="text-xs sm:text-sm text-primary-foreground/90 hidden sm:block">{t('chat.subtitle')}</p>
              </div>
              <Badge className="bg-green-500 text-white text-xs hidden sm:flex">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                {t('chat.online')}
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Chat Messages */}
        <Card className="flex-1 mb-2 sm:mb-4 shadow-[var(--shadow-card)]">
          <CardContent className="p-0 h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2 sm:space-x-3 max-w-[85%] sm:max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-gradient-to-r from-primary to-primary-light text-primary-foreground'
                    }`}>
                      {message.type === 'user' ? <User className="h-3 w-3 sm:h-4 sm:w-4" /> : <Bot className="h-3 w-3 sm:h-4 sm:w-4" />}
                    </div>

                    {/* Message Bubble */}
                    <div className={`rounded-lg p-3 sm:p-4 ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground/70'
                      }`}>
                        {message.timestamp.toLocaleTimeString('th-TH', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>

                      {/* Suggestions */}
                      {message.suggestions && message.type === 'bot' && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs font-medium">{t('chat.faq')}</p>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs h-7 px-2 sm:h-8 sm:px-3"
                                onClick={() => handleQuickSuggestion(suggestion)}
                              >
                                <span className="truncate max-w-28 sm:max-w-none">{suggestion}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 sm:space-x-3 max-w-[85%] sm:max-w-[80%]">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-primary to-primary-light text-primary-foreground flex items-center justify-center">
                      <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                    <div className="bg-muted text-muted-foreground rounded-lg p-3 sm:p-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-3 sm:p-4">
              <div className="flex space-x-2 sm:space-x-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t('chat.inputPlaceholder')}
                  className="flex-1 text-sm sm:text-base"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage(inputValue);
                    }
                  }}
                  disabled={isTyping}
                />
                <Button 
                  variant="thai" 
                  size="icon"
                  className="h-9 w-9 sm:h-10 sm:w-10"
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>

              {/* Quick Suggestions at bottom */}
              <div className="mt-3">
                <p className="text-xs text-muted-foreground mb-2">{t('chat.popularQuestions')}:</p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {quickSuggestions.slice(0, window.innerWidth < 640 ? 2 : 4).map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 px-2 sm:h-8 sm:px-3"
                      onClick={() => handleQuickSuggestion(suggestion)}
                      disabled={isTyping}
                    >
                      <span className="truncate max-w-24 sm:max-w-none">{suggestion}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;