
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Class } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ClassDetailDialog from '@/components/class/ClassDetailDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import CreateClassDialog from '@/components/class/CreateClassDialog';
import { formatDate } from '@/lib/utils';

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
  {
    id: '4',
    title: 'Web Development Fundamentals',
    description: 'Introduction to HTML, CSS, and JavaScript for web development.',
    teacherId: '1',
    createdAt: '2023-04-10T13:00:00Z',
    scheduledFor: '2025-05-04T11:00:00Z',
    meetingUrl: 'https://meet.zoom.us/j/123456789',
  },
  {
    id: '5',
    title: 'Machine Learning Basics',
    description: 'Introduction to machine learning concepts and applications.',
    teacherId: '1',
    createdAt: '2023-05-15T09:00:00Z',
    scheduledFor: '2025-05-05T15:00:00Z',
    meetingUrl: 'https://meet.google.com/xyz-abcd-efg',
    videoUrl: 'https://video-archive.com/ml-basics',
  },
];

const Classes = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [classes, setClasses] = useState<Class[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'list' | 'calendar'>('list');

  useEffect(() => {
    // In a real app, we would fetch these from an API
    setClasses(mockClasses);
  }, []);

  const handlePreQuiz = (classId: string) => {
    toast({
      title: "Quiz Loading",
      description: "Preparing your pre-class quiz...",
    });
  };

  const isTeacher = user?.role === 'teacher';

  const ListViewSection = () => (
    <div className="space-y-6">
      {classes.map((cls) => (
        <Card key={cls.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="bg-adaptive-accent p-4 md:p-6 flex flex-col justify-center items-center md:w-1/5">
                <span className="text-2xl font-bold">
                  {new Date(cls.scheduledFor || cls.createdAt).getDate()}
                </span>
                <span className="text-sm">
                  {new Date(cls.scheduledFor || cls.createdAt).toLocaleDateString(undefined, { month: 'short' })}
                </span>
                <span className="text-sm text-gray-600 mt-1">
                  {new Date(cls.scheduledFor || cls.createdAt).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center w-full">
                <div>
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-medium mr-2">{cls.title}</h3>
                    <Badge variant={cls.videoUrl ? "secondary" : "default"}>
                      {cls.videoUrl ? "Completed" : "Upcoming"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 md:mb-0">{cls.description}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
                  {!isTeacher && !cls.videoUrl && (
                    <Button variant="outline" size="sm" onClick={() => handlePreQuiz(cls.id)}>
                      Take Pre-Quiz
                    </Button>
                  )}
                  <ClassDetailDialog 
                    classData={cls} 
                    triggerText={isTeacher ? "View Details" : "View Class"} 
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const CalendarViewSection = () => (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="icon" onClick={() => {
          const prevMonth = new Date(date!);
          prevMonth.setMonth(prevMonth.getMonth() - 1);
          setDate(prevMonth);
        }}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-lg font-medium">
          {date?.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
        </h3>
        <Button variant="outline" size="icon" onClick={() => {
          const nextMonth = new Date(date!);
          nextMonth.setMonth(nextMonth.getMonth() + 1);
          setDate(nextMonth);
        }}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      <div className="mt-6">
        <h4 className="text-sm font-medium mb-2">Classes on {formatDate(date?.toISOString() || new Date().toISOString())}</h4>
        <div className="space-y-2">
          {classes
            .filter(cls => {
              const classDate = new Date(cls.scheduledFor || cls.createdAt);
              return (
                classDate.getDate() === date?.getDate() &&
                classDate.getMonth() === date?.getMonth() &&
                classDate.getFullYear() === date?.getFullYear()
              );
            })
            .map(cls => (
              <Card key={cls.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-medium">{cls.title}</h5>
                    <p className="text-sm text-gray-600">
                      {new Date(cls.scheduledFor || cls.createdAt).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  <ClassDetailDialog 
                    classData={cls} 
                    triggerText={isTeacher ? "View Details" : "View Class"} 
                    buttonVariant="secondary"
                  />
                </div>
              </Card>
            ))}
          {classes.filter(cls => {
            const classDate = new Date(cls.scheduledFor || cls.createdAt);
            return (
              classDate.getDate() === date?.getDate() &&
              classDate.getMonth() === date?.getMonth() &&
              classDate.getFullYear() === date?.getFullYear()
            );
          }).length === 0 && (
            <p className="text-sm text-gray-500 text-center p-4">No classes scheduled for this day</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Classes</h1>
          <p className="text-gray-600">
            {isTeacher ? 'Manage your scheduled classes' : 'View your enrolled classes'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            onClick={() => setView('list')}
          >
            List View
          </Button>
          <Button
            variant={view === 'calendar' ? 'default' : 'outline'}
            onClick={() => setView('calendar')}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Calendar
          </Button>
          {isTeacher && (
            <CreateClassDialog />
          )}
        </div>
      </div>

      {view === 'list' ? <ListViewSection /> : <CalendarViewSection />}
    </div>
  );
};

export default Classes;
