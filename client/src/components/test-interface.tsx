import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { BookOpen, ArrowLeft, ArrowRight, Play, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { clientStorage, type TestSession, type Answer } from "@/lib/clientStorage";
import { getQuestions } from "@/data/questions";

interface TestInterfaceProps {
  sessionId: number;
}

export default function TestInterface({ sessionId }: TestInterfaceProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const [session, setSession] = useState<TestSession | null>(null);
  const [student, setStudent] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from client storage
  useEffect(() => {
    const loadData = () => {
      const sessionData = clientStorage.getTestSession(sessionId);
      if (!sessionData) {
        setLocation('/');
        return;
      }
      
      const studentData = clientStorage.getStudent(sessionData.studentId);
      if (!studentData) {
        setLocation('/');
        return;
      }
      
      const questionsData = getQuestions(studentData.grade);
      
      setSession(sessionData);
      setStudent(studentData);
      setQuestions(questionsData);
      setIsLoading(false);
    };
    
    loadData();
  }, [sessionId, setLocation]);

  const currentQuestion = session && questions.length > 0 ? questions[session.currentQuestion - 1] : null;
  const totalQuestions = questions.length;
  const progressPercent = session ? (session.currentQuestion / totalQuestions) * 100 : 0;



  const updateSessionMutation = useMutation({
    mutationFn: async (updates: any) => {
      const updatedSession = clientStorage.updateTestSession(sessionId, updates);
      return updatedSession;
    },
    onSuccess: (updatedSession) => {
      if (updatedSession) {
        setSession(updatedSession);
        
        if (updatedSession.isCompleted) {
          setLocation(`/results/${sessionId}`);
        }
      }
    },
    onError: (error: any) => {
      toast({
        title: "오류 발생",
        description: error.message || "답안 저장에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const handleNextQuestion = () => {
    if (!session || !currentQuestion) return;

    const selectedAnswerIndex = parseInt(currentAnswer) - 1;
    const isCorrect = selectedAnswerIndex === currentQuestion.correctAnswer;
    
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      selectedAnswer: currentAnswer,
      isCorrect,
      skill: currentQuestion.skill,
    };

    const updatedAnswers = [...(session.answers as Answer[]), newAnswer];
    const isLastQuestion = session.currentQuestion >= totalQuestions;
    
    const updates: any = {
      answers: updatedAnswers,
    };

    if (isLastQuestion) {
      updates.isCompleted = true;
      updates.endTime = new Date().toISOString();
    } else {
      updates.currentQuestion = session.currentQuestion + 1;
    }

    updateSessionMutation.mutate(updates);
    setCurrentAnswer("");
    setAudioPlayed(false); // Reset audio state for next question
  };

  const handlePreviousQuestion = () => {
    if (!session || session.currentQuestion <= 1) return;

    // Remove the last answer and go back
    const updatedAnswers = (session.answers as Answer[]).slice(0, -1);
    const lastAnswer = (session.answers as Answer[])[updatedAnswers.length];
    
    updateSessionMutation.mutate({
      answers: updatedAnswers,
      currentQuestion: session.currentQuestion - 1,
    });

    // Set the previous answer if it exists
    if (lastAnswer) {
      setCurrentAnswer((lastAnswer.selectedAnswer + 1).toString());
    } else {
      setCurrentAnswer("");
    }
  };



  const getSkillIcon = (skill: string) => {
    switch (skill) {
      case 'reading': return <BookOpen className="text-[var(--boram-blue)]" size={24} />;
      case 'grammar': return <BookOpen className="text-[var(--boram-green)]" size={24} />;
      case 'vocabulary': return <BookOpen className="text-[var(--boram-amber)]" size={24} />;
      case 'listening': return <BookOpen className="text-red-500" size={24} />;
      default: return <BookOpen className="text-gray-500" size={24} />;
    }
  };

  const getSkillName = (skill: string) => {
    switch (skill) {
      case 'reading': return 'Reading Comprehension';
      case 'grammar': return 'Grammar';
      case 'vocabulary': return 'Vocabulary';
      case 'listening': return 'Listening Comprehension';
      default: return skill;
    }
  };

  const getSkillDescription = (skill: string) => {
    switch (skill) {
      case 'reading': return '다음 문장을 읽고 문제를 풀어보세요';
      case 'grammar': return '올바른 문법을 선택해보세요';
      case 'vocabulary': return '적절한 단어를 선택해보세요';
      case 'listening': return '플레이 버튼을 눌러 듣고 문제를 풀어보세요';
      default: return '문제를 풀어보세요';
    }
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
      setAudioPlayed(true);
    }
  };

  if (isLoading || !questions.length || !student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--boram-blue)]"></div>
          <p className="mt-4 text-lg text-gray-600">
            {!student ? "학생 정보를 불러오는 중..." : "학년별 맞춤 문제를 준비하는 중..."}
          </p>
        </div>
      </div>
    );
  }

  if (!session || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">테스트 세션을 찾을 수 없습니다</h1>
          <p className="text-gray-600">올바른 테스트 링크인지 확인해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Header */}
      <Card className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <CardContent className="p-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="bg-[var(--boram-blue)] text-white px-4 py-2 rounded-lg font-semibold">
                {getSkillName(currentQuestion.skill)}
              </div>
              <div className="text-gray-600">
                문제 <span className="font-bold text-[var(--boram-blue)]">{session.currentQuestion}</span> / 
                <span className="font-bold"> {totalQuestions}</span>
              </div>
            </div>
            <div className="text-gray-600">
              총 {totalQuestions}문항
            </div>
          </div>
          
          <Progress value={progressPercent} className="w-full h-3 mb-2" />
          <div className="text-sm text-gray-600">
            진행률: <span className="font-semibold">{Math.round(progressPercent)}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="bg-white rounded-2xl shadow-lg p-8">
        <CardContent className="p-0">
          {/* Section Indicator */}
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              {getSkillIcon(currentQuestion.skill)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {getSkillName(currentQuestion.skill)}
              </h3>
              <p className="text-gray-600">
                {getSkillDescription(currentQuestion.skill)}
              </p>
            </div>
          </div>

          {/* Question Content */}
          <div className="mb-8">
            {/* Reading Passage */}
            {currentQuestion.passage && currentQuestion.skill !== 'listening' && (
              <div className="bg-gray-50 p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed">{currentQuestion.passage}</p>
              </div>
            )}

            {/* Listening Audio Player - NO PASSAGE SHOWN */}
            {currentQuestion.skill === 'listening' && (
              <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-xl mb-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Volume2 className="text-blue-600 mr-3" size={32} />
                  <h5 className="text-lg font-semibold text-blue-800">듣기 평가</h5>
                </div>
                <Button
                  onClick={() => {
                    // Extract the audio content - remove any "Listen: " prefix and get the sentence to speak
                    const audioText = currentQuestion.passage || currentQuestion.question.replace('Listen: ', '');
                    playAudio(audioText);
                  }}
                  className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  <Play className="mr-2" size={20} />
                  {audioPlayed ? '다시 듣기' : '듣기 시작'}
                </Button>
                <p className="text-sm text-blue-600 mt-3">
                  버튼을 눌러 문장을 들어보세요. 여러 번 들을 수 있습니다.
                </p>
              </div>
            )}

            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                {currentQuestion.skill === 'listening' 
                  ? currentQuestion.question.replace(/Listen: .*?[.!?] /, '').replace('Listen: ', '').replace(currentQuestion.passage || '', '').trim()
                  : currentQuestion.question}
              </h4>
            </div>

            {/* Answer Options */}
            <RadioGroup
              value={currentAnswer}
              onValueChange={setCurrentAnswer}
              className="space-y-4"
            >
              {currentQuestion.options.map((option: string, index: number) => (
                <div key={index}>
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[var(--boram-blue)] hover:bg-blue-50 transition-all duration-200"
                  >
                    <RadioGroupItem
                      value={(index + 1).toString()}
                      id={`option-${index}`}
                      className="mr-4"
                    />
                    <span className="text-lg">
                      {index + 1}) {option}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-6 border-t">
            <Button
              onClick={handlePreviousQuestion}
              disabled={session.currentQuestion <= 1 || updateSessionMutation.isPending}
              variant="outline"
              className="flex items-center px-6 py-3 font-semibold"
            >
              <ArrowLeft className="mr-2" size={16} />
              이전 문제
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {currentAnswer ? "다음 버튼을 눌러주세요" : "답을 선택한 후 다음 버튼을 눌러주세요"}
              </p>
            </div>
            
            <Button
              onClick={handleNextQuestion}
              disabled={!currentAnswer || updateSessionMutation.isPending}
              className="flex items-center px-6 py-3 bg-[var(--boram-green)] hover:bg-green-600 text-white font-semibold transition-all duration-200 transform hover:scale-105"
            >
              {updateSessionMutation.isPending ? "처리중..." : 
               session.currentQuestion >= totalQuestions ? "완료" : "다음 문제"}
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function calculateSkillScores(answers: Answer[], questions: any[]): any {
  const skillTotals = { reading: 0, grammar: 0, vocabulary: 0, listening: 0 };
  const skillCounts = { reading: 0, grammar: 0, vocabulary: 0, listening: 0 };
  const skillCorrect = { reading: 0, grammar: 0, vocabulary: 0, listening: 0 };

  questions.forEach((question, index) => {
    const answer = answers[index];
    if (answer) {
      skillTotals[question.skill as keyof typeof skillTotals]++;
      skillCounts[question.skill as keyof typeof skillCounts]++;
      if (answer.isCorrect) {
        skillCorrect[question.skill as keyof typeof skillCorrect]++;
      }
    }
  });

  return {
    reading: skillCounts.reading > 0 ? Math.round((skillCorrect.reading / skillCounts.reading) * 100) : 0,
    grammar: skillCounts.grammar > 0 ? Math.round((skillCorrect.grammar / skillCounts.grammar) * 100) : 0,
    vocabulary: skillCounts.vocabulary > 0 ? Math.round((skillCorrect.vocabulary / skillCounts.vocabulary) * 100) : 0,
    listening: skillCounts.listening > 0 ? Math.round((skillCorrect.listening / skillCounts.listening) * 100) : 0,
  };
}
