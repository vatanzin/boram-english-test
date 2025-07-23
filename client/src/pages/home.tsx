import { GraduationCap } from "lucide-react";
import RegistrationForm from "@/components/registration-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--boram-bg)]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-[var(--boram-blue)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--boram-blue)] flex items-center justify-center">
                <GraduationCap className="mr-3" size={48} />
                BORAM ENGLISH LEVEL TEST
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                자신의 영어 실력을 진단하고 맞춤형 학습 계획을 세워보세요
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RegistrationForm />
      </div>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-[var(--boram-blue)] mb-2">
              BORAM ENGLISH LEVEL TEST
            </h3>
            <p className="text-gray-600">학생 중심의 맞춤형 영어 학습 진단 서비스</p>
            <div className="mt-4 text-sm text-gray-500">
              © 2024 BORAM Education. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
