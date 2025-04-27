
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Class, ClassNote, Quiz, Resource } from '@/types';
import { ChartContainer, ChartTooltipContent, ChartLegendContent, ChartTooltip, ChartLegend } from '@/components/ui/chart';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Calendar, Clock, Book, FileText, Video, Users, BarChart2 } from 'lucide-react';

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
        id: 'q2',
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
    conceptIds: ['c1']
  },
  {
    id: '102',
    title: 'Programming Basics Video',
    description: 'Visual introduction to programming',
    url: '#',
    type: 'video',
    conceptIds: ['c2']
  },
  {
    id: '107',
    title: 'Algorithm Visualization',
    description: 'Interactive visualization of sorting algorithms',
    url: '#',
    type: 'example',
    conceptIds: ['c4']
  },
  {
    id: '108',
    title: 'Data Structure Implementation Guide',
    description: 'Step-by-step implementation guide for common data structures',
    url: '#',
    type: 'article',
    conceptIds: ['c4', 'c5']
  },
  {
    id: '109',
    title: 'Big O Notation Explained',
    description: 'In-depth explanation of algorithmic complexity',
    url: '#',
    type: 'video',
    conceptIds: ['c4']
  }
];

// Mock analytics data
const studentPerformanceData = [
  { name: 'John D.', id: 'std1', overallScore: 85, participation: 92, status: 'excellent', improvementAreas: ['Data Structures'], strengthAreas: ['Algorithms', 'Programming Basics'] },
  { name: 'Sarah M.', id: 'std2', overallScore: 72, participation: 65, status: 'good', improvementAreas: ['Algorithms', 'Mathematics'], strengthAreas: ['Programming Basics'] },
  { name: 'Michael T.', id: 'std3', overallScore: 45, participation: 30, status: 'struggling', improvementAreas: ['Programming Basics', 'Data Structures', 'Algorithms'], strengthAreas: [] },
  { name: 'Emma R.', id: 'std4', overallScore: 93, participation: 85, status: 'excellent', improvementAreas: [], strengthAreas: ['Mathematics', 'Algorithms', 'Data Structures'] },
  { name: 'James L.', id: 'std5', overallScore: 60, participation: 45, status: 'needs improvement', improvementAreas: ['Mathematics', 'Algorithms'], strengthAreas: ['Programming Basics'] }
];

const conceptMasteryData = [
  { name: 'Programming Basics', mastery: 75 },
  { name: 'Data Structures', mastery: 60 },
  { name: 'Algorithms', mastery: 85 },
  { name: 'Mathematics', mastery: 45 }
];

const quizScoreData = [
  { name: 'Quiz 1', pre: 65, post: 85 },
  { name: 'Quiz 2', pre: 55, post: 75 },
  { name: 'Quiz 3', pre: 70, post: 90 },
  { name: 'Quiz 4', pre: 60, post: 80 }
];

// Color configuration for charts
const chartConfig = {
  pre: { color: '#7E69AB' },
  post: { color: '#1EAEDB' },
  mastery: { color: '#9b87f5' },
};

// Create a function to get status color
const getStatusColor = (status) => {
  switch(status.toLowerCase()) {
    case 'excellent': return 'bg-green-500';
    case 'good': return 'bg-blue-500';
    case 'needs improvement': return 'bg-yellow-500';
    case 'struggling': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const Dashboard = () => {
  const { user } = useAuth();
  const [upcomingClasses, setUpcomingClasses] = useState<Class[]>([]);
  const [allClasses, setAllClasses] = useState<Class[]>([]);
  const [recentClasses, setRecentClasses] = useState<Class[]>([]);
  const [viewingClass, setViewingClass] = useState<Class | null>(null);
  const [viewingNote, setViewingNote] = useState<ClassNote | null>(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [upcomingQuizzes, setUpcomingQuizzes] = useState<Quiz[]>([]);
  const [recommendedResources, setRecommendedResources] = useState<Resource[]>([]);

  useEffect(() => {
    // In a real app, we would fetch these from an API
    setUpcomingClasses(mockClasses.slice(0, 2));
    setAllClasses(mockClasses);
    setRecentClasses([mockClasses[2]]);
    setUpcomingQuizzes(mockQuizzes);
    
    // Filter recommended resources based on student needs
    if (user?.role === 'student') {
      // For demo, just showing some filtered resources
      setRecommendedResources(mockResources.slice(0, 3));
    }
  }, [user]);

  // Component to view class details
  const ClassDetailsDrawer = ({ classItem, onClose }) => (
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
            <Button className="w-full mt-2">Take Pre-Class Quiz</Button>
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
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );

  // Component to view class notes
  const ClassNotesDrawer = ({ classItem, note, onClose }) => (
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
        <div className="mb-6">
          <h4 className="font-medium mb-2">Session Summary</h4>
          <p className="text-muted-foreground whitespace-pre-line">{note?.content}</p>
        </div>
        
        {note?.keyConcepts && note.keyConcepts.length > 0 && (
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
        
        {note?.unansweredQuestions && note.unansweredQuestions.length > 0 && (
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
          <h4 className="font-medium mb-2">Post-Class Quiz</h4>
          <Button className="w-full">Take Post-Class Quiz</Button>
        </div>
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );

  // Component to create a new class (for teachers)
  const CreateClassDrawer = ({ onClose }) => (
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
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Date and Time</label>
            <input 
              type="datetime-local" 
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Session Description</label>
            <textarea 
              rows={4}
              placeholder="Describe what will be covered in this class..."
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Meeting URL (optional)</label>
            <input 
              type="text" 
              placeholder="e.g., https://meet.google.com/..."
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium mb-2">Add Resources</h4>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h5 className="font-medium">Resource 1</h5>
                <Button variant="ghost" size="sm">Remove</Button>
              </div>
              <div className="grid gap-2">
                <input 
                  type="text" 
                  placeholder="Resource Title"
                  className="w-full p-2 border rounded-md"
                />
                <input 
                  type="text" 
                  placeholder="URL"
                  className="w-full p-2 border rounded-md"
                />
                <select className="w-full p-2 border rounded-md">
                  <option value="">Select Type</option>
                  <option value="article">Article</option>
                  <option value="video">Video</option>
                  <option value="example">Example/Exercise</option>
                </select>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              + Add Another Resource
            </Button>
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

  // Component to manage resources (for teachers)
  const ManageResourcesDrawer = ({ onClose }) => (
    <DrawerContent className="max-w-4xl mx-auto">
      <DrawerHeader>
        <DrawerTitle>Manage Resources</DrawerTitle>
        <DrawerDescription>Add and manage learning resources for your classes</DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pt-0">
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Search resources..."
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Associated Classes</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockResources.map(resource => (
              <TableRow key={resource.id}>
                <TableCell className="font-medium">{resource.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {mockClasses
                    .filter(c => c.resources?.some(r => r.id === resource.id))
                    .map(c => c.title)
                    .join(", ") || "None"}
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
        
        <Button className="mt-4 w-full">+ Add New Resource</Button>
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );

  // Component to view all classes
  const AllClassesDrawer = ({ classes, onClose, onViewClass }) => (
    <DrawerContent className="max-w-4xl mx-auto">
      <DrawerHeader>
        <DrawerTitle>All Classes</DrawerTitle>
        <DrawerDescription>
          {user?.role === 'teacher' ? 'View all your scheduled classes' : 'View all your upcoming classes'}
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pt-0">
        {classes.length > 0 ? (
          <div className="space-y-4">
            {classes.map(classItem => (
              <div key={classItem.id} className="p-4 border rounded-lg">
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
                  <Button variant="outline" size="sm" onClick={() => onViewClass(classItem)}>
                    View Details
                  </Button>
                </div>
                
                {user?.role === 'student' && (
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      Take Pre-Quiz
                    </Button>
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
          <p className="text-center py-8 text-muted-foreground">
            No classes scheduled yet.
          </p>
        )}
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );

  // Component to view detailed analytics
  const DetailedAnalyticsDrawer = ({ onClose }) => (
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
          <>
            <h3 className="text-lg font-medium mb-4">Student Performance</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Overall Score</TableHead>
                  <TableHead>Participation</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Areas for Improvement</TableHead>
                  <TableHead>Strength Areas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentPerformanceData.map(student => (
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
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
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
                    <div className="mt-3">
                      <h5 className="text-sm font-medium mb-2">Recommended Resources:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href="#" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" /> 
                            Tree Traversal Guide
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href="#" className="flex items-center gap-2">
                            <Video className="h-4 w-4" /> 
                            Graph Algorithms Video
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Mathematics</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Consider revisiting calculus concepts, particularly integration techniques.
                    </p>
                    <div className="mt-3">
                      <h5 className="text-sm font-medium mb-2">Recommended Resources:</h5>
                      <Button variant="outline" size="sm" asChild>
                        <a href="#" className="flex items-center gap-2">
                          <Video className="h-4 w-4" /> 
                          Calculus Integration Tutorial
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
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
  const AllResourcesDrawer = ({ resources, onClose }) => (
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
          />
        </div>
        
        {resources.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {resources.map(resource => (
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
        ) : (
          <p className="text-center py-8 text-muted-foreground">
            No resources available yet.
          </p>
        )}
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
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Your scheduled upcoming classes</CardDescription>
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
                        {formatDate(cls.scheduledFor!)}
                      </div>
                    </div>
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button variant="outline" size="sm">View Details</Button>
                      </DrawerTrigger>
                      <ClassDetailsDrawer 
                        classItem={cls} 
                        onClose={() => setViewingClass(null)} 
                      />
                    </Drawer>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost">View All Classes</Button>
              </DrawerTrigger>
              <AllClassesDrawer 
                classes={allClasses} 
                onClose={() => {}} 
                onViewClass={setViewingClass} 
              />
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
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>5 students completed post-quiz for "Data Structures"</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Class notes generated for "Algorithms Analysis"</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span>2 students are struggling with "Binary Trees"</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span>New resource uploaded: "Advanced Sorting Algorithms"</span>
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
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Your scheduled classes for this week</CardDescription>
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
                        {formatDate(cls.scheduledFor!)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button variant="outline" size="sm">Take Pre-Quiz</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Pre-Class Quiz: {cls.title}</DrawerTitle>
                            <DrawerDescription>
                              Complete this quiz to prepare for the upcoming class
                            </DrawerDescription>
                          </DrawerHeader>
                          <div className="p-4">
                            <p className="text-center py-8">Quiz content would be displayed here</p>
                          </div>
                          <DrawerFooter>
                            <Button>Submit Quiz</Button>
                            <DrawerClose asChild>
                              <Button variant="outline">Cancel</Button>
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
                          onClose={() => setViewingClass(null)} 
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
                <Button variant="ghost">View All Classes</Button>
              </DrawerTrigger>
              <AllClassesDrawer 
                classes={allClasses} 
                onClose={() => {}} 
                onViewClass={setViewingClass} 
              />
            </Drawer>
          </CardFooter>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Classes</CardTitle>
            <CardDescription>Access your recent class materials and notes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClasses.map((cls) => {
                const classNote = mockNotes.find(note => note.classId === cls.id);
                return (
                  <div key={cls.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{cls.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(cls.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Drawer>
                          <DrawerTrigger asChild>
                            <Button variant="outline" size="sm">View Notes</Button>
                          </DrawerTrigger>
                          <ClassNotesDrawer 
                            classItem={cls} 
                            note={classNote} 
                            onClose={() => {
                              setViewingClass(null);
                              setViewingNote(null);
                            }} 
                          />
                        </Drawer>
                        
                        <Drawer>
                          <DrawerTrigger asChild>
                            <Button size="sm">Take Quiz</Button>
                          </DrawerTrigger>
                          <DrawerContent>
                            <DrawerHeader>
                              <DrawerTitle>Post-Class Quiz: {cls.title}</DrawerTitle>
                              <DrawerDescription>
                                Test your understanding of the class material
                              </DrawerDescription>
                            </DrawerHeader>
                            <div className="p-4">
                              <p className="text-center py-8">Post-quiz content would be displayed here</p>
                            </div>
                            <DrawerFooter>
                              <Button>Submit Quiz</Button>
                              <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DrawerClose>
                            </DrawerFooter>
                          </DrawerContent>
                        </Drawer>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Upcoming Quizzes</CardTitle>
            <CardDescription>Prepare for these upcoming assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingQuizzes.filter(q => q.type === 'pre').map(quiz => {
                const relatedClass = mockClasses.find(c => c.id === quiz.classId);
                return (
                  <div key={quiz.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{quiz.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          For: {relatedClass?.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Due: {relatedClass ? formatDate(relatedClass.scheduledFor!) : 'N/A'}
                        </p>
                      </div>
                      <Button size="sm">Take Quiz</Button>
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
          <CardHeader>
            <CardTitle>Recommended Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendedResources.slice(0, 3).map(resource => (
                <div key={resource.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <Link to="#" className="text-sm font-medium text-adaptiq-600 hover:underline">
                    {resource.title}
                  </Link>
                  <p className="text-xs text-gray-500">
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)} • {resource.description.substring(0, 30)}...
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost">View All Resources</Button>
              </DrawerTrigger>
              <AllResourcesDrawer resources={mockResources} onClose={() => {}} />
            </Drawer>
          </CardFooter>
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
      {viewingClass && (
        <Drawer open onOpenChange={(open) => !open && setViewingClass(null)}>
          <ClassDetailsDrawer classItem={viewingClass} onClose={() => setViewingClass(null)} />
        </Drawer>
      )}
    </div>
  );
};

export default Dashboard;
