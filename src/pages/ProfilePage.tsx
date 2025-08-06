import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const formSchema = z.object({
  fullName: z.string().min(2, "กรุณากรอกชื่อนามสกุล"),
  age: z.string().min(1, "กรุณากรอกอายุ").refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "กรุณากรอกอายุที่ถูกต้อง",
  }),
});

type FormData = z.infer<typeof formSchema>;

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string>("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      age: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    console.log("Sending data to AI N8N:", data);

    try {
      // TODO: Replace with actual N8N endpoint URL
      const response = await fetch("YOUR_N8N_ENDPOINT_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          age: parseInt(data.age),
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setRecommendation(result.recommendation || "ระบบได้ประมวลผลข้อมูลของคุณเรียบร้อยแล้ว");
        toast({
          title: "สำเร็จ",
          description: "ส่งข้อมูลไปยัง AI เรียบร้อยแล้ว",
        });
      } else {
        throw new Error("Failed to send data");
      }
    } catch (error) {
      console.error("Error sending data to N8N:", error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
      // Mock response for demo purposes
      setRecommendation(`ขอบคุณคุณ${data.fullName} อายุ ${data.age} ปี ระบบแนะนำให้คุณใช้บริการ...`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">โปรไฟล์ผู้ใช้</h1>
            <p className="text-sm text-muted-foreground">กรอกข้อมูลเพื่อรับคำแนะนำจาก AI</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Card */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-primary">ข้อมูลส่วนตัว</CardTitle>
              <CardDescription>
                กรุณากรอกข้อมูลด้านล่างเพื่อให้ AI วิเคราะห์และแนะนำบริการที่เหมาะสม
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ชื่อ-นามสกุล</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="กรอกชื่อและนามสกุล"
                            {...field}
                            className="bg-background/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>อายุ</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="กรอกอายุ"
                            {...field}
                            className="bg-background/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        กำลังส่งข้อมูล...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        ส่งข้อมูลไปยัง AI
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Recommendation Card */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-primary">คำแนะนำจาก AI</CardTitle>
              <CardDescription>
                ผลการวิเคราะห์และคำแนะนำจากระบบ AI N8N
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recommendation ? (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-foreground leading-relaxed">{recommendation}</p>
                </div>
              ) : (
                <div className="p-4 bg-muted/30 rounded-lg text-center">
                  <p className="text-muted-foreground">
                    กรอกข้อมูลและกดส่งเพื่อรับคำแนะนำจาก AI
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;