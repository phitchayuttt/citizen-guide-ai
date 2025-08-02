import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'สวัสดีครับ คุณสมชาย! ผมเป็นผู้ช่วย AI ของระบบบริการประชาชน ผมสามารถช่วยแนะนำบริการต่างๆ ตอบคำถาม และให้คำปรึกษาเกี่ยวกับการใช้บริการภาครัฐได้ครับ มีอะไรให้ช่วยไหมครับ?',
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
      <div className="max-w-4xl mx-auto p-4 h-screen flex flex-col">
        {/* Header */}
        <Card className="mb-4 shadow-[var(--shadow-elevated)]">
          <CardHeader className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground rounded-t-lg">
            <CardTitle className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground hover:bg-white/10"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">ผู้ช่วย AI บริการประชาชน</h1>
                <p className="text-sm text-primary-foreground/90">พร้อมช่วยเหลือและแนะนำบริการภาครัฐ 24/7</p>
              </div>
              <Badge className="bg-green-500 text-white">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                ออนไลน์
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Chat Messages */}
        <Card className="flex-1 mb-4 shadow-[var(--shadow-card)]">
          <CardContent className="p-0 h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-gradient-to-r from-primary to-primary-light text-primary-foreground'
                    }`}>
                      {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>

                    {/* Message Bubble */}
                    <div className={`rounded-lg p-4 ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
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
                          <p className="text-xs font-medium">คำถามที่ถามบ่อย:</p>
                          <div className="flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs"
                                onClick={() => handleQuickSuggestion(suggestion)}
                              >
                                {suggestion}
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
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-light text-primary-foreground flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-muted text-muted-foreground rounded-lg p-4">
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
            <div className="border-t border-border p-4">
              <div className="flex space-x-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="พิมพ์คำถามของคุณ..."
                  className="flex-1"
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
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Quick Suggestions at bottom */}
              <div className="mt-3">
                <p className="text-xs text-muted-foreground mb-2">คำถามยอดนิยม:</p>
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.slice(0, 4).map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleQuickSuggestion(suggestion)}
                      disabled={isTyping}
                    >
                      {suggestion}
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