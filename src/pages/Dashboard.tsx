
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Progress } from '@/components/ui/progress';
import { Calendar, ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Class, Resource } from '@/types';

// Import custom modals
import PreQuizModal from '@/components/student/PreQuizModal';
import PostQuizModal from '@/components/student/PostQuizModal';
import ClassDetailsModal from '@/components/student/ClassDetailsModal';
import NotesModal from '@/components/student/NotesModal';
import AllClassesModal from '@/components/student/AllClassesModal';
import AllResourcesModal from '@/components/student/AllResourcesModal';
import DetailedAnalyticsModal from '@/components/student/DetailedAnalyticsModal';

const mockClasses: Class[] = [
  {
    id: '1',
    title: 'Introduction to Computer Science',
    description: 'Learn the fundamentals of computer science and programming',
    teacherId: '1',
    createdAt: '2023-01-15T10:00:00Z',
    scheduledFor: '2025-05-01T07:30:00Z',
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
    resources: [
      { id: '101', title: 'CS Fundamentals PDF', type: 'article', url: '#', description: 'Comprehensive overview of CS concepts', conceptIds: ['c1'] },
      { id: '102', title: 'Programming Basics Video', type: 'video', url: '#', description: 'Visual introduction to programming', conceptIds: ['c2'] }
    ]
  },
  {
    id: '2',
    title: 'Advanced Mathematics',
    description: 'Explore complex mathematical concepts and their applications',
    teacherId: '1',
    createdAt: '2023-02-10T09:30:00Z',
    scheduledFor: '2025-05-02T03:30:00Z',
    meetingUrl: 'https://meet.google.com/xyz-abcd-efg',
    resources: [
      { id: '103', title: 'Applied Mathematics Guide', type: 'article', url: '#', description: 'In-depth guide to mathematical applications', conceptIds: ['c3'] }
    ]
  },
  {
    id: '3',
    title: 'Web Development Basics',
    description: 'Introduction to HTML, CSS, and JavaScript',
    teacherId: '2',
    createdAt: '2023-03-10T13:00:00Z',
    scheduledFor: '2025-05-05T02:30:00Z',
    meetingUrl: 'https://meet.google.com/pqr-stuv-wxy',
    resources: [
      { id: '106', title: 'HTML/CSS Cheatsheet', type: 'article', url: '#', description: 'Quick reference for web developers', conceptIds: ['c6'] }
    ]
  },
  {
    id: '4',
    title: 'Data Structures and Algorithms',
    description: 'Learn efficient data structures and algorithms for solving problems',
    teacherId: '1',
    createdAt: '2023-03-05T11:15:00Z',
    scheduledFor: '2025-05-03T09:00:00Z',
    completed: true,
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
    resources: [
      { id: '104', title: 'Algorithm Visualization Tool', type: 'example', url: '#', description: 'Interactive algorithm visualizer', conceptIds: ['c4'] },
      { id: '105', title: 'Data Structure Implementation Guide', type: 'article', url: '#', description: 'Step-by-step implementation instructions', conceptIds: ['c4', 'c5'] }
    ]
  }
];

const recommendedResources: Resource[] = [
  {
    id: '104',
    title: 'Algorithm Visualization Tool',
    description: 'Example - Interactive visualization of sorting algorithms',
    url: '#',
    type: 'example',
    conceptIds: ['c4'],
    classId: '3',
    aiRecommended: true
  },
  {
    id: '110',
    title: 'Big O Notation Explained',
    description: 'Video - In-depth explanation of algorithmic complexity',
    url: '#',
    type: 'video',
    conceptIds: ['c4'],
    classId: '3',
    aiRecommended: true
  },
  {
    id: '111',
    title: 'Advanced Sorting Algorithms',
    description: 'Article - Deep dive into efficient sorting techniques',
    url: '#',
    type: 'article',
    conceptIds: ['c4'],
    classId: '3',
    aiRecommended: true
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `May ${date.getDate()}, ${date.getFullYear()}, ${date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  }).replace(' ', '').toLowerCase()}`;
};

const Dashboard = () => {
  const { user } = useAuth();
  
  // Modal states
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showPreQuiz, setShowPreQuiz] = useState(false);
  const [showPostQuiz, setShowPostQuiz] = useState(false);
  const [showClassDetails, setShowClassDetails] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showAllClasses, setShowAllClasses] = useState(false);
  const [showAllResources, setShowAllResources] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const handlePreQuiz = (classItem: Class) => {
    setSelectedClass(classItem);
    setShowPreQuiz(true);
  };

  const handlePostQuiz = (classItem: Class) => {
    setSelectedClass(classItem);
    setShowPostQuiz(true);
  };

  const handleViewClass = (classItem: Class) => {
    setSelectedClass(classItem);
    setShowClassDetails(true);
  };

  const handleViewNotes = (classItem: Class) => {
    setSelectedClass(classItem);
    setShowNotes(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Welcome back, Student Johnson</h1>
        <p className="text-gray-600">Track your progress and access your learning materials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Upcoming Classes */}
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Upcoming Classes</CardTitle>
                <CardDescription>Your scheduled classes for this week</CardDescription>
              </div>
              <Button variant="link" className="font-medium" onClick={() => setShowAllClasses(true)}>
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {mockClasses.slice(0, 3).map((classItem) => (
                <div key={classItem.id} className="mb-4 border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
                    <h3 className="font-semibold text-lg">{classItem.title}</h3>
                    <div className="flex mt-2 md:mt-0 space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePreQuiz(classItem)}
                      >
                        Pre-Quiz
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleViewClass(classItem)}
                      >
                        View Class
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-gray-500 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(classItem.scheduledFor)}</span>
                    </div>
                    {classItem.meetingUrl && (
                      <a 
                        href={classItem.meetingUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        <span>Join Meeting</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => setShowAllClasses(true)}
              >
                View Past Classes
              </Button>
            </CardContent>
          </Card>

          {/* Recent Classes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Recent Classes</CardTitle>
                <CardDescription>Access your recent class materials and notes</CardDescription>
              </div>
              <Button 
                variant="link" 
                className="font-medium" 
                onClick={() => setShowAllClasses(true)}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {mockClasses.slice(3, 4).map((classItem) => (
                <div key={classItem.id} className="mb-2">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{classItem.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">May 3, 2025, 09:00 pm</p>
                    </div>
                    <div className="flex mt-3 md:mt-0 space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewNotes(classItem)}
                      >
                        View Notes
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handlePostQuiz(classItem)}
                      >
                        Post Quiz
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-1 text-sm">
                    <span className="text-gray-600">Session Resources:</span>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="h-auto p-0 text-sm"
                      onClick={() => {
                        setSelectedClass(classItem);
                        setShowClassDetails(true);
                      }}
                    >
                      View All
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          {/* Performance Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Overall Quiz Score</span>
                  <span className="text-sm font-medium text-blue-600">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Class Participation</span>
                  <span className="text-sm font-medium text-blue-600">70%</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Resource Utilization</span>
                  <span className="text-sm font-medium text-blue-600">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => setShowAnalytics(true)}
              >
                View Detailed Analytics
              </Button>
            </CardContent>
          </Card>

          {/* Recommended Resources */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Recommended Resources</CardTitle>
              <Button 
                variant="link" 
                className="font-medium"
                onClick={() => setShowAllResources(true)}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedResources.map((resource) => (
                  <div key={resource.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-blue-600 font-medium">{resource.title}</h3>
                        <p className="text-sm text-gray-500">{resource.description}</p>
                        <p className="text-xs mt-1">
                          <span className="font-medium">For:</span> Data Structures
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => window.open(resource.url, '_blank')}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* All Modals */}
      {selectedClass && (
        <>
          <PreQuizModal 
            isOpen={showPreQuiz} 
            onClose={() => setShowPreQuiz(false)} 
            classId={selectedClass.id}
            className={selectedClass.title}
          />
          
          <PostQuizModal 
            isOpen={showPostQuiz} 
            onClose={() => setShowPostQuiz(false)} 
            classId={selectedClass.id}
            className={selectedClass.title}
          />
          
          <ClassDetailsModal 
            isOpen={showClassDetails} 
            onClose={() => setShowClassDetails(false)} 
            classItem={selectedClass} 
          />
          
          <NotesModal 
            isOpen={showNotes} 
            onClose={() => setShowNotes(false)} 
            classItem={selectedClass} 
          />
        </>
      )}
      
      <AllClassesModal 
        isOpen={showAllClasses} 
        onClose={() => setShowAllClasses(false)} 
        classes={mockClasses}
        onViewClass={handleViewClass}
        onPreQuiz={handlePreQuiz}
      />
      
      <AllResourcesModal 
        isOpen={showAllResources} 
        onClose={() => setShowAllResources(false)} 
        resources={recommendedResources}
      />
      
      <DetailedAnalyticsModal 
        isOpen={showAnalytics} 
        onClose={() => setShowAnalytics(false)} 
      />
    </div>
  );
};

export default Dashboard;
