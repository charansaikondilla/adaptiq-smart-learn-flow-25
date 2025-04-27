
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Class } from '@/types';
import { Calendar, Book, AlertCircle } from 'lucide-react';
import ClassDetailDialog from '@/components/class/ClassDetailDialog';
import { useToast } from '@/hooks/use-toast';
import CreateClassDialog from '@/components/class/CreateClassDialog';

// Mock classes for demo
const mockClasses: Class[] = [
  {
    id: '1',
    title: 'Introduction to Computer Science',
    description: 'Learn the fundamentals of computer science and programming.',
    teacherId: '1',
    createdAt: '2023-01-15T10:00:00Z',
    scheduledFor: '2025-05-01T14:00:00Z',
  },
  {
    id: '2',
    title: 'Advanced Mathematics',
    description: 'Explore complex mathematical concepts and their applications.',
    teacherId: '1',
    createdAt: '2023-02-10T09:30:00Z',
    scheduledFor: '2025-05-02T10:00:00Z',
  },
  {
    id: '3',
    title: 'Data Structures and Algorithms',
    description: 'Learn efficient data structures and algorithms for solving problems.',
    teacherId: '1',
    createdAt: '2023-03-05T11:15:00Z',
    scheduledFor: '2025-05-03T15:30:00Z',
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [upcomingClasses, setUpcomingClasses] = useState<Class[]>([]);
  const [recentClasses, setRecentClasses] = useState<Class[]>([]);

  useEffect(() => {
    // In a real app, we would fetch these from an API
    setUpcomingClasses(mockClasses.slice(0, 2));
    setRecentClasses([mockClasses[2]]);
  }, []);

  const handlePreQuiz = (classId: string) => {
    toast({
      title: "Quiz Loading",
      description: "Preparing your pre-class quiz...",
    });
  };

  const handlePostQuiz = (classId: string) => {
    toast({
      title: "Quiz Loading",
      description: "Preparing your post-class quiz...",
    });
  };

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
                      <p className="text-sm text-gray-500">
                        {new Date(cls.scheduledFor!).toLocaleString()}
                      </p>
                    </div>
                    <ClassDetailDialog 
                      classData={cls} 
                      triggerText="View Details" 
                      buttonVariant="outline"
                      buttonSize="sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost">
              <Link to="/classes">View All Classes</Link>
            </Button>
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
                <p className="text-lg font-medium text-adaptiq-600">85%</p>
                <p className="text-sm text-gray-500">Class Average</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-lg font-medium text-adaptiq-600">24</p>
                <p className="text-sm text-gray-500">Active Students</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-lg font-medium text-adaptiq-600">12</p>
                <p className="text-sm text-gray-500">Sessions Taken</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost">
              <Link to="/analytics">View Detailed Analytics</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" asChild>
              <CreateClassDialog />
            </Button>
            <Button className="w-full" variant="outline" asChild>
              <Link to="/resources">Manage Resources</Link>
            </Button>
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
                <span>New quiz submission from John D.</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Class notes generated for "Data Structures"</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span>5 students completed pre-class quiz</span>
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
                      <p className="text-sm text-gray-500">
                        {new Date(cls.scheduledFor!).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handlePreQuiz(cls.id)}>
                        Take Pre-Quiz
                      </Button>
                      <ClassDetailDialog 
                        classData={cls} 
                        triggerText="View Class" 
                        buttonSize="sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost">
              <Link to="/classes">View All Classes</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Classes</CardTitle>
            <CardDescription>Access your recent class materials and notes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClasses.map((cls) => (
                <div key={cls.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{cls.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(cls.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/notes`}>View Notes</Link>
                      </Button>
                      <Button size="sm" onClick={() => handlePostQuiz(cls.id)}>
                        Take Quiz
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
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
            <Button asChild variant="ghost">
              <Link to="/analytics">View Detailed Analytics</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recommended Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <Link to="/resources" className="text-sm font-medium text-adaptiq-600 hover:underline">
                  Understanding Big O Notation
                </Link>
                <p className="text-xs text-gray-500">Video • 15 min</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <Link to="/resources" className="text-sm font-medium text-adaptiq-600 hover:underline">
                  Introduction to Binary Search Trees
                </Link>
                <p className="text-xs text-gray-500">Article • 10 min read</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <Link to="/resources" className="text-sm font-medium text-adaptiq-600 hover:underline">
                  Practice Problems: Sorting Algorithms
                </Link>
                <p className="text-xs text-gray-500">Interactive • 5 exercises</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost">
              <Link to="/resources">View All Resources</Link>
            </Button>
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

      {user?.role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />}
    </div>
  );
};

export default Dashboard;
