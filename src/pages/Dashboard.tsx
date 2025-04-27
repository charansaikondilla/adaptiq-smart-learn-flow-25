import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
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
  const [selectedClass, setSelectedClass] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [upcomingClasses, setUpcomingClasses] = useState([]);

  useEffect(() => {
    // Filter only upcoming classes
    const organized = organizeClasses();
    setUpcomingClasses(organized.upcoming.slice(0, 3));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6">
        {/* Upcoming Classes Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Your next scheduled classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((classItem) => (
                <Card key={classItem.id} className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{classItem.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDate(classItem.scheduledFor)}
                        </p>
                      </div>
                      {classItem.meetingUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a 
                            href={classItem.meetingUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Video className="h-4 w-4" />
                            Join Meeting
                          </a>
                        </Button>
                      )}
                    </div>
                    {/* Resources Section */}
                    {classItem.resources && classItem.resources.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Resources:</h4>
                        <div className="space-y-2">
                          {classItem.resources.map((resource) => (
                            <div key={resource.id} className="flex items-center justify-between text-sm">
                              <span>{resource.title}</span>
                              <Button variant="ghost" size="sm" asChild>
                                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analytics Dialog */}
        <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
          <DialogContent className="max-w-4xl w-[90vw] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detailed Analytics</DialogTitle>
              <DialogDescription>Your performance metrics and progress</DialogDescription>
            </DialogHeader>
            {/* Analytics content here */}
          </DialogContent>
        </Dialog>

        {/* Notes Section */}
        {selectedClass && (
          <Dialog open={!!selectedClass} onOpenChange={() => setSelectedClass(null)}>
            <DialogContent className="max-w-4xl w-[90vw] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Class Notes: {selectedClass.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                {getNotesByClass(selectedClass.id)?.content || 'No notes available for this class.'}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
