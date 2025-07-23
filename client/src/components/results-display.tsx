import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { Trophy, User, School, IdCard, Lightbulb, ThumbsUp, Target, Route, CheckCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { clientStorage, type TestSession, type Student } from "@/lib/clientStorage";
import { getQuestions } from "@/data/questions";

interface SkillScores {
  reading: number;
  grammar: number;
  vocabulary: number;
  listening: number;
}

interface ResultsDisplayProps {
  sessionId: number;
}

export default function ResultsDisplay({ sessionId }: ResultsDisplayProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [session, setSession] = useState<TestSession | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [skillScores, setSkillScores] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      
      // Calculate skill scores
      const scores = calculateSkillScores(sessionData.answers, questionsData);
      
      // Calculate total score (20 questions, 5 points each = 100 total)
      const totalScore = Math.round((sessionData.answers.filter((answer: any) => answer.isCorrect).length / 20) * 100);
      
      // Update session with total score
      const updatedSession = { ...sessionData, totalScore };
      
      setSession(updatedSession);
      setStudent(studentData);
      setQuestions(questionsData);
      setSkillScores(scores);
      setIsLoading(false);
    };
    
    loadData();
  }, [sessionId, setLocation]);

  // Calculate skill scores function
  const calculateSkillScores = (answers: any[], questions: any[]) => {
    const skillCounts = { reading: 0, grammar: 0, vocabulary: 0, listening: 0 };
    const skillCorrect = { reading: 0, grammar: 0, vocabulary: 0, listening: 0 };
    
    questions.forEach(question => {
      skillCounts[question.skill as keyof typeof skillCounts]++;
    });
    
    answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (question && answer.isCorrect) {
        skillCorrect[question.skill as keyof typeof skillCorrect]++;
      }
    });
    
    return {
      reading: Math.round((skillCorrect.reading / skillCounts.reading) * 100) || 0,
      grammar: Math.round((skillCorrect.grammar / skillCounts.grammar) * 100) || 0,
      vocabulary: Math.round((skillCorrect.vocabulary / skillCounts.vocabulary) * 100) || 0,
      listening: Math.round((skillCorrect.listening / skillCounts.listening) * 100) || 0,
    };
  };

  // Create radar chart with SVG
  const createRadarChart = () => {
    if (!skillScores) return null;

    const scores = [skillScores.reading, skillScores.grammar, skillScores.vocabulary, skillScores.listening];
    const labels = ['읽기', '문법', '어휘', '듣기'];
    const size = 300;
    const center = size / 2;
    const radius = 100;
    
    // Calculate points for radar chart
    const angleStep = (2 * Math.PI) / 4;
    const points = scores.map((score, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const distance = (score / 100) * radius;
      return {
        x: center + Math.cos(angle) * distance,
        y: center + Math.sin(angle) * distance,
        label: labels[index],
        score: score,
        labelX: center + Math.cos(angle) * (radius + 30),
        labelY: center + Math.sin(angle) * (radius + 30),
      };
    });

    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ') + ' Z';

    // Grid circles
    const gridCircles = [20, 40, 60, 80, 100].map(percent => {
      const r = (percent / 100) * radius;
      return (
        <circle
          key={percent}
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke="rgba(0, 0, 0, 0.1)"
          strokeWidth="1"
        />
      );
    });

    // Grid lines
    const gridLines = labels.map((_, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const endX = center + Math.cos(angle) * radius;
      const endY = center + Math.sin(angle) * radius;
      return (
        <line
          key={index}
          x1={center}
          y1={center}
          x2={endX}
          y2={endY}
          stroke="rgba(0, 0, 0, 0.1)"
          strokeWidth="1"
        />
      );
    });

    return (
      <svg width={size} height={size} className="mx-auto">
        {gridCircles}
        {gridLines}
        <path
          d={pathData}
          fill="rgba(59, 130, 246, 0.2)"
          stroke="rgba(59, 130, 246, 1)"
          strokeWidth="3"
        />
        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="6"
              fill="rgba(59, 130, 246, 1)"
              stroke="#fff"
              strokeWidth="2"
            />
            <text
              x={point.labelX}
              y={point.labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm font-semibold fill-gray-700"
            >
              {point.label}
            </text>
            <text
              x={point.labelX}
              y={point.labelY + 15}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs fill-blue-600 font-bold"
            >
              {point.score}점
            </text>
          </g>
        ))}
      </svg>
    );
  };

  const getGradeName = (grade: string) => {
    const gradeMap: Record<string, string> = {
      '4': '초등학교 사학년',
      '5': '초등학교 오학년', 
      '6': '초등학교 육학년',
      '1': '중학교 일학년',
      '2': '중학교 이학년',
      '3': '중학교 삼학년',
    };
    return gradeMap[grade] || `${grade}학년`;
  };

  const getSkillDetails = (skill: string, score: number) => {
    const details = {
      reading: { name: 'Reading Comprehension', questions: 8, color: 'border-[var(--boram-blue)]', bgColor: 'bg-[var(--boram-blue)]' },
      grammar: { name: 'Grammar', questions: 8, color: 'border-[var(--boram-green)]', bgColor: 'bg-[var(--boram-green)]' },
      vocabulary: { name: 'Vocabulary', questions: 7, color: 'border-[var(--boram-amber)]', bgColor: 'bg-[var(--boram-amber)]' },
      listening: { name: 'Listening Comprehension', questions: 7, color: 'border-red-400', bgColor: 'bg-red-400' },
    };
    
    const detail = details[skill as keyof typeof details];
    const correct = Math.round((score / 100) * detail.questions);
    const percentage = score;
    
    return { ...detail, correct, percentage };
  };

  const getWeakestSkill = (scores: SkillScores) => {
    const skills: [string, number][] = Object.entries(scores);
    skills.sort((a, b) => a[1] - b[1]);
    return skills[0];
  };

  const getStrongestSkill = (scores: SkillScores) => {
    const skills: [string, number][] = Object.entries(scores);
    skills.sort((a, b) => b[1] - a[1]);
    return skills[0];
  };

  const getLevelInfo = (totalScore: number) => {
    if (totalScore >= 90) return { level: '상급 (C1-C2 Level)', period: '2-3개월', time: '주 4-5회, 각 45분', target: '고급 (C2 Level) 달성' };
    if (totalScore >= 80) return { level: '중상급 (B2-C1 Level)', period: '3-4개월', time: '주 4회, 각 40분', target: '상급 (C1 Level) 달성' };
    if (totalScore >= 70) return { level: '중급 (B1-B2 Level)', period: '3-4개월', time: '주 3-4회, 각 30분', target: '중상급 (B2 Level) 달성' };
    if (totalScore >= 60) return { level: '중급 초기 (A2-B1 Level)', period: '4-5개월', time: '주 3회, 각 30분', target: '중급 (B1 Level) 달성' };
    return { level: '기초 (A1-A2 Level)', period: '5-6개월', time: '주 3회, 각 25분', target: '중급 초기 (A2 Level) 달성' };
  };

  const handleRetakeTest = () => {
    setLocation("/");
    toast({
      title: "새로운 테스트",
      description: "새로운 테스트를 시작할 수 있습니다.",
    });
  };

  const generateResultsText = () => {
    if (!session || !student || !skillScores) return "";
    
    const levelInfo = getLevelInfo(session.totalScore!);
    const weakestSkill = getWeakestSkill(skillScores);
    const strongestSkill = getStrongestSkill(skillScores);
    
    return `
=== BORAM 영어 레벨 테스트 결과 ===

■ 학생 정보
- 이름: ${student.name}
- 학년: ${getGradeName(student.grade)}
- 생년월일: ${student.birthDate}

■ 총점
${session.totalScore}점 / 100점

■ 영역별 점수
- 읽기 (Reading): ${skillScores.reading}점
- 문법 (Grammar): ${skillScores.grammar}점  
- 어휘 (Vocabulary): ${skillScores.vocabulary}점
- 듣기 (Listening): ${skillScores.listening}점

■ 현재 수준
${levelInfo.level}

■ 학습 계획
- 추천 학습 기간: ${levelInfo.period}
- 주간 학습 시간: ${levelInfo.time}
- 다음 목표: ${levelInfo.target}

■ 강점 영역
${strongestSkill[0] === 'reading' ? '읽기' : 
  strongestSkill[0] === 'grammar' ? '문법' :
  strongestSkill[0] === 'vocabulary' ? '어휘' : '듣기'} (${strongestSkill[1]}점)

■ 보완 영역  
${weakestSkill[0] === 'reading' ? '읽기' : 
  weakestSkill[0] === 'grammar' ? '문법' :
  weakestSkill[0] === 'vocabulary' ? '어휘' : '듣기'} (${weakestSkill[1]}점)

※ 이 결과는 ${new Date().toLocaleDateString('ko-KR')}에 생성되었습니다.
    `;
  };

  const getExplanation = (question: any, answer: any) => {
    const correctOption = question.options[question.correctAnswer];
    const selectedOption = question.options[parseInt(answer.selectedAnswer) - 1];
    
    if (question.skill === 'reading') {
      if (answer.isCorrect) {
        return `지문의 핵심 내용을 정확히 파악했습니다. 이런 식으로 주제문이나 결론 부분에 주목하여 읽으면 독해 실력이 향상됩니다.`;
      } else {
        return `정답은 "${correctOption}"입니다. 선택하신 "${selectedOption}"는 지문의 세부 내용과 맞지 않습니다. 지문을 다시 읽어보며 전체적인 맥락을 파악해보세요.`;
      }
    } else if (question.skill === 'grammar') {
      if (answer.isCorrect) {
        return `문법 규칙을 정확히 적용했습니다. 이런 문법 패턴을 다른 문장에서도 찾아보며 연습하면 더욱 실력이 늘 것입니다.`;
      } else {
        return `정답은 "${correctOption}"입니다. 선택하신 "${selectedOption}"는 문법적으로 올바르지 않습니다. 관련 문법 규칙을 다시 확인하고 예문으로 연습해보세요.`;
      }
    } else if (question.skill === 'vocabulary') {
      if (answer.isCorrect) {
        return `단어의 의미를 정확히 알고 있습니다. 이 단어를 사용한 다른 예문도 만들어보며 어휘력을 늘려보세요.`;
      } else {
        return `정답은 "${correctOption}"입니다. 선택하신 "${selectedOption}"는 문맥에 맞지 않습니다. 단어의 정확한 의미와 사용법을 사전에서 확인해보세요.`;
      }
    } else if (question.skill === 'listening') {
      if (answer.isCorrect) {
        return `듣기 내용을 정확히 이해했습니다. 계속해서 영어 듣기 연습을 하면 더욱 향상될 것입니다.`;
      } else {
        return `정답은 "${correctOption}"입니다. 선택하신 "${selectedOption}"는 들려준 내용과 다릅니다. 영어 발음과 억양에 더 주의를 기울이며 들어보세요.`;
      }
    }
    return `정답은 "${correctOption}"입니다. 관련 내용을 복습해보세요.`;
  };

  const handleShowAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  const handleSaveResults = () => {
    const resultsText = generateResultsText();
    const blob = new Blob([resultsText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BORAM_영어테스트결과_${student?.name}_${new Date().toLocaleDateString('ko-KR').replace(/\./g, '')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "저장 완료",
      description: "테스트 결과가 파일로 다운로드되었습니다.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--boram-blue)]"></div>
          <p className="mt-4 text-lg text-gray-600">결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!session || !student || !skillScores) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">결과를 찾을 수 없습니다</h1>
          <p className="text-gray-600">테스트가 완료되지 않았거나 잘못된 링크입니다.</p>
        </div>
      </div>
    );
  }

  const weakestSkill = getWeakestSkill(skillScores);
  const strongestSkill = getStrongestSkill(skillScores);
  const levelInfo = getLevelInfo(session.totalScore!);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Score Summary */}
      <Card className="bg-gradient-to-r from-[var(--boram-green)] to-green-500 rounded-2xl shadow-lg p-8 text-white text-center">
        <CardContent className="p-0">
          <div className="mb-6">
            <Trophy className="mx-auto mb-4 text-yellow-300" size={64} />
            <h2 className="text-3xl font-bold mb-2">테스트 완료!</h2>
            <p className="text-xl opacity-90">수고하셨습니다. 결과를 확인해보세요.</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-6 inline-block">
            <div className="text-5xl font-bold mb-2">{session.totalScore}점 / 100점</div>
          </div>
        </CardContent>
      </Card>

      {/* Student Info Display */}
      <Card className="bg-white rounded-2xl shadow-lg p-6">
        <CardContent className="p-0">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            <User className="inline mr-2 text-[var(--boram-blue)]" size={20} />
            학생 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="font-semibold text-gray-600">이름</div>
              <div className="text-lg font-bold text-[var(--boram-blue)]">{student.name}</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="font-semibold text-gray-600">학년</div>
              <div className="text-lg font-bold text-[var(--boram-green)]">{getGradeName(student.grade)}</div>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <div className="font-semibold text-gray-600">생년월일</div>
              <div className="text-lg font-bold text-[var(--boram-amber)]">{student.birthDate}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <Card className="bg-white rounded-2xl shadow-lg p-8">
          <CardContent className="p-0">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              <IdCard className="inline mr-2 text-[var(--boram-blue)]" size={20} />
              영역별 성취도
            </h3>
            <div className="flex justify-center">
              {createRadarChart()}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Scores */}
        <Card className="bg-white rounded-2xl shadow-lg p-8">
          <CardContent className="p-0">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              <School className="inline mr-2 text-[var(--boram-green)]" size={20} />
              영역별 세부 결과
            </h3>
            <div className="space-y-4">
              {Object.entries(skillScores).map(([skill, score]) => {
                const details = getSkillDetails(skill, score as number);
                const correctAnswers = Math.round(((score as number) / 100) * 5); // 5문제 중 맞힌 개수
                return (
                  <div key={skill} className={`border-l-4 ${details.color} pl-4`}>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-800">{details.name}</h4>
                    </div>
                    <Progress value={score as number} className="w-full h-2 mb-2" />
                    <p className="text-sm text-gray-600">
                      5문제 중 {correctAnswers}문제 정답 ({score as number}%)
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback and Recommendations */}
      <Card className="bg-white rounded-2xl shadow-lg p-8">
        <CardContent className="p-0">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            <Lightbulb className="inline mr-2 text-yellow-500" size={20} />
            맞춤형 학습 제안
          </h3>
          
          {/* Strengths */}
          <div className="mb-8">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg mb-4">
              <h4 className="font-bold text-green-800 mb-3 flex items-center">
                <ThumbsUp className="mr-2" size={16} />
                강점 영역
              </h4>
              <div className="space-y-2 text-green-700">
                <p><strong>{getSkillDetails(strongestSkill[0], strongestSkill[1]).name}:</strong> 
                  {strongestSkill[1] >= 90 ? " 매우 뛰어난 실력을 보여주고 있습니다. 이 영역을 활용한 고급 학습을 추천합니다." :
                   strongestSkill[1] >= 80 ? " 우수한 실력을 보여주고 있습니다. 지속적인 발전을 위해 심화 학습을 추천합니다." :
                   " 좋은 이해력을 보여주고 있습니다. 꾸준한 연습으로 더욱 향상시킬 수 있습니다."}
                </p>
              </div>
            </div>
          </div>

          {/* Areas for Improvement */}
          <div className="mb-8">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg mb-4">
              <h4 className="font-bold text-orange-800 mb-3 flex items-center">
                <Target className="mr-2" size={16} />
                개선 필요 영역
              </h4>
              <div className="space-y-4 text-orange-700">
                <div>
                  <p><strong>{getSkillDetails(weakestSkill[0], weakestSkill[1]).name} ({weakestSkill[1]}점):</strong> 
                    {weakestSkill[1] < 60 ? " 기초부터 차근차근 학습이 필요합니다." :
                     weakestSkill[1] < 75 ? " 추가 연습을 통해 향상이 가능합니다." :
                     " 조금 더 연습하면 우수한 실력을 갖출 수 있습니다."}
                  </p>
                  <ul className="list-disc list-inside mt-2 ml-4 space-y-1 text-orange-600">
                    {weakestSkill[0] === 'listening' && (
                      <>
                        <li>영어 오디오북이나 팟캐스트 듣기</li>
                        <li>영어 만화나 애니메이션 시청하기</li>
                        <li>영어 노래 들으며 가사 따라하기</li>
                      </>
                    )}
                    {weakestSkill[0] === 'vocabulary' && (
                      <>
                        <li>하루에 새로운 영어 단어 5개씩 외우기</li>
                        <li>단어 카드나 어휘 앱 활용하기</li>
                        <li>영어 일기 쓰며 배운 단어 활용하기</li>
                      </>
                    )}
                    {weakestSkill[0] === 'grammar' && (
                      <>
                        <li>기본 문법 규칙 체계적으로 학습하기</li>
                        <li>문법 연습 문제집 활용하기</li>
                        <li>간단한 영어 문장 만들어보기</li>
                      </>
                    )}
                    {weakestSkill[0] === 'reading' && (
                      <>
                        <li>수준에 맞는 영어 책 꾸준히 읽기</li>
                        <li>읽은 내용 요약해보기</li>
                        <li>모르는 단어 찾아보고 정리하기</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <h4 className="font-bold text-blue-800 mb-3 flex items-center">
              <Route className="mr-2" size={16} />
              다음 단계 학습 계획
            </h4>
            <div className="text-blue-700 space-y-2">
              <p>현재 수준: <strong>{levelInfo.level}</strong></p>
              <p>추천 학습 기간: <strong>{levelInfo.period}</strong></p>
              <p>주간 학습 시간: <strong>{levelInfo.time}</strong></p>
              <p>다음 목표: <strong>{levelInfo.target}</strong></p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={() => setLocation("/")}
          className="flex items-center justify-center px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <User className="mr-2" size={20} />
          처음으로
        </Button>
        <Button
          onClick={handleShowAnswers}
          className="flex items-center justify-center px-8 py-4 bg-[var(--boram-blue)] hover:bg-blue-600 text-white rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <CheckCircle className="mr-2" size={20} />
          정답확인
        </Button>
        <Button
          onClick={handleSaveResults}
          className="flex items-center justify-center px-8 py-4 bg-[var(--boram-green)] hover:bg-green-600 text-white rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <Save className="mr-2" size={20} />
          저장하기
        </Button>
      </div>

      {/* Answers Review Section */}
      {showAnswers && session && session.answers && (
        <Card className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <CardContent className="p-0">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              <CheckCircle className="inline mr-2 text-[var(--boram-blue)]" size={20} />
              정답 및 해설
            </h3>
            <div className="space-y-4">
              {session.answers.map((answer: any, index: number) => (
                <div
                  key={index}
                  className={`border-2 rounded-xl p-4 ${
                    answer.isCorrect 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <span className="font-bold text-lg mr-3">
                        문제 {index + 1}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        answer.isCorrect 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {answer.isCorrect ? '정답' : '오답'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-600">선택한 답: </span>
                      <span className={answer.isCorrect ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                        {answer.selectedAnswer}번
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-600">정답: </span>
                      <span className="text-green-600 font-semibold">
                        {questions && questions[index] ? `${questions[index].correctAnswer + 1}번` : '정답 정보 없음'}
                      </span>
                    </div>
                  </div>
                  
                  {questions && questions[index] && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <span className="font-semibold text-blue-800">해설: </span>
                      <span className="text-blue-700">
                        {getExplanation(questions[index], answer)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
