import { Question } from "@shared/schema";

const elementaryQuestions: Question[] = [
  // Reading Comprehension (Elementary - 4 questions)
  {
    id: 1,
    skill: 'reading',
    grade: 'elementary',
    difficulty: 'easy',
    passage: "Sarah loves to read books every evening. She has a small library in her room with many different kinds of books. Her favorite books are about adventures and fantasy. Last week, she read a book about a young wizard who saved his village from a dragon.",
    question: "What is Sarah's favorite type of book?",
    options: [
      "Science books",
      "Adventure and fantasy books",
      "History books",
      "Comic books"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    skill: 'reading',
    grade: 'elementary',
    difficulty: 'easy',
    passage: "Tom's family went to the zoo last weekend. They saw many animals including lions, elephants, and monkeys. Tom's favorite animal was the penguin because it was funny to watch them swim and play. They spent three hours at the zoo and had a picnic lunch there.",
    question: "What was Tom's favorite animal?",
    options: [
      "Lions",
      "Elephants",
      "Monkeys",
      "Penguins"
    ],
    correctAnswer: 3
  },
  {
    id: 3,
    skill: 'reading',
    grade: 'elementary',
    difficulty: 'medium',
    passage: "Maria is learning to cook with her grandmother. Every Sunday, they make traditional food together. Maria's grandmother teaches her how to make soup, bread, and desserts. Maria enjoys cooking because she can help her family and learn about her culture.",
    question: "Why does Maria enjoy cooking?",
    options: [
      "It's easy to do",
      "She can help her family and learn about her culture",
      "She wants to become famous",
      "Her friends like it"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    skill: 'reading',
    grade: 'elementary',
    difficulty: 'medium',
    passage: "The school library is open from 8 AM to 5 PM every day except Sunday. Students can borrow up to 3 books for two weeks. If they want to keep the books longer, they need to come back and renew them. The library also has computers that students can use for research.",
    question: "How many books can students borrow?",
    options: [
      "2 books",
      "3 books",
      "4 books",
      "5 books"
    ],
    correctAnswer: 1
  },

  // Grammar (Elementary - 4 questions)
  {
    id: 5,
    skill: 'grammar',
    grade: 'elementary',
    difficulty: 'easy',
    question: "Choose the correct form: 'I _____ to school every day.'",
    options: [
      "go",
      "goes",
      "going",
      "went"
    ],
    correctAnswer: 0
  },
  {
    id: 6,
    skill: 'grammar',
    grade: 'elementary',
    difficulty: 'easy',
    question: "Which sentence is correct?",
    options: [
      "She have a beautiful dress.",
      "She has a beautiful dress.",
      "She having a beautiful dress.",
      "She had have a beautiful dress."
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    skill: 'grammar',
    grade: 'elementary',
    difficulty: 'medium',
    question: "Choose the correct past tense: 'Yesterday, I _____ my homework.'",
    options: [
      "do",
      "did",
      "done",
      "doing"
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    skill: 'grammar',
    grade: 'elementary',
    difficulty: 'medium',
    question: "Which sentence uses the correct article?",
    options: [
      "I want to eat a apple.",
      "I want to eat an apple.",
      "I want to eat the apple specific.",
      "I want to eat apple."
    ],
    correctAnswer: 1
  },

  // Vocabulary (Elementary - 4 questions)
  {
    id: 9,
    skill: 'vocabulary',
    grade: 'elementary',
    difficulty: 'easy',
    question: "What does 'happy' mean?",
    options: [
      "Sad",
      "Angry",
      "Joyful",
      "Tired"
    ],
    correctAnswer: 2
  },
  {
    id: 10,
    skill: 'vocabulary',
    grade: 'elementary',
    difficulty: 'easy',
    question: "Choose the opposite of 'big':",
    options: [
      "Large",
      "Huge",
      "Small",
      "Tall"
    ],
    correctAnswer: 2
  },
  {
    id: 11,
    skill: 'vocabulary',
    grade: 'elementary',
    difficulty: 'medium',
    question: "What is another word for 'beautiful'?",
    options: [
      "Ugly",
      "Pretty",
      "Bad",
      "Dirty"
    ],
    correctAnswer: 1
  },
  {
    id: 12,
    skill: 'vocabulary',
    grade: 'elementary',
    difficulty: 'medium',
    question: "Which word means 'very cold'?",
    options: [
      "Warm",
      "Hot",
      "Cool",
      "Freezing"
    ],
    correctAnswer: 3
  },

  // Additional Reading Questions (Elementary)
  {
    id: 13,
    skill: 'reading',
    grade: 'elementary',
    difficulty: 'easy',
    passage: "Anna has a pet dog named Buddy. Buddy is brown and white. Every morning, Anna takes Buddy for a walk in the park. Buddy loves to play with other dogs and chase balls.",
    question: "What color is Buddy?",
    options: [
      "Black and white",
      "Brown and white", 
      "Brown and black",
      "All brown"
    ],
    correctAnswer: 1
  },
  {
    id: 14,
    skill: 'reading',
    grade: 'elementary',
    difficulty: 'medium',
    passage: "The weather was perfect for the school picnic. All the students brought their lunch boxes and sat under the big trees. They played games, sang songs, and had lots of fun. The teachers took many photos to remember this special day.",
    question: "Where did the students eat their lunch?",
    options: [
      "In the classroom",
      "Under the big trees",
      "At home",
      "In the cafeteria"
    ],
    correctAnswer: 1
  },

  // Additional Grammar Questions (Elementary)
  {
    id: 15,
    skill: 'grammar',
    grade: 'elementary',
    difficulty: 'easy',
    question: "Choose the correct form: 'There _____ many books on the shelf.'",
    options: [
      "is",
      "are",
      "was",
      "were"
    ],
    correctAnswer: 1
  },
  {
    id: 16,
    skill: 'grammar',
    grade: 'elementary',
    difficulty: 'medium',
    question: "Which sentence is in the future tense?",
    options: [
      "I eat breakfast every day.",
      "I ate breakfast yesterday.",
      "I will eat breakfast tomorrow.",
      "I am eating breakfast now."
    ],
    correctAnswer: 2
  },

  // Additional Vocabulary Questions (Elementary)
  {
    id: 17,
    skill: 'vocabulary',
    grade: 'elementary',
    difficulty: 'easy',
    question: "What does 'fast' mean?",
    options: [
      "Slow",
      "Quick",
      "Loud",
      "Quiet"
    ],
    correctAnswer: 1
  },
  {
    id: 18,
    skill: 'vocabulary',
    grade: 'elementary',
    difficulty: 'medium',
    question: "Choose the word that means 'very tired':",
    options: [
      "Awake",
      "Energetic",
      "Exhausted",
      "Happy"
    ],
    correctAnswer: 2
  },

  // Listening (Elementary - 7 questions)
  {
    id: 19,
    skill: 'listening',
    grade: 'elementary',
    difficulty: 'easy',
    passage: "The cat is sleeping on the sofa.",
    question: "Where is the cat?",
    options: [
      "On the bed",
      "On the sofa",
      "On the floor",
      "On the table"
    ],
    correctAnswer: 1
  },
  {
    id: 20,
    skill: 'listening',
    grade: 'elementary',
    difficulty: 'easy',
    passage: "I like to eat apples and oranges.",
    question: "What fruits does the person like?",
    options: [
      "Apples and bananas",
      "Oranges and grapes",
      "Apples and oranges",
      "Bananas and oranges"
    ],
    correctAnswer: 2
  },
  {
    id: 21,
    skill: 'listening',
    grade: 'elementary',
    difficulty: 'easy',
    passage: "My birthday is in December.",
    question: "When is the person's birthday?",
    options: [
      "In November",
      "In December",
      "In January",
      "In October"
    ],
    correctAnswer: 1
  },
  {
    id: 22,
    skill: 'listening',
    grade: 'elementary',
    difficulty: 'medium',
    passage: "We will go to the park after lunch.",
    question: "When will they go to the park?",
    options: [
      "Before lunch",
      "During lunch",
      "After lunch",
      "At night"
    ],
    correctAnswer: 2
  },
  {
    id: 23,
    skill: 'listening',
    grade: 'elementary',
    difficulty: 'medium',
    passage: "Please bring your notebook and pencil to class tomorrow.",
    question: "What should you bring?",
    options: [
      "Only notebook",
      "Only pencil",
      "Notebook and pencil",
      "Books and notebook"
    ],
    correctAnswer: 2
  },
  {
    id: 24,
    skill: 'listening',
    grade: 'elementary',
    difficulty: 'medium',
    passage: "The library closes at five o'clock in the evening.",
    question: "When does the library close?",
    options: [
      "At four o'clock",
      "At five o'clock",
      "At six o'clock",
      "At seven o'clock"
    ],
    correctAnswer: 1
  },
  {
    id: 25,
    skill: 'listening',
    grade: 'elementary',
    difficulty: 'medium',
    passage: "My sister is learning to play the piano.",
    question: "What instrument is the sister learning?",
    options: [
      "Guitar",
      "Piano",
      "Violin",
      "Drum"
    ],
    correctAnswer: 1
  }
];

const middleSchoolQuestions: Question[] = [
  // Reading Comprehension (Middle School - 4 questions)
  {
    id: 100,
    skill: 'reading',
    grade: 'middle',
    difficulty: 'medium',
    passage: "Climate change is one of the most pressing issues of our time. It refers to long-term changes in global temperatures and weather patterns. While some climate change is natural, scientific evidence shows that human activities, particularly the burning of fossil fuels, have been the primary driver of climate change since the mid-20th century.",
    question: "According to the passage, what has been the main cause of climate change since the mid-20th century?",
    options: [
      "Natural climate variations",
      "Human activities, especially burning fossil fuels",
      "Solar radiation changes",
      "Volcanic activities"
    ],
    correctAnswer: 1
  },
  {
    id: 101,
    skill: 'reading',
    grade: 'middle',
    difficulty: 'medium',
    passage: "The Internet has revolutionized the way we communicate, learn, and conduct business. It has made information more accessible than ever before, allowing people to connect across vast distances instantly. However, this digital revolution has also created new challenges, including privacy concerns, cybersecurity threats, and the spread of misinformation.",
    question: "What is mentioned as both a benefit and a challenge of the Internet?",
    options: [
      "Instant communication",
      "Business opportunities",
      "Access to information and potential misinformation",
      "Global connectivity"
    ],
    correctAnswer: 2
  },
  {
    id: 102,
    skill: 'reading',
    grade: 'middle',
    difficulty: 'hard',
    passage: "Renewable energy sources such as solar, wind, and hydroelectric power are becoming increasingly important as the world seeks to reduce its dependence on fossil fuels. These clean energy technologies not only help combat climate change but also create new job opportunities and promote economic growth in many regions.",
    question: "What does the passage suggest about renewable energy?",
    options: [
      "It only benefits the environment",
      "It replaces all fossil fuels immediately",
      "It provides both environmental and economic benefits",
      "It is too expensive to implement"
    ],
    correctAnswer: 2
  },
  {
    id: 103,
    skill: 'reading',
    grade: 'middle',
    difficulty: 'hard',
    passage: "Artificial Intelligence (AI) is rapidly transforming various sectors including healthcare, education, and transportation. While AI offers tremendous potential to solve complex problems and improve efficiency, it also raises important ethical questions about job displacement, privacy, and the need for human oversight in decision-making processes.",
    question: "What is the main idea of this passage?",
    options: [
      "AI will replace all human jobs",
      "AI is only useful in healthcare",
      "AI has both great potential and important challenges",
      "AI should be avoided due to ethical concerns"
    ],
    correctAnswer: 2
  },

  // Grammar (Middle School - 4 questions)
  {
    id: 104,
    skill: 'grammar',
    grade: 'middle',
    difficulty: 'medium',
    question: "Choose the correct form: 'If I _____ you, I would study harder.'",
    options: [
      "am",
      "was",
      "were",
      "be"
    ],
    correctAnswer: 2
  },
  {
    id: 105,
    skill: 'grammar',
    grade: 'middle',
    difficulty: 'medium',
    question: "Which sentence uses the passive voice correctly?",
    options: [
      "The book was read by many students.",
      "The book read by many students.",
      "The book is reading by many students.",
      "The book has read by many students."
    ],
    correctAnswer: 0
  },
  {
    id: 22,
    skill: 'grammar',
    grade: 'middle',
    difficulty: 'hard',
    question: "Choose the correct relative clause: 'The teacher _____ helped me is very kind.'",
    options: [
      "which",
      "whom",
      "who",
      "whose"
    ],
    correctAnswer: 2
  },
  {
    id: 23,
    skill: 'grammar',
    grade: 'middle',
    difficulty: 'hard',
    question: "Which sentence shows the correct use of the present perfect tense?",
    options: [
      "I have saw that movie yesterday.",
      "I have seen that movie before.",
      "I had seen that movie before.",
      "I was seeing that movie before."
    ],
    correctAnswer: 1
  },

  // Vocabulary (Middle School - 3 questions)
  {
    id: 24,
    skill: 'vocabulary',
    grade: 'middle',
    difficulty: 'medium',
    question: "What does 'perseverance' mean?",
    options: [
      "Giving up easily",
      "Persistence in doing something despite difficulty",
      "Being very intelligent",
      "Acting quickly"
    ],
    correctAnswer: 1
  },
  {
    id: 25,
    skill: 'vocabulary',
    grade: 'middle',
    difficulty: 'hard',
    question: "Choose the word that best completes the sentence: 'The scientist's discovery was _____ and changed our understanding of physics.'",
    options: [
      "ordinary",
      "revolutionary",
      "confusing",
      "simple"
    ],
    correctAnswer: 1
  },
  {
    id: 26,
    skill: 'vocabulary',
    grade: 'middle',
    difficulty: 'hard',
    question: "What is the meaning of 'sustainable' in environmental context?",
    options: [
      "Temporary and short-term",
      "Expensive and difficult",
      "Able to be maintained over time without harming the environment",
      "Only for wealthy countries"
    ],
    correctAnswer: 2
  },

  // Additional Reading Questions (Middle School)
  {
    id: 26,
    skill: 'reading',
    grade: 'middle',
    difficulty: 'easy',
    passage: "Social media has become an integral part of modern life, especially for young people. It allows users to connect with friends, share experiences, and access information quickly. However, it's important to use social media responsibly and be aware of potential risks such as cyberbullying and misinformation.",
    question: "According to the passage, what should people be aware of when using social media?",
    options: [
      "Only the benefits",
      "Potential risks like cyberbullying and misinformation",
      "How to get more followers",
      "New apps to download"
    ],
    correctAnswer: 1
  },
  {
    id: 27,
    skill: 'reading',
    grade: 'middle',
    difficulty: 'easy',
    passage: "Regular exercise is essential for maintaining good health. It helps strengthen muscles, improve cardiovascular health, and boost mental well-being. Even simple activities like walking or cycling for 30 minutes a day can make a significant difference in overall fitness.",
    question: "How much daily exercise does the passage suggest?",
    options: [
      "15 minutes",
      "30 minutes", 
      "45 minutes",
      "60 minutes"
    ],
    correctAnswer: 1
  },

  // Additional Grammar Questions (Middle School)  
  {
    id: 28,
    skill: 'grammar',
    grade: 'middle',
    difficulty: 'easy',
    question: "Choose the correct form: 'She _____ been studying English for three years.'",
    options: [
      "have",
      "has",
      "had",
      "having"
    ],
    correctAnswer: 1
  },
  {
    id: 29,
    skill: 'grammar',
    grade: 'middle',
    difficulty: 'easy',
    question: "Which sentence uses the correct comparative form?",
    options: [
      "This book is more better than that one.",
      "This book is better than that one.",
      "This book is best than that one.",
      "This book is gooder than that one."
    ],
    correctAnswer: 1
  },

  // Additional Vocabulary Questions (Middle School)
  {
    id: 30,
    skill: 'vocabulary',
    grade: 'middle',
    difficulty: 'easy',
    question: "What does 'ambitious' mean?",
    options: [
      "Lazy and unmotivated",
      "Having strong desire to succeed",
      "Very tired",
      "Confused and uncertain"
    ],
    correctAnswer: 1
  },
  {
    id: 31,
    skill: 'vocabulary',
    grade: 'middle',
    difficulty: 'medium',
    question: "Choose the word that best fits: 'The detective carefully _____ the evidence.'",
    options: [
      "ignored",
      "examined",
      "destroyed",
      "lost"
    ],
    correctAnswer: 1
  },

  // Listening (Middle School - 9 questions)
  {
    id: 32,
    skill: 'listening',
    grade: 'middle',
    difficulty: 'easy',
    passage: "The library will be closed next Monday for maintenance.",
    question: "When will the library be closed?",
    options: [
      "This Monday",
      "Next Monday",
      "Next Tuesday",
      "Next Friday"
    ],
    correctAnswer: 1
  },
  {
    id: 33,
    skill: 'listening',
    grade: 'middle',
    difficulty: 'easy',
    passage: "Please remember to bring your student ID to the exam.",
    question: "What should students bring to the exam?",
    options: [
      "Textbooks",
      "Student ID",
      "Calculator",
      "Notebook"
    ],
    correctAnswer: 1
  },
  {
    id: 34,
    skill: 'listening',
    grade: 'middle',
    difficulty: 'easy',
    passage: "The basketball team practice is every Tuesday and Thursday at 4 PM.",
    question: "When does the basketball team practice?",
    options: [
      "Monday and Wednesday at 4 PM",
      "Tuesday and Thursday at 4 PM", 
      "Tuesday and Thursday at 5 PM",
      "Every day at 4 PM"
    ],
    correctAnswer: 1
  },
  {
    id: 35,
    skill: 'listening',
    grade: 'middle',
    difficulty: 'medium',
    passage: "The meeting has been postponed until next Friday due to the speaker's illness.",
    question: "When will the meeting take place?",
    options: [
      "This Friday",
      "Next Friday",
      "Next Monday",
      "It's cancelled"
    ],
    correctAnswer: 1
  },
  {
    id: 36,
    skill: 'listening',
    grade: 'middle',
    difficulty: 'medium',
    passage: "Students who wish to participate in the science fair must submit their projects by March 15th.",
    question: "What is the deadline?",
    options: [
      "March 5th",
      "March 15th",
      "March 25th",
      "April 15th"
    ],
    correctAnswer: 1
  },
  {
    id: 37,
    skill: 'listening',
    grade: 'middle',
    difficulty: 'medium',
    passage: "The school cafeteria will offer vegetarian options every Wednesday and Friday.",
    question: "When will vegetarian options be available?",
    options: [
      "Every day",
      "Monday and Tuesday",
      "Wednesday and Friday",
      "Only on Friday"
    ],
    correctAnswer: 2
  },
  {
    id: 38,
    skill: 'listening',
    grade: 'middle',
    difficulty: 'hard',
    passage: "Although the weather forecast predicted rain, the outdoor concert will proceed as scheduled with appropriate arrangements.",
    question: "What will happen to the concert?",
    options: [
      "It will be cancelled",
      "It will be moved indoors",
      "It will continue as planned with preparations for rain",
      "It will be postponed"
    ],
    correctAnswer: 2
  },
  {
    id: 39,
    skill: 'listening',
    grade: 'middle',
    difficulty: 'hard',
    passage: "The scholarship recipients must maintain a minimum GPA of 3.5 and complete 20 hours of community service per semester.",
    question: "What are the requirements for scholarship recipients?",
    options: [
      "Only maintain GPA of 3.5",
      "Only complete community service",
      "Both maintain 3.5 GPA and complete 20 hours of community service",
      "Take extra classes"
    ],
    correctAnswer: 2
  },
  {
    id: 40,
    skill: 'listening',
    grade: 'middle',
    difficulty: 'hard',
    passage: "The research indicates that students who participate in extracurricular activities tend to have better academic performance and stronger social skills.",
    question: "According to the research, what benefits do extracurricular activities provide?",
    options: [
      "Only better grades",
      "Only better social skills",
      "Better academic performance and stronger social skills",
      "More free time"
    ],
    correctAnswer: 2
  }
];

export function getQuestions(grade: string): Question[] {
  const gradeNumber = parseInt(grade);
  const gradeLevel = gradeNumber >= 4 && gradeNumber <= 6 ? 'elementary' : 'middle';
  
  // Select base questions based on grade level
  const baseQuestions = gradeLevel === 'elementary' ? elementaryQuestions : middleSchoolQuestions;
  
  // Group questions by skill
  const questionsBySkill = {
    reading: baseQuestions.filter(q => q.skill === 'reading'),
    grammar: baseQuestions.filter(q => q.skill === 'grammar'),
    vocabulary: baseQuestions.filter(q => q.skill === 'vocabulary'),
    listening: baseQuestions.filter(q => q.skill === 'listening')
  };
  
  // Select exactly 5 questions per skill (20 total)
  const selectedQuestions: Question[] = [
    ...questionsBySkill.reading.slice(0, 5),
    ...questionsBySkill.grammar.slice(0, 5),
    ...questionsBySkill.vocabulary.slice(0, 5),
    ...questionsBySkill.listening.slice(0, 5)
  ];
  
  return selectedQuestions;
}

// Function to get grade-appropriate questions
export const getQuestionsForGrade = (grade: string): Question[] => {
  const gradeLevel = grade.split('-')[0]; // 'elementary' or 'middle'
  const gradeNumber = parseInt(grade.split('-')[1]); // 4, 5, 6, 1, 2, 3
  
  let selectedQuestions: Question[] = [];
  
  if (gradeLevel === 'elementary') {
    // Elementary students (grades 4-6)
    const elementaryBySkill = {
      reading: elementaryQuestions.filter(q => q.skill === 'reading'),
      grammar: elementaryQuestions.filter(q => q.skill === 'grammar'), 
      vocabulary: elementaryQuestions.filter(q => q.skill === 'vocabulary'),
      listening: elementaryQuestions.filter(q => q.skill === 'listening')
    };
    
    // For elementary students, get exactly 20 questions (5 per skill)
    if (gradeNumber === 4) {
      // Grade 4: Easy level focus
      selectedQuestions = [
        ...elementaryBySkill.reading.filter(q => q.difficulty === 'easy').slice(0, 3),
        ...elementaryBySkill.reading.filter(q => q.difficulty === 'medium').slice(0, 2),
        ...elementaryBySkill.grammar.filter(q => q.difficulty === 'easy').slice(0, 3), 
        ...elementaryBySkill.grammar.filter(q => q.difficulty === 'medium').slice(0, 2),
        ...elementaryBySkill.vocabulary.filter(q => q.difficulty === 'easy').slice(0, 3),
        ...elementaryBySkill.vocabulary.filter(q => q.difficulty === 'medium').slice(0, 2),
        ...elementaryBySkill.listening.filter(q => q.difficulty === 'easy').slice(0, 3),
        ...elementaryBySkill.listening.filter(q => q.difficulty === 'medium').slice(0, 2)
      ];
    } else if (gradeNumber === 5) {
      // Grade 5: Mix of easy and medium
      selectedQuestions = [
        ...elementaryBySkill.reading.filter(q => q.difficulty === 'easy').slice(0, 2),
        ...elementaryBySkill.reading.filter(q => q.difficulty === 'medium').slice(0, 3),
        ...elementaryBySkill.grammar.filter(q => q.difficulty === 'easy').slice(0, 2),
        ...elementaryBySkill.grammar.filter(q => q.difficulty === 'medium').slice(0, 3),
        ...elementaryBySkill.vocabulary.filter(q => q.difficulty === 'easy').slice(0, 2),
        ...elementaryBySkill.vocabulary.filter(q => q.difficulty === 'medium').slice(0, 3),
        ...elementaryBySkill.listening.filter(q => q.difficulty === 'easy').slice(0, 2),
        ...elementaryBySkill.listening.filter(q => q.difficulty === 'medium').slice(0, 3)
      ];
    } else {
      // Grade 6: Medium focus with some easy and hard
      selectedQuestions = [
        ...elementaryBySkill.reading.filter(q => q.difficulty === 'easy').slice(0, 1),
        ...elementaryBySkill.reading.filter(q => q.difficulty === 'medium').slice(0, 3),
        ...middleSchoolQuestions.filter(q => q.skill === 'reading' && q.difficulty === 'easy').slice(0, 1),
        ...elementaryBySkill.grammar.filter(q => q.difficulty === 'easy').slice(0, 1),
        ...elementaryBySkill.grammar.filter(q => q.difficulty === 'medium').slice(0, 3),
        ...middleSchoolQuestions.filter(q => q.skill === 'grammar' && q.difficulty === 'easy').slice(0, 1),
        ...elementaryBySkill.vocabulary.filter(q => q.difficulty === 'medium').slice(0, 4),
        ...elementaryBySkill.vocabulary.filter(q => q.difficulty === 'easy').slice(0, 1),
        ...elementaryBySkill.listening.filter(q => q.difficulty === 'medium').slice(0, 3),
        ...elementaryBySkill.listening.filter(q => q.difficulty === 'easy').slice(0, 2)
      ];
    }
  } else {
    // Middle school students (grades 1-3)
    const middleBySkill = {
      reading: middleSchoolQuestions.filter(q => q.skill === 'reading'),
      grammar: middleSchoolQuestions.filter(q => q.skill === 'grammar'),
      vocabulary: middleSchoolQuestions.filter(q => q.skill === 'vocabulary'), 
      listening: middleSchoolQuestions.filter(q => q.skill === 'listening')
    };
    
    if (gradeNumber === 1) {
      // Middle 1: Easy to medium middle school level (5 questions per skill = 20 total)
      selectedQuestions = [
        ...middleBySkill.reading.filter(q => q.difficulty === 'easy').slice(0, 3),
        ...middleBySkill.reading.filter(q => q.difficulty === 'medium').slice(0, 2),
        ...middleBySkill.grammar.filter(q => q.difficulty === 'easy').slice(0, 3),
        ...middleBySkill.grammar.filter(q => q.difficulty === 'medium').slice(0, 2),
        ...middleBySkill.vocabulary.filter(q => q.difficulty === 'easy').slice(0, 3),
        ...middleBySkill.vocabulary.filter(q => q.difficulty === 'medium').slice(0, 2),
        ...middleBySkill.listening.filter(q => q.difficulty === 'easy').slice(0, 3),
        ...middleBySkill.listening.filter(q => q.difficulty === 'medium').slice(0, 2)
      ];
    } else if (gradeNumber === 2) {
      // Middle 2: Medium level with some hard (5 questions per skill = 20 total)
      selectedQuestions = [
        ...middleBySkill.reading.filter(q => q.difficulty === 'easy').slice(0, 1),
        ...middleBySkill.reading.filter(q => q.difficulty === 'medium').slice(0, 3),
        ...middleBySkill.reading.filter(q => q.difficulty === 'hard').slice(0, 1),
        ...middleBySkill.grammar.filter(q => q.difficulty === 'easy').slice(0, 1),
        ...middleBySkill.grammar.filter(q => q.difficulty === 'medium').slice(0, 3),
        ...middleBySkill.grammar.filter(q => q.difficulty === 'hard').slice(0, 1),
        ...middleBySkill.vocabulary.filter(q => q.difficulty === 'medium').slice(0, 4),
        ...middleBySkill.vocabulary.filter(q => q.difficulty === 'hard').slice(0, 1),
        ...middleBySkill.listening.filter(q => q.difficulty === 'medium').slice(0, 3),
        ...middleBySkill.listening.filter(q => q.difficulty === 'hard').slice(0, 2)
      ];
    } else {
      // Middle 3: All difficulties, preparing for high school (5 questions per skill = 20 total)
      selectedQuestions = [
        ...middleBySkill.reading.filter(q => q.difficulty === 'medium').slice(0, 2),
        ...middleBySkill.reading.filter(q => q.difficulty === 'hard').slice(0, 3),
        ...middleBySkill.grammar.filter(q => q.difficulty === 'medium').slice(0, 2),
        ...middleBySkill.grammar.filter(q => q.difficulty === 'hard').slice(0, 3),
        ...middleBySkill.vocabulary.filter(q => q.difficulty === 'medium').slice(0, 2),
        ...middleBySkill.vocabulary.filter(q => q.difficulty === 'hard').slice(0, 3),
        ...middleBySkill.listening.filter(q => q.difficulty === 'medium').slice(0, 2),
        ...middleBySkill.listening.filter(q => q.difficulty === 'hard').slice(0, 3)
      ];
    }
  }
  
  // Ensure we have exactly 20 questions by adjusting if needed
  if (selectedQuestions.length < 20) {
    // Fill remaining slots with appropriate level questions
    const remainingCount = 20 - selectedQuestions.length;
    const allAppropriate = gradeLevel === 'elementary' ? elementaryQuestions : middleSchoolQuestions;
    const additional = allAppropriate
      .filter(q => !selectedQuestions.some(sq => sq.id === q.id))
      .slice(0, remainingCount);
    selectedQuestions = [...selectedQuestions, ...additional];
  } else if (selectedQuestions.length > 20) {
    selectedQuestions = selectedQuestions.slice(0, 20);
  }
  
  return selectedQuestions;
};
