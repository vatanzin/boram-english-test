// 완전한 클라이언트 전용 저장소
export interface Student {
  id: number;
  name: string;
  grade: string;
  birthDate: string;
  createdAt: string;
}

export interface TestSession {
  id: number;
  studentId: number;
  startTime: string;
  endTime?: string;
  timeRemaining: number;
  currentQuestion: number;
  answers: Answer[];
  isCompleted: boolean;
  totalScore?: number;
}

export interface Answer {
  questionId: number;
  selectedAnswer: string;
  isCorrect: boolean;
  skill: string;
}

class ClientStorage {
  private students: Student[] = [];
  private sessions: TestSession[] = [];
  private studentIdCounter = 1;
  private sessionIdCounter = 1;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const studentsData = localStorage.getItem('boram_students');
      const sessionsData = localStorage.getItem('boram_sessions');
      
      if (studentsData) {
        this.students = JSON.parse(studentsData);
        this.studentIdCounter = Math.max(0, ...this.students.map(s => s.id)) + 1;
      }
      
      if (sessionsData) {
        this.sessions = JSON.parse(sessionsData);
        this.sessionIdCounter = Math.max(0, ...this.sessions.map(s => s.id)) + 1;
      }
    } catch (error) {
      console.error('Storage load error:', error);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('boram_students', JSON.stringify(this.students));
      localStorage.setItem('boram_sessions', JSON.stringify(this.sessions));
    } catch (error) {
      console.error('Storage save error:', error);
    }
  }

  // Student operations
  createStudent(data: Omit<Student, 'id' | 'createdAt'>): Student {
    const student: Student = {
      ...data,
      id: this.studentIdCounter++,
      createdAt: new Date().toISOString()
    };
    
    this.students.push(student);
    this.saveToStorage();
    return student;
  }

  getStudent(id: number): Student | undefined {
    return this.students.find(s => s.id === id);
  }

  // Test session operations
  createTestSession(data: { studentId: number }): TestSession {
    const session: TestSession = {
      id: this.sessionIdCounter++,
      studentId: data.studentId,
      startTime: new Date().toISOString(),
      timeRemaining: 0, // No timer
      currentQuestion: 1,
      answers: [],
      isCompleted: false
    };
    
    this.sessions.push(session);
    this.saveToStorage();
    return session;
  }

  getTestSession(id: number): TestSession | undefined {
    return this.sessions.find(s => s.id === id);
  }

  updateTestSession(id: number, updates: Partial<TestSession>): TestSession | undefined {
    const sessionIndex = this.sessions.findIndex(s => s.id === id);
    if (sessionIndex === -1) return undefined;
    
    this.sessions[sessionIndex] = { ...this.sessions[sessionIndex], ...updates };
    this.saveToStorage();
    return this.sessions[sessionIndex];
  }

  addAnswer(sessionId: number, answer: Answer): TestSession | undefined {
    const session = this.getTestSession(sessionId);
    if (!session) return undefined;
    
    // Remove existing answer for this question
    const filteredAnswers = session.answers.filter(a => a.questionId !== answer.questionId);
    session.answers = [...filteredAnswers, answer];
    
    return this.updateTestSession(sessionId, { answers: session.answers });
  }
}

export const clientStorage = new ClientStorage();