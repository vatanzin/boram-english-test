import { useParams } from "wouter";
import TestInterface from "@/components/test-interface";

export default function Test() {
  const { sessionId } = useParams();

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-[var(--boram-bg)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">잘못된 접근</h1>
          <p className="text-gray-600">올바른 테스트 세션이 아닙니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--boram-bg)]">
      <TestInterface sessionId={parseInt(sessionId)} />
    </div>
  );
}
