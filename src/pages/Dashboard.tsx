
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Class, ClassNote, Quiz, Resource, Student } from '@/types';
import { ChartContainer, ChartTooltipContent, ChartLegendContent, ChartTooltip, ChartLegend } from '@/components/ui/chart';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Calendar as CalendarIcon, Clock, Book, FileText, Video, Users, BarChart2, User, Check, Info, AlertCircle, Calendar, ChevronRight, ArrowRight } from 'lucide-react';

// Enhanced mock data for demo
const mockClasses: Class[] = [
  {
    id: '1',
    title: 'Introduction to Computer Science',
    description: 'Learn the fundamentals of computer science and programming. We\'ll cover basic concepts, programming paradigms, and an overview of different languages.',
    teacherId: '1',
    createdAt: '2023-01-15T10:00:00Z',
    scheduledFor: '2025-05-01T14:00:00Z',
    resources: [
      { id: '101', title: 'CS Fundamentals PDF', type: 'article', url: '#', description: 'Comprehensive overview of CS concepts', conceptIds: ['c1'] },
      { id: '102', title: 'Programming Basics Video', type: 'video', url: '#', description: 'Visual introduction to programming', conceptIds: ['c2'] }
    ]
  },
  {
    id: '2',
    title: 'Advanced Mathematics',
    description: 'Explore complex mathematical concepts and their applications. This session will focus on calculus, linear algebra, and statistics with real-world examples.',
    teacherId: '1',
    createdAt: '2023-02-10T09:30:00Z',
    scheduledFor: '2025-05-02T10:00:00Z',
    resources: [
      { id: '103', title: 'Applied Mathematics Guide', type: 'article', url: '#', description: 'In-depth guide to mathematical applications', conceptIds: ['c3'] }
    ]
  },
  {
    id: '3',
    title: 'Data Structures and Algorithms',
    description: 'Learn efficient data structures and algorithms for solving problems. We\'ll analyze different approaches and their time/space complexity.',
    teacherId: '1',
    createdAt: '2023-03-05T11:15:00Z',
    scheduledFor: '2025-05-03T15:30:00Z',
    completed: true,
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
    resources: [
      { id: '104', title: 'Algorithm Visualization Tool', type: 'example', url: '#', description: 'Interactive algorithm visualizer', conceptIds: ['c4'] },
      { id: '105', title: 'Data Structure Implementation Guide', type: 'article', url: '#', description: 'Step-by-step implementation instructions', conceptIds: ['c4', 'c5'] }
    ]
  },
  {
    id: '4',
    title: 'Web Development Basics',
    description: 'Introduction to HTML, CSS, and JavaScript. Learn how to build responsive web pages from scratch.',
    teacherId: '2',
    createdAt: '2023-03-10T13:00:00Z',
    scheduledFor: '2025-05-05T09:00:00Z',
    resources: [
      { id: '106', title: 'HTML/CSS Cheatsheet', type: 'article', url: '#', description: 'Quick reference for web developers', conceptIds: ['c6'] }
    ]
  },
  {
    id: '5',
    title: 'Database Management',
    description: 'Introduction to database concepts, SQL, and database design principles.',
    teacherId: '1',
    createdAt: '2023-02-15T09:00:00Z',
    scheduledFor: '2025-04-20T14:00:00Z',
    completed: true,
    resources: [
      { id: '107', title: 'SQL Basics Guide', type: 'article', url: '#', description: 'Introduction to SQL queries', conceptIds: ['c7'] },
      { id: '108', title: 'Database Design Patterns', type: 'video', url: '#', description: 'Best practices for database schema design', conceptIds: ['c7'] }
    ]
  },
  {
    id: '6',
    title: 'Object-Oriented Programming',
    description: 'Learn about classes, objects, inheritance, and polymorphism in OOP languages.',
    teacherId: '1',
    createdAt: '2023-02-20T11:30:00Z',
    scheduledFor: '2025-04-15T13:30:00Z',
    completed: true,
    resources: [
      { id: '109', title: 'OOP Concepts Explained', type: 'article', url: '#', description: 'Detailed explanation of OOP principles', conceptIds: ['c8'] }
    ]
  }
];

const mockNotes: ClassNote[] = [
  {
    id: '1',
    classId: '3',
    content: 'Today we covered the fundamentals of algorithmic complexity and Big O notation. We discussed how to analyze algorithms based on their time and space requirements. The class also included practical examples of common sorting algorithms like quicksort and mergesort, with analysis of their best, average, and worst-case scenarios.\n\nKey points:\n- Big O notation provides an upper bound on algorithm complexity\n- Space complexity is as important as time complexity\n- Different algorithms have different trade-offs\n- Choosing the right data structure can dramatically improve performance',
    keyConcepts: [
      {text: 'Big O Notation', timestamp: '00:05:30'},
      {text: 'Space vs Time Complexity', timestamp: '00:15:45'},
      {text: 'Sorting Algorithm Analysis', timestamp: '00:30:20'}
    ],
    unansweredQuestions: [
      {text: 'How do we apply these concepts to real-world problems?', timestamp: '00:45:10'},
      {text: 'When should we prioritize space over time efficiency?', timestamp: '00:52:30'}
    ],
    createdAt: '2023-03-05T17:30:00Z'
  },
  {
    id: '2',
    classId: '5',
    content: 'In today\'s session on Database Management, we explored relational database concepts and SQL fundamentals. We covered database normalization, primary and foreign keys, and basic CRUD operations with SQL statements.\n\nKey points:\n- Database normalization helps eliminate redundancy\n- SQL syntax for SELECT, INSERT, UPDATE, and DELETE operations\n- Importance of indexing for performance optimization\n- Transactions and ACID properties ensure data integrity',
    keyConcepts: [
      {text: 'Database Normalization', timestamp: '00:10:15'},
      {text: 'SQL CRUD Operations', timestamp: '00:25:30'},
      {text: 'Indexing Strategies', timestamp: '00:40:00'}
    ],
    unansweredQuestions: [
      {text: 'How do NoSQL databases compare to SQL databases?', timestamp: '00:50:20'},
      {text: 'What are best practices for database security?', timestamp: '00:55:45'}
    ],
    createdAt: '2023-04-20T16:15:00Z'
  },
  {
    id: '3',
    classId: '6',
    content: 'Today\'s class on Object-Oriented Programming covered the four main principles of OOP: encapsulation, inheritance, polymorphism, and abstraction. We implemented several examples in Java to demonstrate these concepts and discussed design patterns.\n\nKey points:\n- Encapsulation protects data integrity through access control\n- Inheritance enables code reuse and establishes "is-a" relationships\n- Polymorphism allows objects to take multiple forms\n- Abstraction focuses on essential features while hiding implementation details',
    keyConcepts: [
      {text: 'OOP Core Principles', timestamp: '00:05:45'},
      {text: 'Inheritance Hierarchies', timestamp: '00:20:30'},
      {text: 'Method Overriding vs Overloading', timestamp: '00:35:15'}
    ],
    unansweredQuestions: [
      {text: 'How does OOP compare to functional programming?', timestamp: '00:48:30'},
      {text: 'When should we prefer composition over inheritance?', timestamp: '00:53:20'}
    ],
    createdAt: '2023-04-15T15:30:00Z'
  }
];

const mockQuizzes: Quiz[] = [
  {
    id: '1',
    classId: '1',
    title: 'CS Fundamentals Pre-Quiz',
    type: 'pre',
    questions: [
      {
        id: 'q1',
        text: 'What is the primary purpose of an operating system?',
        options: [
          'To provide a user interface',
          'To manage computer hardware and software resources',
          'To run applications',
          'To connect to the internet'
        ],
        correctOption: 1,
        difficulty: 'easy',
        conceptId: 'c1'
      },
      {
        id: 'q2',
        text: 'Which of the following is NOT a programming paradigm?',
        options: [
          'Procedural programming',
          'Object-oriented programming',
          'Functional programming',
          'Database programming'
        ],
        correctOption: 3,
        difficulty: 'medium',
        conceptId: 'c2'
      }
    ]
  },
  {
    id: '2',
    classId: '3',
    title: 'Data Structures Post-Quiz',
    type: 'post',
    questions: [
      {
        id: 'q3',
        text: 'What is the time complexity of searching in a balanced binary search tree?',
        options: [
          'O(1)',
          'O(log n)',
          'O(n)',
          'O(n²)'
        ],
        correctOption: 1,
        difficulty: 'medium',
        conceptId: 'c4'
      },
      {
        id: 'q4',
        text: 'Which data structure follows the LIFO (Last In First Out) principle?',
        options: [
          'Queue',
          'Stack',
          'Linked List',
          'Binary Tree'
        ],
        correctOption: 1,
        difficulty: 'easy',
        conceptId: 'c5'
      }
    ]
  },
  {
    id: '3',
    classId: '5',
    title: 'Database Management Pre-Quiz',
    type: 'pre',
    questions: [
      {
        id: 'q5',
        text: 'Which SQL statement is used to retrieve data from a database?',
        options: [
          'GET',
          'FETCH',
          'SELECT',
          'RETRIEVE'
        ],
        correctOption: 2,
        difficulty: 'easy',
        conceptId: 'c7'
      }
    ]
  },
  {
    id: '4',
    classId: '5',
    title: 'Database Management Post-Quiz',
    type: 'post',
    questions: [
      {
        id: 'q6',
        text: 'What does the acronym ACID stand for in database transactions?',
        options: [
          'Atomicity, Consistency, Isolation, Durability',
          'Access, Control, Integrity, Delivery',
          'Authentication, Confidentiality, Integrity, Durability',
          'Atomicity, Control, Integrity, Delivery'
        ],
        correctOption: 0,
        difficulty: 'medium',
        conceptId: 'c7'
      }
    ]
  }
];

const mockResources: Resource[] = [
  {
    id: '101',
    title: 'CS Fundamentals PDF',
    description: 'Comprehensive overview of CS concepts',
    url: '#',
    type: 'article',
    conceptIds: ['c1'],
    classId: '1'
  },
  {
    id: '102',
    title: 'Programming Basics Video',
    description: 'Visual introduction to programming',
    url: '#',
    type: 'video',
    conceptIds: ['c2'],
    classId: '1'
  },
  {
    id: '103', 
    title: 'Applied Mathematics Guide',
    description: 'In-depth guide to mathematical applications',
    url: '#',
    type: 'article',
    conceptIds: ['c3'],
    classId: '2'
  },
  {
    id: '104',
    title: 'Algorithm Visualization Tool',
    description: 'Interactive visualization of sorting algorithms',
    url: '#',
    type: 'example',
    conceptIds: ['c4'],
    classId: '3',
    aiRecommended: true
  },
  {
    id: '105',
    title: 'Data Structure Implementation Guide',
    description: 'Step-by-step implementation guide for common data structures',
    url: '#',
    type: 'article',
    conceptIds: ['c4', 'c5'],
    classId: '3'
  },
  {
    id: '106',
    title: 'HTML/CSS Cheatsheet',
    description: 'Quick reference for web developers',
    url: '#',
    type: 'article',
    conceptIds: ['c6'],
    classId: '4'
  },
  {
    id: '107',
    title: 'SQL Basics Guide',
    description: 'Introduction to SQL queries',
    url: '#',
    type: 'article',
    conceptIds: ['c7'],
    classId: '5'
  },
  {
    id: '108',
    title: 'Database Design Patterns',
    description: 'Best practices for database schema design',
    url: '#',
    type: 'video',
    conceptIds: ['c7'],
    classId: '5'
  },
  {
    id: '109',
    title: 'OOP Concepts Explained',
    description: 'Detailed explanation of OOP principles',
    url: '#',
    type: 'article',
    conceptIds: ['c8'],
    classId: '6'
  },
  {
    id: '110',
    title: 'Big O Notation Explained',
    description: 'In-depth explanation of algorithmic complexity',
    url: '#',
    type: 'video',
    conceptIds: ['c4'],
    classId: '3',
    aiRecommended: true
  },
  {
    id: '111',
    title: 'Advanced Sorting Algorithms',
    description: 'Deep dive into efficient sorting techniques',
    url: '#',
    type: 'article',
    conceptIds: ['c4'],
    classId: '3',
    aiRecommended: true
  },
  {
    id: '112',
    title: 'Database Normalization Tutorial',
    description: 'Guide to normalizing database schemas',
    url: '#',
    type: 'article',
    conceptIds: ['c7'],
    classId: '5',
    aiRecommended: true
  }
];

// Mock student data with performance details
const mockStudents: Student[] = [
  { 
    id: 'std1', 
    name: 'John D.', 
    overallScore: 85, 
    participation: 92, 
    status: 'excellent', 
    improvementAreas: ['Data Structures'], 
    strengthAreas: ['Algorithms', 'Programming Basics'],
    sessionPerformance: [
      { classId: '3', preQuizScore: 70, postQuizScore: 90, participation: 95 },
      { classId: '5', preQuizScore: 65, postQuizScore: 85, participation: 90 },
      { classId: '6', preQuizScore: 80, postQuizScore: 95, participation: 92 }
    ]
  },
  { 
    id: 'std2', 
    name: 'Sarah M.', 
    overallScore: 72, 
    participation: 65, 
    status: 'good', 
    improvementAreas: ['Algorithms', 'Mathematics'], 
    strengthAreas: ['Programming Basics'],
    sessionPerformance: [
      { classId: '3', preQuizScore: 60, postQuizScore: 75, participation: 70 },
      { classId: '5', preQuizScore: 55, postQuizScore: 70, participation: 65 },
      { classId: '6', preQuizScore: 65, postQuizScore: 80, participation: 60 }
    ]
  },
  { 
    id: 'std3', 
    name: 'Michael T.', 
    overallScore: 45, 
    participation: 30, 
    status: 'struggling', 
    improvementAreas: ['Programming Basics', 'Data Structures', 'Algorithms'], 
    strengthAreas: [],
    sessionPerformance: [
      { classId: '3', preQuizScore: 40, postQuizScore: 55, participation: 35 },
      { classId: '5', preQuizScore: 35, postQuizScore: 50, participation: 30 },
      { classId: '6', preQuizScore: 45, postQuizScore: 60, participation: 25 }
    ]
  },
  { 
    id: 'std4', 
    name: 'Emma R.', 
    overallScore: 93, 
    participation: 85, 
    status: 'excellent', 
    improvementAreas: [], 
    strengthAreas: ['Mathematics', 'Algorithms', 'Data Structures'],
    sessionPerformance: [
      { classId: '3', preQuizScore: 85, postQuizScore: 95, participation: 90 },
      { classId: '5', preQuizScore: 90, postQuizScore: 100, participation: 85 },
      { classId: '6', preQuizScore: 95, postQuizScore: 100, participation: 80 }
    ]
  },
  { 
    id: 'std5', 
    name: 'James L.', 
    overallScore: 60, 
    participation: 45, 
    status: 'needs improvement', 
    improvementAreas: ['Mathematics', 'Algorithms'], 
    strengthAreas: ['Programming Basics'],
    sessionPerformance: [
      { classId: '3', preQuizScore: 55, postQuizScore: 65, participation: 50 },
      { classId: '5', preQuizScore: 50, postQuizScore: 60, participation: 45 },
      { classId: '6', preQuizScore: 60, postQuizScore: 70, participation: 40 }
    ]
  }
];

// Mock concept mastery data
const conceptMasteryData = [
  { name: 'Programming Basics', mastery: 75 },
  { name: 'Data Structures', mastery: 60 },
  { name: 'Algorithms', mastery: 85 },
  { name: 'Mathematics', mastery: 45 },
  { name: 'Database Design', mastery: 65 },
  { name: 'OOP Concepts', mastery: 80 }
];

// Mock quiz improvement data
const quizScoreData = [
  { name: 'CS Fundamentals', pre: 65, post: 85 },
  { name: 'Data Structures', pre: 55, post: 75 },
  { name: 'Database Management', pre: 70, post: 90 },
  { name: 'OOP Concepts', pre: 60, post: 80 }
];

// Color configuration for charts
const chartConfig = {
  pre: { color: '#7E69AB' },
  post: { color: '#1EAEDB' },
  mastery: { color: '#9b87f5' },
};

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch(status.toLowerCase()) {
    case 'excellent': return 'bg-green-500';
    case 'good': return 'bg-blue-500';
    case 'needs improvement': return 'bg-yellow-500';
    case 'struggling': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Helper to filter resources by class
const getResourcesByClass = (classId: string, aiRecommended = false) => {
  return mockResources.filter(r => r.classId === classId && (!aiRecommended || r.aiRecommended));
};

// Helper to find class by ID
const getClassById = (classId: string) => {
  return mockClasses.find(cls => cls.id === classId);
};

// Helper to find notes by class ID
const getNotesByClass = (classId: string) => {
  return mockNotes.find(note => note.classId === classId);
};

// Helper to find quizzes by class ID and type
const getQuizzesByClassAndType = (classId: string, type: 'pre' | 'post') => {
  return mockQuizzes.find(quiz => quiz.classId === classId && quiz.type === type);
};

// Helper to organize classes by completion status
const organizeClasses = () => {
  return {
    upcoming: mockClasses.filter(c => !c.completed).sort((a, b) => 
      new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime()
    ),
    past: mockClasses.filter(c => c.completed).sort((a, b) => 
      new Date(b.scheduledFor).getTime() - new Date(a.scheduledFor).getTime()
    )
  };
};

// Helper to get student performance for a specific class
const getStudentPerformanceByClass = (classId: string) => {
  return mockStudents.map(student => {
    const sessionPerformance = student.sessionPerformance.find(s => s.classId === classId);
    return {
      id: student.id,
      name: student.name,
      preQuizScore: sessionPerformance?.preQuizScore || 0,
      postQuizScore: sessionPerformance?.postQuizScore || 0,
      participation: sessionPerformance?.participation || 0,
      improvement: sessionPerformance ? (sessionPerformance.postQuizScore - sessionPerformance.preQuizScore) : 0,
      status: student.status
    };
  });
};

const Dashboard = () => {
  const { user } = useAuth();
  const [upcomingClasses, setUpcomingClasses] = useState<Class[]>([]);
  const [pastClasses, setPastClasses] = useState<Class[]>([]);
  const [allClasses, setAllClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [newClass, setNewClass] = useState({
    title: '',
    description: '',
    scheduledFor: '',
    meetingUrl: '',
    resources: [{ title: '', url: '', type: 'article', description: '' }]
  });
  const [resourcesMode, setResourcesMode] = useState<'all' | 'byClass'>('byClass');
  const [resourcesFilter, setResourcesFilter] = useState<string>('');
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [showQuizContent, setShowQuizContent] = useState<boolean>(false);

  useEffect(() => {
    // Organize classes by upcoming/past
    const organized = organizeClasses();
    
    setUpcomingClasses(organized.upcoming.slice(0, 3));
    setPastClasses(organized.past);
    setAllClasses(mockClasses);
  }, [user]);

  // Function to add a resource field in the new class form
  const addResourceField = () => {
    setNewClass(prev => ({
      ...prev,
      resources: [...prev.resources, { title: '', url: '', type: 'article', description: '' }]
    }));
  };

  // Function to update a resource field in the new class form
  const updateResourceField = (index: number, field: string, value: string) => {
    setNewClass(prev => {
      const updatedResources = [...prev.resources];
      updatedResources[index] = { ...updatedResources[index], [field]: value } as any;
      return { ...prev, resources: updatedResources };
    });
  };

  // Function to remove a resource field in the new class form
  const removeResourceField = (index: number) => {
    setNewClass(prev => {
      const updatedResources = prev.resources.filter((_, i) => i !== index);
      return { ...prev, resources: updatedResources };
    });
  };

  // Component to view class details
  const ClassDetailsDrawer = ({ classItem, onClose }: { classItem: Class, onClose: () => void }) => (
    <DrawerContent className="max-w-4xl mx-auto">
      <DrawerHeader>
        <DrawerTitle>{classItem.title}</DrawerTitle>
        <DrawerDescription>
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Calendar className="h-4 w-4" /> 
            {formatDate(classItem.scheduledFor)}
          </div>
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pt-0">
        <h4 className="font-medium mb-2">Session Description</h4>
        <p className="text-muted-foreground mb-6">{classItem.description}</p>
        
        <h4 className="font-medium mb-2">Resources</h4>
        {classItem.resources && classItem.resources.length > 0 ? (
          <div className="space-y-3">
            {classItem.resources.map(resource => (
              <div key={resource.id} className="flex items-start gap-3 p-3 border rounded-lg">
                {resource.type === 'video' ? (
                  <Video className="h-5 w-5 text-blue-500 mt-0.5" />
                ) : resource.type === 'article' ? (
                  <FileText className="h-5 w-5 text-purple-500 mt-0.5" />
                ) : (
                  <Book className="h-5 w-5 text-green-500 mt-0.5" />
                )}
                <div>
                  <p className="font-medium">{resource.title}</p>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  View Resource
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No resources available for this class.</p>
        )}
        
        {user?.role === 'student' && (
          <div className="mt-6">
            <h4 className="font-medium mb-2">Pre-Class Quiz</h4>
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="w-full mt-2">Take Pre-Class Quiz</Button>
              </DrawerTrigger>
              <DrawerContent className="max-w-4xl mx-auto">
                <DrawerHeader>
                  <DrawerTitle>Pre-Class Quiz: {classItem.title}</DrawerTitle>
                  <DrawerDescription>Test your knowledge before the class begins</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pt-0">
                  {showQuizContent ? (
                    <div className="space-y-6">
                      {getQuizzesByClassAndType(classItem.id, 'pre')?.questions.map((question, index) => (
                        <div key={question.id} className="border rounded-lg p-4">
                          <h3 className="font-medium mb-2">
                            Question {index + 1}: {question.text}
                          </h3>
                          <div className="space-y-2 mt-3">
                            {question.options.map((option, optIndex) => (
                              <div key={optIndex} className="flex items-center space-x-2">
                                <input 
                                  type="radio" 
                                  name={`question-${question.id}`} 
                                  id={`q${question.id}-opt${optIndex}`} 
                                  className="h-4 w-4 text-adaptiq-600"
                                />
                                <label htmlFor={`q${question.id}-opt${optIndex}`} className="text-sm">
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <Button className="w-full">Submit Quiz</Button>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mb-4">
                        <Info className="h-12 w-12 mx-auto text-adaptiq-500" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Quiz Information</h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        This quiz contains {getQuizzesByClassAndType(classItem.id, 'pre')?.questions.length || 0} questions and will help you 
                        prepare for the upcoming class session.
                      </p>
                      <Button onClick={() => setShowQuizContent(true)}>
                        Start Quiz
                      </Button>
                    </div>
                  )}
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline" onClick={() => setShowQuizContent(false)}>Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        )}

        {classItem.meetingUrl && (
          <div className="mt-6">
            <h4 className="font-medium mb-2">Join Meeting</h4>
            <Button className="w-full" asChild>
              <a href={classItem.meetingUrl} target="_blank" rel="noreferrer">
                Join Live Class
              </a>
            </Button>
          </div>
        )}

        {user?.role === 'teacher' && classItem.completed && (
          <div className="mt-6">
            <h4 className="font-medium mb-2">Class Analytics</h4>
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="w-full">View Session Analytics</Button>
              </DrawerTrigger>
              <ClassAnalyticsDrawer classItem={classItem} onClose={() => {}} />
            </Drawer>
          </div>
        )}
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );

  // Component to view class analytics
  const ClassAnalyticsDrawer = ({ classItem, onClose }: { classItem: Class, onClose: () => void }) => {
    const studentPerformance = getStudentPerformanceByClass(classItem.id);
    
    return (
      <DrawerContent className="max-w-6xl mx-auto">
        <DrawerHeader>
          <DrawerTitle>Class Analytics: {classItem.title}</DrawerTitle>
          <DrawerDescription>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" /> 
              {formatDate(classItem.scheduledFor)}
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Average Pre-Quiz Score</p>
                  <div className="text-2xl font-bold">{Math.round(studentPerformance.reduce((acc, s) => acc + s.preQuizScore, 0) / studentPerformance.length)}%</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Average Post-Quiz Score</p>
                  <div className="text-2xl font-bold">{Math.round(studentPerformance.reduce((acc, s) => acc + s.postQuizScore, 0) / studentPerformance.length)}%</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Average Improvement</p>
                  <div className="text-2xl font-bold text-green-600">+{Math.round(studentPerformance.reduce((acc, s) => acc + s.improvement, 0) / studentPerformance.length)}%</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <h3 className="text-lg font-medium mb-4">Student Performance</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Pre-Quiz</TableHead>
                <TableHead>Post-Quiz</TableHead>
                <TableHead>Improvement</TableHead>
                <TableHead>Participation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentPerformance.map(student => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.preQuizScore}%</TableCell>
                  <TableCell>{student.postQuizScore}%</TableCell>
                  <TableCell className="text-green-600">+{student.improvement}%</TableCell>
                  <TableCell>{student.participation}%</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(student.status)} text-white`}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => setSelectedStudentId(student.id)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Session Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Concept Mastery Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer config={chartConfig} className="h-full w-full">
                    <BarChart data={conceptMasteryData.slice(0, 3)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} verticalAlign="bottom" />
                      <Bar dataKey="mastery" name="Mastery Level" fill="#9b87f5" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pre/Post Quiz Comparison</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer config={chartConfig} className="h-full w-full">
                    <LineChart data={[
                      {name: classItem.title, pre: Math.round(studentPerformance.reduce((acc, s) => acc + s.preQuizScore, 0) / studentPerformance.length), 
                      post: Math.round(studentPerformance.reduce((acc, s) => acc + s.postQuizScore, 0) / studentPerformance.length)}
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} verticalAlign="bottom" />
                      <Line type="monotone" dataKey="pre" name="Pre-Quiz" stroke="#7E69AB" />
                      <Line type="monotone" dataKey="post" name="Post-Quiz" stroke="#1EAEDB" />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    );
  };

  // Component to view student analytics
  const StudentAnalyticsDrawer = ({ studentId, onClose }: { studentId: string, onClose: () => void }) => {
    const student = mockStudents.find(s => s.id === studentId);
    
    if (!student) return null;
    
    return (
      <DrawerContent className="max-w-6xl mx-auto">
        <DrawerHeader>
          <DrawerTitle>Student Analytics: {student.name}</DrawerTitle>
          <DrawerDescription>
            Overall performance and session-by-session breakdown
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Overall Score</p>
                  <div className="text-2xl font-bold">{student.overallScore}%</div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-adaptiq-500 rounded-full" style={{ width: `${student.overallScore}%` }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Participation Rate</p>
                  <div className="text-2xl font-bold">{student.participation}%</div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-adaptiq-500 rounded-full" style={{ width: `${student.participation}%` }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <div className="text-2xl font-bold capitalize">
                    <span className={`inline-block px-3 py-1 rounded-full text-white ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-lg font-medium mb-4">Session Performance</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Session</TableHead>
                <TableHead>Pre-Quiz</TableHead>
                <TableHead>Post-Quiz</TableHead>
                <TableHead>Improvement</TableHead>
                <TableHead>Participation</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {student.sessionPerformance.map(session => {
                const classItem = getClassById(session.classId);
                return (
                  <TableRow key={session.classId}>
                    <TableCell className="font-medium">{classItem?.title}</TableCell>
                    <TableCell>{session.preQuizScore}%</TableCell>
                    <TableCell>{session.postQuizScore}%</TableCell>
                    <TableCell className="text-green-600">+{session.postQuizScore - session.preQuizScore}%</TableCell>
                    <TableCell>{session.participation}%</TableCell>
                    <TableCell>
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button variant="outline" size="sm">View Session</Button>
                        </DrawerTrigger>
                        {classItem && <ClassDetailsDrawer classItem={classItem} onClose={() => {}} />}
                      </Drawer>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <div className="mt-8">
            <Tabs defaultValue="strengths">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="strengths">Strength Areas</TabsTrigger>
                <TabsTrigger value="improvements">Areas for Improvement</TabsTrigger>
              </TabsList>
              <TabsContent value="strengths">
                <Card>
                  <CardHeader>
                    <CardTitle>Strength Areas</CardTitle>
                    <CardDescription>Topics where {student.name} excels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {student.strengthAreas.length > 0 ? (
                      <div className="space-y-4">
                        {student.strengthAreas.map((area, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <Check className="h-5 w-5 text-green-500" />
                              <h4 className="font-medium">{area}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              Consistently performs well in quizzes and assignments related to {area.toLowerCase()}.
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-6 text-muted-foreground">
                        No particular strength areas identified yet.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="improvements">
                <Card>
                  <CardHeader>
                    <CardTitle>Areas for Improvement</CardTitle>
                    <CardDescription>Topics where {student.name} could benefit from additional focus</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {student.improvementAreas.length > 0 ? (
                      <div className="space-y-4">
                        {student.improvementAreas.map((area, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="h-5 w-5 text-yellow-500" />
                              <h4 className="font-medium">{area}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              Performance in this area could be improved with additional resources and practice.
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-6 text-muted-foreground">
                        No particular areas for improvement identified.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    );
  };

  // Component to view class notes
  const ClassNotesDrawer = ({ classItem, onClose }: { classItem: Class, onClose: () => void }) => {
    const note = getNotesByClass(classItem.id);
    
    return (
      <DrawerContent className="max-w-4xl mx-auto">
        <DrawerHeader>
          <DrawerTitle>Class Notes: {classItem.title}</DrawerTitle>
          <DrawerDescription>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" /> 
              {formatDate(classItem.scheduledFor)}
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pt-0">
          {note ? (
            <>
              <div className="mb-6">
                <h4 className="font-medium mb-2">Session Summary</h4>
                <p className="text-muted-foreground whitespace-pre-line">{note.content}</p>
              </div>
              
              {note.keyConcepts && note.keyConcepts.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Key Concepts</h4>
                  <div className="space-y-2">
                    {note.keyConcepts.map((concept, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-purple-50">
                          {concept.timestamp}
                        </Badge>
                        <span>{concept.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {note.unansweredQuestions && note.unansweredQuestions.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Questions to Explore</h4>
                  <div className="space-y-2">
                    {note.unansweredQuestions.map((question, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50">
                          {question.timestamp}
                        </Badge>
                        <span>{question.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-6">
                <h4 className="font-medium mb-4">Resources for This Session</h4>
                <Tabs defaultValue="professor">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="professor">Professor Resources</TabsTrigger>
                    <TabsTrigger value="ai">AI Recommended Resources</TabsTrigger>
                  </TabsList>
                  <TabsContent value="professor">
                    <div className="space-y-3">
                      {getResourcesByClass(classItem.id, false)
                        .filter(r => !r.aiRecommended)
                        .map(resource => (
                          <div key={resource.id} className="flex items-start gap-3 p-3 border rounded-lg">
                            {resource.type === 'video' ? (
                              <Video className="h-5 w-5 text-blue-500 mt-0.5" />
                            ) : resource.type === 'article' ? (
                              <FileText className="h-5 w-5 text-purple-500 mt-0.5" />
                            ) : (
                              <Book className="h-5 w-5 text-green-500 mt-0.5" />
                            )}
                            <div>
                              <p className="font-medium">{resource.title}</p>
                              <p className="text-sm text-muted-foreground">{resource.description}</p>
                            </div>
                            <Button variant="outline" size="sm" className="ml-auto">
                              View Resource
                            </Button>
                          </div>
                        ))}
                      {getResourcesByClass(classItem.id, false).filter(r => !r.aiRecommended).length === 0 && (
                        <p className="text-center py-4 text-muted-foreground">No professor resources for this session.</p>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="ai">
                    <div className="space-y-3">
                      {getResourcesByClass(classItem.id, true).map(resource => (
                        <div key={resource.id} className="flex items-start gap-3 p-3 border rounded-lg">
                          {resource.type === 'video' ? (
                            <Video className="h-5 w-5 text-blue-500 mt-0.5" />
                          ) : resource.type === 'article' ? (
                            <FileText className="h-5 w-5 text-purple-500 mt-0.5" />
                          ) : (
                            <Book className="h-5 w-5 text-green-500 mt-0.5" />
                          )}
                          <div>
                            <p className="font-medium">{resource.title}</p>
                            <p className="text-sm text-muted-foreground">{resource.description}</p>
                          </div>
                          <Button variant="outline" size="sm" className="ml-auto">
                            View Resource
                          </Button>
                        </div>
                      ))}
                      {getResourcesByClass(classItem.id, true).length === 0 && (
                        <p className="text-center py-4 text-muted-foreground">No AI recommended resources for this session.</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Post-Class Quiz</h4>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button className="w-full">Take Post-Class Quiz</Button>
                  </DrawerTrigger>
                  <DrawerContent className="max-w-4xl mx-auto">
                    <DrawerHeader>
                      <DrawerTitle>Post-Class Quiz: {classItem.title}</DrawerTitle>
                      <DrawerDescription>Test your understanding of the class material</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pt-0">
                      {showQuizContent ? (
                        <div className="space-y-6">
                          {getQuizzesByClassAndType(classItem.id, 'post')?.questions.map((question, index) => (
                            <div key={question.id} className="border rounded-lg p-4">
                              <h3 className="font-medium mb-2">
                                Question {index + 1}: {question.text}
                              </h3>
                              <div className="space-y-2 mt-3">
                                {question.options.map((option, optIndex) => (
                                  <div key={optIndex} className="flex items-center space-x-2">
                                    <input 
                                      type="radio" 
                                      name={`question-${question.id}`} 
                                      id={`q${question.id}-opt${optIndex}`} 
                                      className="h-4 w-4 text-adaptiq-600"
                                    />
                                    <label htmlFor={`q${question.id}-opt${optIndex}`} className="text-sm">
                                      {option}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                          <Button className="w-full">Submit Quiz</Button>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="mb-4">
                            <Info className="h-12 w-12 mx-auto text-adaptiq-500" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">Quiz Information</h3>
                          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            This quiz contains {getQuizzesByClassAndType(classItem.id, 'post')?.questions.length || 0} questions to test your 
                            understanding of the material covered in this class session.
                          </p>
                          <Button onClick={() => setShowQuizContent(true)}>
                            Start Quiz
                          </Button>
                        </div>
                      )}
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="outline" onClick={() => setShowQuizContent(false)}>Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No notes available for this class session.</p>
            </div>
          )}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    );
  };

  // Component to create a new class
  const CreateClassDrawer = ({ onClose }: { onClose: () => void }) => (
    <DrawerContent className="max-w-4xl mx-auto">
      <DrawerHeader>
        <DrawerTitle>Create New Class</DrawerTitle>
        <DrawerDescription>Schedule a new class and add details</DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pt-0">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Class Title</label>
            <input 
              type="text" 
              placeholder="e.g., Introduction to Data Structures"
              className="w-full p-2 border rounded-md"
              value={newClass.title}
              onChange={e => setNewClass({...newClass, title: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Date and Time</label>
            <input 
              type="datetime-local" 
              className="w-full p-2 border rounded-md"
              value={newClass.scheduledFor}
              onChange={e => setNewClass({...newClass, scheduledFor: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Session Description</label>
            <textarea 
              rows={4}
              placeholder="Describe what will be covered in this class..."
              className="w-full p-2 border rounded-md"
              value={newClass.description}
              onChange={e => setNewClass({...newClass, description: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Meeting URL (optional)</label>
            <input 
              type="text" 
              placeholder="e.g., https://meet.google.com/..."
              className="w-full p-2 border rounded-md"
              value={newClass.meetingUrl}
              onChange={e => setNewClass({...newClass, meetingUrl: e.target.value})}
            />
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Resources</h4>
            <Button variant="outline" size="sm" onClick={addResourceField}>
              + Add Resource
            </Button>
          </div>
          <div className="space-y-4">
            {newClass.resources.map((resource, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium">Resource {index + 1}</h5>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeResourceField(index)}
                    disabled={newClass.resources.length <= 1}
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid gap-2">
                  <input 
                    type="text" 
                    placeholder="Resource Title"
                    className="w-full p-2 border rounded-md"
                    value={resource.title}
                    onChange={e => updateResourceField(index, 'title', e.target.value)}
                  />
                  <input 
                    type="text" 
                    placeholder="URL"
                    className="w-full p-2 border rounded-md"
                    value={resource.url}
                    onChange={e => updateResourceField(index, 'url', e.target.value)}
                  />
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={resource.type}
                    onChange={e => updateResourceField(index, 'type', e.target.value)}
                  >
                    <option value="article">Article</option>
                    <option value="video">Video</option>
                    <option value="example">Example/Exercise</option>
                  </select>
                  <textarea
                    placeholder="Description"
                    className="w-full p-2 border rounded-md"
                    value={resource.description}
                    onChange={e => updateResourceField(index, 'description', e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DrawerFooter>
        <Button>Create Class</Button>
        <DrawerClose asChild>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );

  // Component to manage resources
  const ManageResourcesDrawer = ({ onClose }: { onClose: () => void }) => (
    <DrawerContent className="max-w-4xl mx-auto">
      <DrawerHeader>
        <DrawerTitle>Manage Resources</DrawerTitle>
        <DrawerDescription>Add and manage learning resources for your classes</DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pt-0">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="Search resources..."
              className="w-full p-2 border rounded-md"
              value={resourcesFilter}
              onChange={e => setResourcesFilter(e.target.value)}
            />
          </div>
          <div>
            <select 
              className="p-2 border rounded-md"
              value={resourcesMode}
              onChange={e => setResourcesMode(e.target.value as 'all' | 'byClass')}
            >
              <option value="byClass">Group by Class</option>
              <option value="all">Show All</option>
            </select>
          </div>
        </div>
        
        {resourcesMode === 'byClass' ? (
          <div className="space-y-6">
            {mockClasses.map(cls => {
              const classResources = mockResources.filter(r => 
                r.classId === cls.id && 
                (resourcesFilter === '' || 
                r.title.toLowerCase().includes(resourcesFilter.toLowerCase()) || 
                r.description.toLowerCase().includes(resourcesFilter.toLowerCase()))
              );
              
              if (classResources.length === 0) return null;
              
              return (
                <div key={cls.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-3 border-b">
                    <h3 className="font-medium">{cls.title}</h3>
                    <p className="text-xs text-muted-foreground">{formatDate(cls.scheduledFor)}</p>
                  </div>
                  <div className="p-3">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {classResources.map(resource => (
                          <TableRow key={resource.id}>
                            <TableCell className="font-medium">{resource.title}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="outline" size="sm">Delete</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      + Add Resource to this Class
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Associated Class</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockResources
                .filter(resource => 
                  resourcesFilter === '' || 
                  resource.title.toLowerCase().includes(resourcesFilter.toLowerCase()) || 
                  resource.description.toLowerCase().includes(resourcesFilter.toLowerCase())
                )
                .map(resource => {
                  const associatedClass = mockClasses.find(c => c.id === resource.classId);
                  return (
                    <TableRow key={resource.id}>
                      <TableCell className="font-medium">{resource.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {associatedClass ? associatedClass.title : 'None'}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
        
        <Button className="mt-4">+ Add New Resource</Button>
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );

  // Component to view all classes with Calendar
  const AllClassesDrawer = ({ classes, onClose, onViewClass }: { classes: Class[], onClose: () => void, onViewClass: (cls: Class) => void }) => {
    // Helper to get classes for the current calendar date
    const getClassesForDate = (date: Date): Class[] => {
      return classes.filter(cls => {
        const classDate = new Date(cls.scheduledFor);
        return classDate.getDate() === date.getDate() && 
               classDate.getMonth() === date.getMonth() && 
               classDate.getFullYear() === date.getFullYear();
      });
    };
    
    const classesForSelectedDate = getClassesForDate(calendarDate);
    
    return (
      <DrawerContent className="max-w-6xl mx-auto">
        <DrawerHeader>
          <DrawerTitle>All Classes</DrawerTitle>
          <DrawerDescription>
            {user?.role === 'teacher' ? 'View all your scheduled classes' : 'View all your upcoming classes'}
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Calendar component would go here - simplified for demo */}
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="mb-4">
                      <div className="text-lg font-medium">
                        {calendarDate.toLocaleString('default', { month: 'long' })} {calendarDate.getFullYear()}
                      </div>
                      <div className="grid grid-cols-7 gap-1 mt-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                          <div key={i} className="text-xs font-medium text-gray-500">
                            {day}
                          </div>
                        ))}
                        {Array.from({ length: 35 }).map((_, i) => {
                          const d = new Date(calendarDate);
                          d.setDate(i - 5 + 1); // -5 to adjust starting day
                          
                          const isCurrentMonth = d.getMonth() === calendarDate.getMonth();
                          const isToday = d.toDateString() === new Date().toDateString();
                          const hasClass = classes.some(cls => {
                            const classDate = new Date(cls.scheduledFor);
                            return classDate.getDate() === d.getDate() && 
                                   classDate.getMonth() === d.getMonth() && 
                                   classDate.getFullYear() === d.getFullYear();
                          });
                          
                          return (
                            <button
                              key={i}
                              className={`
                                p-2 rounded-full text-sm
                                ${!isCurrentMonth ? 'text-gray-300' : ''}
                                ${isToday ? 'bg-adaptiq-600 text-white' : ''}
                                ${hasClass && !isToday ? 'bg-adaptiq-100 text-adaptiq-800' : ''}
                                ${calendarDate.getDate() === d.getDate() && 
                                  calendarDate.getMonth() === d.getMonth() && 
                                  calendarDate.getFullYear() === d.getFullYear() && !isToday ? 
                                  'border-2 border-adaptiq-500' : ''}
                              `}
                              onClick={() => isCurrentMonth && setCalendarDate(new Date(d))}
                            >
                              {d.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mt-4 text-left">
                      <div className="font-medium">
                        {calendarDate.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {classesForSelectedDate.length} {classesForSelectedDate.length === 1 ? 'class' : 'classes'} scheduled
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {user?.role === 'teacher' && (
                <div className="mt-4">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button className="w-full">+ Create New Class</Button>
                    </DrawerTrigger>
                    <CreateClassDrawer onClose={() => {}} />
                  </Drawer>
                </div>
              )}
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Classes for {calendarDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}</CardTitle>
                </CardHeader>
                <CardContent>
                  {classesForSelectedDate.length > 0 ? (
                    <div className="space-y-4">
                      {classesForSelectedDate.map(classItem => (
                        <div key={classItem.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-medium">{classItem.title}</h3>
                              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                <Clock className="h-4 w-4" /> 
                                {new Date(classItem.scheduledFor).toLocaleTimeString('en-US', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </div>
                              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                {classItem.description}
                              </p>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => onViewClass(classItem)}>
                              View Details
                            </Button>
                          </div>
                          
                          {user?.role === 'student' && (
                            <div className="mt-4 flex gap-2">
                              <Drawer>
                                <DrawerTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    Take Pre-Quiz
                                  </Button>
                                </DrawerTrigger>
                                <DrawerContent className="max-w-4xl mx-auto">
                                  <DrawerHeader>
                                    <DrawerTitle>Pre-Class Quiz: {classItem.title}</DrawerTitle>
                                  </DrawerHeader>
                                  <div className="p-4">
                                    {showQuizContent ? (
                                      <div className="space-y-6">
                                        {getQuizzesByClassAndType(classItem.id, 'pre')?.questions.map((question, index) => (
                                          <div key={question.id} className="border rounded-lg p-4">
                                            <h3 className="font-medium mb-2">
                                              Question {index + 1}: {question.text}
                                            </h3>
                                            <div className="space-y-2 mt-3">
                                              {question.options.map((option, optIndex) => (
                                                <div key={optIndex} className="flex items-center space-x-2">
                                                  <input 
                                                    type="radio" 
                                                    name={`question-${question.id}`} 
                                                    id={`q${question.id}-opt${optIndex}`} 
                                                    className="h-4 w-4 text-adaptiq-600"
                                                  />
                                                  <label htmlFor={`q${question.id}-opt${optIndex}`} className="text-sm">
                                                    {option}
                                                  </label>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        ))}
                                        <Button className="w-full">Submit Quiz</Button>
                                      </div>
                                    ) : (
                                      <div className="text-center py-12">
                                        <div className="mb-4">
                                          <Info className="h-12 w-12 mx-auto text-adaptiq-500" />
                                        </div>
                                        <h3 className="text-lg font-medium mb-2">Quiz Information</h3>
                                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                          This quiz contains {getQuizzesByClassAndType(classItem.id, 'pre')?.questions.length || 0} questions to help you 
                                          prepare for the upcoming class session.
                                        </p>
                                        <Button onClick={() => setShowQuizContent(true)}>
                                          Start Quiz
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                  <DrawerFooter>
                                    <DrawerClose asChild>
                                      <Button variant="outline" onClick={() => setShowQuizContent(false)}>Cancel</Button>
                                    </DrawerClose>
                                  </DrawerFooter>
                                </DrawerContent>
                              </Drawer>
                              
                              {classItem.meetingUrl && (
                                <Button size="sm" asChild>
                                  <a href={classItem.meetingUrl} target="_blank" rel="noreferrer">
                                    Join Live Class
                                  </a>
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No classes scheduled for this date.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    );
  };

  // Component to view past classes
  const PastClassesDrawer = ({ classes, onClose, onViewClass }: { classes: Class[], onClose: () => void, onViewClass: (cls: Class) => void }) => (
    <DrawerContent className="max-w-4xl mx-auto">
      <DrawerHeader>
        <DrawerTitle>Past Classes</DrawerTitle>
        <DrawerDescription>
          View your completed class sessions and analytics
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pt-0">
        <div className="space-y-4">
          {classes.map(classItem => (
            <div key={classItem.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium">{classItem.title}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4" /> 
                    {formatDate(classItem.scheduledFor)}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {classItem.description}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" onClick={() => onViewClass(classItem)}>
                    View Details
                  </Button>
                  {user?.role === 'teacher' && (
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button size="sm">View Analytics</Button>
                      </DrawerTrigger>
                      <ClassAnalyticsDrawer classItem={classItem} onClose={() => {}} />
                    </Drawer>
                  )}
                  {user?.role === 'student' && (
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button size="sm">View Notes</Button>
                      </DrawerTrigger>
                      <ClassNotesDrawer classItem={classItem} onClose={() => {}} />
                    </Drawer>
                  )}
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center p-2 border rounded-md bg-gray-50">
                  <p className="text-xs text-muted-foreground">Resources</p>
                  <p className="font-medium">{classItem.resources?.length || 0}</p>
                </div>
                {user?.role === 'student' && (
                  <>
                    <div className="text-center p-2 border rounded-md bg-gray-50">
                      <p className="text-xs text-muted-foreground">Pre-Quiz Score</p>
                      <p className="font-medium">75%</p>
                    </div>
                    <div className="text-center p-2 border rounded-md bg-gray-50">
                      <p className="text-xs text-muted-foreground">Post-Quiz Score</p>
                      <p className="font-medium">90%</p>
                    </div>
                  </>
                )}
                {user?.role === 'teacher' && (
                  <>
                    <div className="text-center p-2 border rounded-md bg-gray-50">
                      <p className="text-xs text-muted-foreground">Avg. Pre-Quiz</p>
                      <p className="font-medium">68%</p>
                    </div>
                    <div className="text-center p-2 border rounded-md bg-gray-50">
                      <p className="text-xs text-muted-foreground">Avg. Post-Quiz</p>
                      <p className="font-medium">85%</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );

  // Component to view detailed analytics
  const DetailedAnalyticsDrawer = ({ onClose }: { onClose: () => void }) => (
    <DrawerContent className="max-w-6xl mx-auto">
      <DrawerHeader>
        <DrawerTitle>Detailed Analytics</DrawerTitle>
        <DrawerDescription>
          {user?.role === 'teacher' 
            ? 'View detailed performance metrics for your students' 
            : 'View your detailed learning progress and performance'
          }
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pt-0">
        {user?.role === 'teacher' ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                    <div className="text-2xl font-bold">78%</div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-adaptiq-500 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Average Improvement</p>
                    <div className="text-2xl font-bold text-green-600">+21%</div>
                    <div className="text-xs text-green-600">Pre-to-post quiz average</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Participation Rate</p>
                    <div className="text-2xl font-bold">82%</div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-adaptiq-500 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="overall">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overall">Overall Analytics</TabsTrigger>
                <TabsTrigger value="sessions">Session Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="overall">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Performance</CardTitle>
                      <CardDescription>Overview of all students' performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Student Name</TableHead>
                            <TableHead>Overall Score</TableHead>
                            <TableHead>Participation</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Areas for Improvement</TableHead>
                            <TableHead>Strengths</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockStudents.map(student => (
                            <TableRow key={student.id}>
                              <TableCell className="font-medium">{student.name}</TableCell>
                              <TableCell>{student.overallScore}%</TableCell>
                              <TableCell>{student.participation}%</TableCell>
                              <TableCell>
                                <Badge className={`${getStatusColor(student.status)} text-white`}>
                                  {student.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{student.improvementAreas.join(', ') || 'None'}</TableCell>
                              <TableCell>{student.strengthAreas.join(', ') || 'None'}</TableCell>
                              <TableCell>
                                <Drawer>
                                  <DrawerTrigger asChild>
                                    <Button variant="outline" size="sm">View Details</Button>
                                  </DrawerTrigger>
                                  <StudentAnalyticsDrawer studentId={student.id} onClose={() => {}} />
                                </Drawer>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Class Participation Rate</CardTitle>
                      </CardHeader>
                      <CardContent className="h-80">
                        <ChartContainer 
                          config={chartConfig} 
                          className="h-full w-full"
                        >
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Active', value: 65 },
                                { name: 'Occasional', value: 25 },
                                { name: 'Inactive', value: 10 }
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              <Cell fill="#9b87f5" />
                              <Cell fill="#7E69AB" />
                              <Cell fill="#D6BCFA" />
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend content={<ChartLegendContent />} verticalAlign="bottom" />
                          </PieChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Average Quiz Improvement</CardTitle>
                      </CardHeader>
                      <CardContent className="h-80">
                        <ChartContainer 
                          config={chartConfig} 
                          className="h-full w-full"
                        >
                          <BarChart data={quizScoreData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend content={<ChartLegendContent />} verticalAlign="bottom" />
                            <Bar dataKey="pre" name="Pre-Quiz" fill="#7E69AB" />
                            <Bar dataKey="post" name="Post-Quiz" fill="#1EAEDB" />
                          </BarChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="sessions">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Session-by-Session Analytics</CardTitle>
                      <CardDescription>View performance metrics for each class session</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Session</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Avg. Pre-Quiz</TableHead>
                            <TableHead>Avg. Post-Quiz</TableHead>
                            <TableHead>Improvement</TableHead>
                            <TableHead>Participation</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pastClasses.map(classItem => {
                            const performance = getStudentPerformanceByClass(classItem.id);
                            const avgPreQuiz = Math.round(performance.reduce((acc, s) => acc + s.preQuizScore, 0) / performance.length);
                            const avgPostQuiz = Math.round(performance.reduce((acc, s) => acc + s.postQuizScore, 0) / performance.length);
                            const avgParticipation = Math.round(performance.reduce((acc, s) => acc + s.participation, 0) / performance.length);
                            return (
                              <TableRow key={classItem.id}>
                                <TableCell className="font-medium">{classItem.title}</TableCell>
                                <TableCell>{formatDate(classItem.scheduledFor)}</TableCell>
                                <TableCell>{avgPreQuiz}%</TableCell>
                                <TableCell>{avgPostQuiz}%</TableCell>
                                <TableCell className="text-green-600">+{avgPostQuiz - avgPreQuiz}%</TableCell>
                                <TableCell>{avgParticipation}%</TableCell>
                                <TableCell>
                                  <Drawer>
                                    <DrawerTrigger asChild>
                                      <Button variant="outline" size="sm">View Details</Button>
                                    </DrawerTrigger>
                                    <ClassAnalyticsDrawer classItem={classItem} onClose={() => {}} />
                                  </Drawer>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Session Performance Trend</CardTitle>
                      </CardHeader>
                      <CardContent className="h-80">
                        <ChartContainer 
                          config={chartConfig} 
                          className="h-full w-full"
                        >
                          <LineChart data={pastClasses.map(cls => {
                            const performance = getStudentPerformanceByClass(cls.id);
                            return {
                              name: cls.title,
                              preQuiz: Math.round(performance.reduce((acc, s) => acc + s.preQuizScore, 0) / performance.length),
                              postQuiz: Math.round(performance.reduce((acc, s) => acc + s.postQuizScore, 0) / performance.length)
                            };
                          })}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend content={<ChartLegendContent />} verticalAlign="bottom" />
                            <Line type="monotone" dataKey="preQuiz" name="Pre-Quiz" stroke="#7E69AB" />
                            <Line type="monotone" dataKey="postQuiz" name="Post-Quiz" stroke="#1EAEDB" />
                          </LineChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Session Participation Trend</CardTitle>
                      </CardHeader>
                      <CardContent className="h-80">
                        <ChartContainer 
                          config={chartConfig} 
                          className="h-full w-full"
                        >
                          <AreaChart data={pastClasses.map(cls => {
                            const performance = getStudentPerformanceByClass(cls.id);
                            return {
                              name: cls.title,
                              participation: Math.round(performance.reduce((acc, s) => acc + s.participation, 0) / performance.length)
                            };
                          })}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area type="monotone" dataKey="participation" name="Participation Rate" fill="#9b87f5" stroke="#7E69AB" />
                          </AreaChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Overall Score</p>
                    <div className="text-2xl font-bold">78%</div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-adaptiq-500 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Class Participation</p>
                    <div className="text-2xl font-bold">65%</div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-adaptiq-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Quiz Improvement</p>
                    <div className="text-2xl font-bold">+25%</div>
                    <div className="text-xs text-green-600">Average pre-to-post improvement</div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="overall">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overall">Overall Analytics</TabsTrigger>
                <TabsTrigger value="sessions">Session Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="overall">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Concept Mastery</CardTitle>
                      <CardDescription>Your understanding of different course concepts</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ChartContainer 
                        config={chartConfig} 
                        className="h-full w-full"
                      >
                        <BarChart
                          layout="vertical"
                          data={conceptMasteryData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" width={150} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="mastery" name="Mastery Level" fill="#9b87f5" />
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Quiz Performance</CardTitle>
                      <CardDescription>Your pre and post quiz scores</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ChartContainer 
                        config={chartConfig} 
                        className="h-full w-full"
                      >
                        <LineChart data={quizScoreData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend content={<ChartLegendContent />} verticalAlign="bottom" />
                          <Line type="monotone" dataKey="pre" name="Pre-Quiz" stroke="#7E69AB" />
                          <Line type="monotone" dataKey="post" name="Post-Quiz" stroke="#1EAEDB" />
                        </LineChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Areas for Improvement</CardTitle>
                    <CardDescription>Topics where additional focus would be beneficial</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium">Data Structures</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your quiz performance indicates you may benefit from additional practice with tree and graph structures.
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium">Mathematics</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Consider revisiting calculus concepts, particularly integration techniques.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="sessions">
                <Card>
                  <CardHeader>
                    <CardTitle>Session Performance</CardTitle>
                    <CardDescription>Your performance in individual class sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Session</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Pre-Quiz</TableHead>
                          <TableHead>Post-Quiz</TableHead>
                          <TableHead>Improvement</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pastClasses.map(classItem => {
                          // For demo, using sample scores
                          const preScore = Math.round(60 + Math.random() * 20);
                          const postScore = Math.round(preScore + 10 + Math.random() * 15);
                          return (
                            <TableRow key={classItem.id}>
                              <TableCell className="font-medium">{classItem.title}</TableCell>
                              <TableCell>{formatDate(classItem.scheduledFor)}</TableCell>
                              <TableCell>{preScore}%</TableCell>
                              <TableCell>{postScore}%</TableCell>
                              <TableCell className="text-green-600">+{postScore - preScore}%</TableCell>
                              <TableCell className="flex gap-2">
                                <Drawer>
                                  <DrawerTrigger asChild>
                                    <Button variant="outline" size="sm">View Notes</Button>
                                  </DrawerTrigger>
                                  <ClassNotesDrawer classItem={classItem} onClose={() => {}} />
                                </Drawer>
                                <Drawer>
                                  <DrawerTrigger asChild>
                                    <Button size="sm">Resources</Button>
                                  </DrawerTrigger>
                                  <DrawerContent className="max-w-4xl mx-auto">
                                    <DrawerHeader>
                                      <DrawerTitle>Resources: {classItem.title}</DrawerTitle>
                                    </DrawerHeader>
                                    <div className="p-4">
                                      <Tabs defaultValue="professor">
                                        <TabsList className="grid w-full grid-cols-2 mb-4">
                                          <TabsTrigger value="professor">Professor Resources</TabsTrigger>
                                          <TabsTrigger value="ai">AI Recommended</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="professor">
                                          <div className="space-y-3">
                                            {getResourcesByClass(classItem.id, false)
                                              .filter(r => !r.aiRecommended)
                                              .map(resource => (
                                                <div key={resource.id} className="flex items-start gap-3 p-3 border rounded-lg">
                                                  {resource.type === 'video' ? (
                                                    <Video className="h-5 w-5 text-blue-500 mt-0.5" />
                                                  ) : resource.type === 'article' ? (
                                                    <FileText className="h-5 w-5 text-purple-500 mt-0.5" />
                                                  ) : (
                                                    <Book className="h-5 w-5 text-green-500 mt-0.5" />
                                                  )}
                                                  <div>
                                                    <p className="font-medium">{resource.title}</p>
                                                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                                                  </div>
                                                  <Button variant="outline" size="sm" className="ml-auto">
                                                    View Resource
                                                  </Button>
                                                </div>
                                              ))}
                                            {getResourcesByClass(classItem.id, false).filter(r => !r.aiRecommended).length === 0 && (
                                              <p className="text-center py-4 text-muted-foreground">No professor resources for this session.</p>
                                            )}
                                          </div>
                                        </TabsContent>
                                        <TabsContent value="ai">
                                          <div className="space-y-3">
                                            {getResourcesByClass(classItem.id, true).map(resource => (
                                              <div key={resource.id} className="flex items-start gap-3 p-3 border rounded-lg">
                                                {resource.type === 'video' ? (
                                                  <Video className="h-5 w-5 text-blue-500 mt-0.5" />
                                                ) : resource.type === 'article' ? (
                                                  <FileText className="h-5 w-5 text-purple-500 mt-0.5" />
                                                ) : (
                                                  <Book className="h-5 w-5 text-green-500 mt-0.5" />
                                                )}
                                                <div>
                                                  <p className="font-medium">{resource.title}</p>
                                                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                                                </div>
                                                <Button variant="outline" size="sm" className="ml-auto">
                                                  View Resource
                                                </Button>
                                              </div>
                                            ))}
                                            {getResourcesByClass(classItem.id, true).length === 0 && (
                                              <p className="text-center py-4 text-muted-foreground">No AI recommended resources for this session.</p>
                                            )}
                                          </div>
                                        </TabsContent>
                                      </Tabs>
                                    </div>
                                    <DrawerFooter>
                                      <DrawerClose asChild>
                                        <Button variant="outline">Close</Button>
                                      </DrawerClose>
                                    </DrawerFooter>
                                  </DrawerContent>
                                </Drawer>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <div className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Session Learning Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ChartContainer 
                        config={chartConfig} 
                        className="h-full w-full"
                      >
                        <LineChart data={pastClasses.map((cls, index) => {
                          const preScore = 60 + (index * 5);
                          const postScore = preScore + 15 + (index * 2);
                          return {
                            name: cls.title.split(' ').slice(0, 2).join(' '),
                            preQuiz: preScore,
                            postQuiz: postScore
                          };
                        })}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend content={<ChartLegendContent />} verticalAlign="bottom" />
                          <Line type="monotone" dataKey="preQuiz" name="Pre-Quiz" stroke="#7E69AB" />
                          <Line type="monotone" dataKey="postQuiz" name="Post-Quiz" stroke="#1EAEDB" />
                        </LineChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );

  // Component to view all recommended resources (for students)
  const AllResourcesDrawer = ({ onClose }: { onClose: () => void }) => (
    <DrawerContent className="max-w-4xl mx-auto">
      <DrawerHeader>
        <DrawerTitle>All Recommended Resources</DrawerTitle>
        <DrawerDescription>
          Personalized learning materials to help you succeed
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pt-0">
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Search resources..."
            className="w-full p-2 border rounded-md"
            value={resourcesFilter}
            onChange={e => setResourcesFilter(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="bySession">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="bySession">By Session</TabsTrigger>
            <TabsTrigger value="all">All Resources</TabsTrigger>
          </TabsList>
          <TabsContent value="bySession">
            <div className="space-y-6">
              {mockClasses.map(cls => {
                const classAiResources = mockResources.filter(r => 
                  r.classId === cls.id && 
                  r.aiRecommended &&
                  (resourcesFilter === '' || 
                  r.title.toLowerCase().includes(resourcesFilter.toLowerCase()) || 
                  r.description.toLowerCase().includes(resourcesFilter.toLowerCase()))
                );
                
                if (classAiResources.length === 0) return null;
                
                return (
                  <div key={cls.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-3 border-b">
                      <h3 className="font-medium">{cls.title}</h3>
                      <p className="text-xs text-muted-foreground">{formatDate(cls.scheduledFor)}</p>
                    </div>
                    <div className="p-3 grid gap-3 grid-cols-1 md:grid-cols-2">
                      {classAiResources.map(resource => (
                        <div key={resource.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                          <div className="flex items-start gap-3">
                            {resource.type === 'video' ? (
                              <Video className="h-5 w-5 text-blue-500 mt-0.5" />
                            ) : resource.type === 'article' ? (
                              <FileText className="h-5 w-5 text-purple-500 mt-0.5" />
                            ) : (
                              <Book className="h-5 w-5 text-green-500 mt-0.5" />
                            )}
                            <div>
                              <h3 className="font-medium">{resource.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                              <Badge variant="outline" className="mt-2">
                                {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                              </Badge>
                            </div>
                          </div>
                          <Button className="w-full mt-3" variant="outline" size="sm" asChild>
                            <a href={resource.url} target="_blank" rel="noreferrer">
                              Access Resource
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              
              {!mockClasses.some(cls => 
                mockResources.some(r => 
                  r.classId === cls.id && 
                  r.aiRecommended &&
                  (resourcesFilter === '' || 
                  r.title.toLowerCase().includes(resourcesFilter.toLowerCase()) || 
                  r.description.toLowerCase().includes(resourcesFilter.toLowerCase()))
                )
              ) && (
                <p className="text-center py-8 text-muted-foreground">
                  No recommended resources found for the search criteria.
                </p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="all">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {mockResources
                .filter(r => 
                  r.aiRecommended && 
                  (resourcesFilter === '' || 
                  r.title.toLowerCase().includes(resourcesFilter.toLowerCase()) || 
                  r.description.toLowerCase().includes(resourcesFilter.toLowerCase()))
                )
                .map(resource => {
                  const relatedClass = mockClasses.find(c => c.id === resource.classId);
                  return (
                    <div key={resource.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-start gap-3">
                        {resource.type === 'video' ? (
                          <Video className="h-5 w-5 text-blue-500 mt-0.5" />
                        ) : resource.type === 'article' ? (
                          <FileText className="h-5 w-5 text-purple-500 mt-0.5" />
                        ) : (
                          <Book className="h-5 w-5 text-green-500 mt-0.5" />
                        )}
                        <div>
                          <h3 className="font-medium">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline">
                              {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                            </Badge>
                            {relatedClass && (
                              <Badge variant="outline" className="bg-adaptiq-50">
                                For: {relatedClass.title.split(' ').slice(0, 3).join(' ')}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button className="w-full mt-3" variant="outline" size="sm" asChild>
                        <a href={resource.url} target="_blank" rel="noreferrer">
                          Access Resource
                        </a>
                      </Button>
                    </div>
                  );
                })}
              
              {mockResources.filter(r => 
                r.aiRecommended && 
                (resourcesFilter === '' || 
                r.title.toLowerCase().includes(resourcesFilter.toLowerCase()) || 
                r.description.toLowerCase().includes(resourcesFilter.toLowerCase()))
              ).length === 0 && (
                <p className="text-center py-8 text-muted-foreground col-span-2">
                  No recommended resources found for the search criteria.
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );

  const TeacherDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Classes</CardTitle>
              <CardDescription>Your scheduled upcoming classes</CardDescription>
            </div>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm">View All</Button>
              </DrawerTrigger>
              <AllClassesDrawer 
                classes={organizeClasses().upcoming} 
                onClose={() => {}} 
                onViewClass={setSelectedClass} 
              />
            </Drawer>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((cls) => (
                <div key={cls.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{cls.title}</h3>
                      <div className="flex items-center gap-2 text-gray-500 mt-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(cls.scheduledFor)}
                      </div>
                    </div>
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button variant="outline" size="sm">View Details</Button>
                      </DrawerTrigger>
                      <ClassDetailsDrawer 
                        classItem={cls} 
                        onClose={() => setSelectedClass(null)} 
                      />
                    </Drawer>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">View Past Classes</Button>
              </DrawerTrigger>
              <PastClassesDrawer 
                classes={organizeClasses().past} 
                onClose={() => {}} 
                onViewClass={setSelectedClass} 
              />
            </Drawer>
            <Drawer>
              <DrawerTrigger asChild>
                <Button>Create New Class</Button>
              </DrawerTrigger>
              <CreateClassDrawer onClose={() => {}} />
            </Drawer>
          </CardFooter>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Class Analytics</CardTitle>
            <CardDescription>Overview of your class performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <p className="text-lg font-medium text-adaptiq-600">82%</p>
                <p className="text-sm text-gray-500">Class Average</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-lg font-medium text-adaptiq-600">24</p>
                <p className="text-sm text-gray-500">Active Students</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-lg font-medium text-adaptiq-600">15</p>
                <p className="text-sm text-gray-500">Sessions Taken</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost">View Detailed Analytics</Button>
              </DrawerTrigger>
              <DetailedAnalyticsDrawer onClose={() => {}} />
            </Drawer>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="w-full">Create New Class</Button>
              </DrawerTrigger>
              <CreateClassDrawer onClose={() => {}} />
            </Drawer>
            
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="w-full" variant="outline">Manage Resources</Button>
              </DrawerTrigger>
              <ManageResourcesDrawer onClose={() => {}} />
            </Drawer>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Student Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="flex-1">
                  <p className="text-sm">Michael T. is struggling with Data Structures</p>
                </div>
                <Button variant="ghost" size="sm" className="flex-shrink-0">
                  <User className="h-4 w-4 mr-1" /> View
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="flex-1">
                  <p className="text-sm">Sarah M. needs improvement in Algorithms</p>
                </div>
                <Button variant="ghost" size="sm" className="flex-shrink-0">
                  <User className="h-4 w-4 mr-1" /> View
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div className="flex-1">
                  <p className="text-sm">Emma R. excelled in the Database Management quiz</p>
                </div>
                <Button variant="ghost" size="sm" className="flex-shrink-0">
                  <User className="h-4 w-4 mr-1" /> View
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="text-sm">5 students completed post-quiz for "Data Structures"</p>
                </div>
                <Button variant="ghost" size="sm" className="flex-shrink-0">
                  <BarChart2 className="h-4 w-4 mr-1" /> Results
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const StudentDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Classes</CardTitle>
              <CardDescription>Your scheduled classes for this week</CardDescription>
            </div>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm">View All</Button>
              </DrawerTrigger>
              <AllClassesDrawer 
                classes={organizeClasses().upcoming} 
                onClose={() => {}} 
                onViewClass={setSelectedClass} 
              />
            </Drawer>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((cls) => (
                <div key={cls.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{cls.title}</h3>
                      <div className="flex items-center gap-2 text-gray-500 mt-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(cls.scheduledFor)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button variant="outline" size="sm">Pre-Quiz</Button>
                        </DrawerTrigger>
                        <DrawerContent className="max-w-4xl mx-auto">
                          <DrawerHeader>
                            <DrawerTitle>Pre-Class Quiz: {cls.title}</DrawerTitle>
                          </DrawerHeader>
                          <div className="p-4">
                            {showQuizContent ? (
                              <div className="space-y-6">
                                {getQuizzesByClassAndType(cls.id, 'pre')?.questions.map((question, index) => (
                                  <div key={question.id} className="border rounded-lg p-4">
                                    <h3 className="font-medium mb-2">
                                      Question {index + 1}: {question.text}
                                    </h3>
                                    <div className="space-y-2 mt-3">
                                      {question.options.map((option, optIndex) => (
                                        <div key={optIndex} className="flex items-center space-x-2">
                                          <input 
                                            type="radio" 
                                            name={`question-${question.id}`} 
                                            id={`q${question.id}-opt${optIndex}`} 
                                            className="h-4 w-4 text-adaptiq-600"
                                          />
                                          <label htmlFor={`q${question.id}-opt${optIndex}`} className="text-sm">
                                            {option}
                                          </label>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                                <Button className="w-full">Submit Quiz</Button>
                              </div>
                            ) : (
                              <div className="text-center py-12">
                                <div className="mb-4">
                                  <Info className="h-12 w-12 mx-auto text-adaptiq-500" />
                                </div>
                                <h3 className="text-lg font-medium mb-2">Quiz Information</h3>
                                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                  This quiz contains {getQuizzesByClassAndType(cls.id, 'pre')?.questions.length || 0} questions to help you 
                                  prepare for the upcoming class session.
                                </p>
                                <Button onClick={() => setShowQuizContent(true)}>
                                  Start Quiz
                                </Button>
                              </div>
                            )}
                          </div>
                          <DrawerFooter>
                            <DrawerClose asChild>
                              <Button variant="outline" onClick={() => setShowQuizContent(false)}>Cancel</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                      
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button size="sm">View Class</Button>
                        </DrawerTrigger>
                        <ClassDetailsDrawer 
                          classItem={cls} 
                          onClose={() => setSelectedClass(null)} 
                        />
                      </Drawer>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost">View Past Classes</Button>
              </DrawerTrigger>
              <PastClassesDrawer 
                classes={organizeClasses().past} 
                onClose={() => {}} 
                onViewClass={setSelectedClass} 
              />
            </Drawer>
          </CardFooter>
        </Card>

        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Classes</CardTitle>
              <CardDescription>Access your recent class materials and notes</CardDescription>
            </div>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm">View All</Button>
              </DrawerTrigger>
              <PastClassesDrawer 
                classes={organizeClasses().past} 
                onClose={() => {}} 
                onViewClass={setSelectedClass} 
              />
            </Drawer>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pastClasses.slice(0, 2).map((cls) => {
                const classNote = getNotesByClass(cls.id);
                return (
                  <div key={cls.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{cls.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatDate(cls.scheduledFor)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {classNote && (
                          <Drawer>
                            <DrawerTrigger asChild>
                              <Button variant="outline" size="sm">View Notes</Button>
                            </DrawerTrigger>
                            <ClassNotesDrawer 
                              classItem={cls} 
                              onClose={() => {}}
                            /> 
                          </Drawer>
                        )}
                        
                        {getQuizzesByClassAndType(cls.id, 'post') && (
                          <Drawer>
                            <DrawerTrigger asChild>
                              <Button size="sm">Post Quiz</Button>
                            </DrawerTrigger>
                            <DrawerContent>
                              <DrawerHeader>
                                <DrawerTitle>Post-Class Quiz: {cls.title}</DrawerTitle>
                                <DrawerDescription>
                                  Test your understanding of the class material
                                </DrawerDescription>
                              </DrawerHeader>
                              <div className="p-4">
                                {showQuizContent ? (
                                  <div className="space-y-6">
                                    {getQuizzesByClassAndType(cls.id, 'post')?.questions.map((question, index) => (
                                      <div key={question.id} className="border rounded-lg p-4">
                                        <h3 className="font-medium mb-2">
                                          Question {index + 1}: {question.text}
                                        </h3>
                                        <div className="space-y-2 mt-3">
                                          {question.options.map((option, optIndex) => (
                                            <div key={optIndex} className="flex items-center space-x-2">
                                              <input 
                                                type="radio" 
                                                name={`question-${question.id}`} 
                                                id={`q${question.id}-opt${optIndex}`} 
                                                className="h-4 w-4 text-adaptiq-600"
                                              />
                                              <label htmlFor={`q${question.id}-opt${optIndex}`} className="text-sm">
                                                {option}
                                              </label>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                    <Button className="w-full">Submit Quiz</Button>
                                  </div>
                                ) : (
                                  <div className="text-center py-12">
                                    <div className="mb-4">
                                      <Info className="h-12 w-12 mx-auto text-adaptiq-500" />
                                    </div>
                                    <h3 className="text-lg font-medium mb-2">Quiz Information</h3>
                                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                      This quiz contains {getQuizzesByClassAndType(cls.id, 'post')?.questions.length || 0} questions to test your 
                                      understanding of the class material.
                                    </p>
                                    <Button onClick={() => setShowQuizContent(true)}>
                                      Start Quiz
                                    </Button>
                                  </div>
                                )}
                              </div>
                              <DrawerFooter>
                                <DrawerClose asChild>
                                  <Button variant="outline" onClick={() => setShowQuizContent(false)}>Cancel</Button>
                                </DrawerClose>
                              </DrawerFooter>
                            </DrawerContent>
                          </Drawer>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">Session Resources</p>
                        <div className="flex items-center mt-1">
                          <div className="flex gap-1">
                            {Array.from({ length: Math.min(2, cls.resources?.length || 0) }).map((_, i) => (
                              <div key={i} className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                                {cls.resources?.[i].type === 'video' && <Video className="h-3 w-3" />}
                                {cls.resources?.[i].type === 'article' && <FileText className="h-3 w-3" />}
                                {cls.resources?.[i].type === 'example' && <Book className="h-3 w-3" />}
                              </div>
                            ))}
                            {(cls.resources?.length || 0) > 2 && (
                              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                                +{(cls.resources?.length || 0) - 2}
                              </div>
                            )}
                          </div>
                          <Link to="#" className="text-sm text-adaptiq-600 hover:underline ml-2 flex items-center">
                            View All <ChevronRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                      <div>
                        <Drawer>
                          <DrawerTrigger asChild>
                            <Button variant="outline" size="sm">
                              More Details
                            </Button>
                          </DrawerTrigger>
                          <ClassDetailsDrawer 
                            classItem={cls} 
                            onClose={() => setSelectedClass(null)} 
                          />
                        </Drawer>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Your Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <div className="text-sm font-medium flex justify-between">
                  <span>Overall Quiz Score</span>
                  <span className="text-adaptiq-600">85%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-adaptiq-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="text-sm font-medium flex justify-between">
                  <span>Class Participation</span>
                  <span className="text-adaptiq-600">70%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-adaptiq-500 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="text-sm font-medium flex justify-between">
                  <span>Resource Utilization</span>
                  <span className="text-adaptiq-600">60%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-adaptiq-500 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost">View Detailed Analytics</Button>
              </DrawerTrigger>
              <DetailedAnalyticsDrawer onClose={() => {}} />
            </Drawer>
          </CardFooter>
        </Card>

        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recommended Resources</CardTitle>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm">View All</Button>
              </DrawerTrigger>
              <AllResourcesDrawer onClose={() => {}} />
            </Drawer>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockResources.filter(r => r.aiRecommended).slice(0, 3).map(resource => (
                <div key={resource.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start">
                    <div>
                      <Link to="#" className="text-sm font-medium text-adaptiq-600 hover:underline">
                        {resource.title}
                      </Link>
                      <p className="text-xs text-gray-500 mt-1">
                        {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)} • {resource.description.substring(0, 30)}...
                      </p>
                      {resource.classId && (
                        <Badge variant="outline" className="mt-1 bg-adaptiq-50 text-xs">
                          For: {getClassById(resource.classId)?.title.split(' ').slice(0, 2).join(' ')}
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingClasses.slice(0, 1).map(cls => (
                <div key={cls.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{cls.title}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(cls.scheduledFor).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </DrawerTrigger>
                    <ClassDetailsDrawer 
                      classItem={cls} 
                      onClose={() => setSelectedClass(null)}
                    />
                  </Drawer>
                </div>
              ))}
              {getQuizzesByClassAndType(upcomingClasses[0]?.id || '', 'pre') && (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Pre-Quiz: {upcomingClasses[0]?.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">Complete before class</p>
                  </div>
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline" size="sm">
                        Take
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Pre-Class Quiz: {upcomingClasses[0]?.title}</DrawerTitle>
                      </DrawerHeader>
                      <div className="p-4">
                        {showQuizContent ? (
                          <div className="space-y-6">
                            {getQuizzesByClassAndType(upcomingClasses[0]?.id || '', 'pre')?.questions.map((question, index) => (
                              <div key={question.id} className="border rounded-lg p-4">
                                <h3 className="font-medium mb-2">
                                  Question {index + 1}: {question.text}
                                </h3>
                                <div className="space-y-2 mt-3">
                                  {question.options.map((option, optIndex) => (
                                    <div key={optIndex} className="flex items-center space-x-2">
                                      <input 
                                        type="radio" 
                                        name={`question-${question.id}`} 
                                        id={`q${question.id}-opt${optIndex}`} 
                                        className="h-4 w-4 text-adaptiq-600"
                                      />
                                      <label htmlFor={`q${question.id}-opt${optIndex}`} className="text-sm">
                                        {option}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                            <Button className="w-full">Submit Quiz</Button>
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <div className="mb-4">
                              <Info className="h-12 w-12 mx-auto text-adaptiq-500" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">Quiz Information</h3>
                            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                              This quiz contains {getQuizzesByClassAndType(upcomingClasses[0]?.id || '', 'pre')?.questions.length || 0} questions to help you 
                              prepare for the upcoming class session.
                            </p>
                            <Button onClick={() => setShowQuizContent(true)}>
                              Start Quiz
                            </Button>
                          </div>
                        )}
                      </div>
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <Button variant="outline" onClick={() => setShowQuizContent(false)}>Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.name}
        </h1>
        <p className="text-gray-600">
          {user?.role === 'teacher'
            ? 'Manage your classes and track student progress.'
            : 'Track your progress and access your learning materials.'}
        </p>
      </div>

      {/* Show appropriate dashboard based on user role */}
      {user?.role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />}
      
      {/* Drawers for viewing class details */}
      {selectedClass && (
        <Drawer open onOpenChange={(open) => !open && setSelectedClass(null)}>
          <ClassDetailsDrawer classItem={selectedClass} onClose={() => setSelectedClass(null)} />
        </Drawer>
      )}
      
      {selectedStudentId && (
        <Drawer open onOpenChange={(open) => !open && setSelectedStudentId(null)}>
          <StudentAnalyticsDrawer studentId={selectedStudentId} onClose={() => setSelectedStudentId(null)} />
        </Drawer>
      )}
    </div>
  );
};

export default Dashboard;
