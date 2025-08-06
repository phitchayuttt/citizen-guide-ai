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
  gender: z.string().min(1, "กรุณาเลือกเพศ"),
  maritalStatus: z.string().min(1, "กรุณาเลือกสถานะการสมรส"),
  phoneNumber: z.string().min(10, "กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง"),
  idCard: z.string().length(13, "เลขบัตรประชาชนต้องมี 13 หลัก"),
  drivingLicenseExpiry: z.string().min(1, "กรุณาเลือกวันหมดอายุใบขับขี่"),
  idCardExpiry: z.string().min(1, "กรุณาเลือกวันหมดอายุบัตรประชาชน"),
});

type FormData = z.infer<typeof formSchema>;

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      age: "",
      gender: "",
      maritalStatus: "",
      phoneNumber: "",
      idCard: "",
      drivingLicenseExpiry: "",
      idCardExpiry: "",
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
          gender: data.gender,
          maritalStatus: data.maritalStatus,
          phoneNumber: data.phoneNumber,
          idCard: data.idCard,
          drivingLicenseExpiry: data.drivingLicenseExpiry,
          idCardExpiry: data.idCardExpiry,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "สำเร็จ",
          description: "ลงทะเบียนข้อมูลเรียบร้อยแล้ว",
        });
        // Reset form after successful submission
        form.reset();
      } else {
        throw new Error("Failed to send data");
      }
    } catch (error) {
      console.error("Error sending data to N8N:", error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
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
            <h1 className="text-2xl font-bold text-foreground">ลงทะเบียนผู้ใช้</h1>
            <p className="text-sm text-muted-foreground">กรอกข้อมูลส่วนตัวเพื่อใช้บริการ</p>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-primary">ข้อมูลส่วนตัว</CardTitle>
            <CardDescription>
              กรุณากรอกข้อมูลด้านล่างเพื่อลงทะเบียนใช้บริการ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>เพศ</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="">เลือกเพศ</option>
                            <option value="male">ชาย</option>
                            <option value="female">หญิง</option>
                            <option value="other">อื่นๆ</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maritalStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>สถานะการสมรส</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="">เลือกสถานะ</option>
                            <option value="single">โสด</option>
                            <option value="married">สมรส</option>
                            <option value="divorced">หย่าร้าง</option>
                            <option value="widowed">ม่าย</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>เบอร์โทรศัพท์</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="08XXXXXXXX"
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
                  name="idCard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>เลขบัตรประชาชน</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1XXXXXXXXXXXX"
                          {...field}
                          className="bg-background/50"
                          maxLength={13}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="drivingLicenseExpiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>วันหมดอายุใบขับขี่</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
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
                    name="idCardExpiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>วันหมดอายุบัตรประชาชน</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            className="bg-background/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      กำลังลงทะเบียน...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      ลงทะเบียน
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;