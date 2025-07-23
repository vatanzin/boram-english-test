import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, User, School, IdCard, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { clientStorage } from "@/lib/clientStorage";
import { insertStudentSchema, type InsertStudent } from "@shared/schema";

export default function RegistrationForm() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<InsertStudent>({
    resolver: zodResolver(insertStudentSchema),
    defaultValues: {
      name: "",
      grade: "",
      birthDate: "",
    },
  });

  const createStudentMutation = useMutation({
    mutationFn: async (data: InsertStudent) => {
      // Create student in client storage
      const student = clientStorage.createStudent(data);
      
      // Create test session immediately
      const session = clientStorage.createTestSession({
        studentId: student.id
      });
      
      return { student, session };
    },
    onSuccess: ({ student, session }) => {
      toast({
        title: "등록 완료!",
        description: "테스트를 시작합니다.",
      });
      
      setLocation(`/test/${session.id}`);
    },
    onError: (error: any) => {
      toast({
        title: "등록 실패",
        description: error.message || "학생 등록에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertStudent) => {
    createStudentMutation.mutate(data);
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <CardContent className="pt-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--boram-blue)] rounded-full mb-4">
            <UserPlus className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">학생 정보 입력</h2>
          <p className="text-gray-600">테스트를 시작하기 전에 기본 정보를 입력해주세요</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-lg font-semibold text-gray-700 mb-2">
                    <User className="inline mr-2 text-[var(--boram-blue)]" size={20} />
                    학생 이름
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="이름을 입력하세요"
                      className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-[var(--boram-blue)] focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-lg font-semibold text-gray-700 mb-2">
                    <School className="inline mr-2 text-[var(--boram-green)]" size={20} />
                    학년
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-[var(--boram-blue)] focus:ring-4 focus:ring-blue-100 transition-all duration-200">
                        <SelectValue placeholder="학년을 선택하세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="4">초등학교 사학년 (기초 수준 위주)</SelectItem>
                      <SelectItem value="5">초등학교 오학년 (기초-중급 수준)</SelectItem>
                      <SelectItem value="6">초등학교 육학년 (중급 수준, 중학교 준비)</SelectItem>
                      <SelectItem value="1">중학교 일학년 (중급 수준 위주)</SelectItem>
                      <SelectItem value="2">중학교 이학년 (중급-고급 수준)</SelectItem>
                      <SelectItem value="3">중학교 삼학년 (고급 수준, 고등학교 준비)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">
                      <strong>💡 안내:</strong> 선택한 학년에 맞는 맞춤형 문제가 출제됩니다. 
                      총 20문제로 구성되며, 읽기·문법·어휘·듣기 영역을 평가합니다.
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-lg font-semibold text-gray-700 mb-2">
                    <IdCard className="inline mr-2 text-[var(--boram-amber)]" size={20} />
                    생년월일 (6자리)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="YYMMDD (예: 051225)"
                      maxLength={6}
                      className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-[var(--boram-blue)] focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                    />
                  </FormControl>
                  <div className="mt-1 text-sm text-gray-500">
                    생년월일 6자리를 입력하세요 (예: 2005년 12월 25일 → 051225)
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={createStudentMutation.isPending}
              className="w-full bg-gradient-to-r from-[var(--boram-blue)] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <Play className="mr-2" size={20} />
              {createStudentMutation.isPending ? "처리중..." : "테스트 시작하기"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
