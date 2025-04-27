
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Class, Student } from "@/types";
import StudentAlerts from "@/components/teacher/StudentAlerts";
import PastClassesList from "@/components/teacher/PastClassesList";
import RecentActivities from "@/components/teacher/RecentActivities";
import ClassCalendarView from "@/components/teacher/ClassCalendarView";
import ResponsiveDialog from "@/components/teacher/ResponsiveDialog";
import CreateClassForm from "@/components/teacher/CreateClassForm";
import AllStudentsView from "@/components/teacher/AllStudentsView";
import ClassAnalytics from "@/components/teacher/ClassAnalytics";

// Mock data
const mockClasses: Class[] = [
  {
    id: "1",
    title: "Introduction to Physics",
    description: "Fundamental concepts of physics including motion, energy and forces.",
    teacherId: "t1",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    scheduledFor: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    meetingUrl: "https://zoom.us/meeting1",
    resources: [
      {
        id: "r1",
        title: "Physics Fundamentals PDF",
        description: "Core concepts in introductory physics",
        url: "https://example.com/physics-pdf",
        type: "article",
        conceptIds: ["c1", "c2"],
      },
    ],
  },
  {
    id: "2",
    title: "Advanced Mathematics",
    description: "Complex mathematical concepts including calculus and linear algebra.",
    teacherId: "t1",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    scheduledFor: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    completed: true,
    resources: [],
  },
  {
    id: "3",
    title: "Chemistry Basics",
    description: "Introduction to atomic structure, periodic table and chemical reactions.",
    teacherId: "t1",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    scheduledFor: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    meetingUrl: "https://zoom.us/meeting3",
    resources: [],
  },
];

const mockStudents: Student[] = [
  {
    id: "s1",
    name: "Emma Thompson",
    overallScore: 78,
    participation: 85,
    status: "good",
    improvementAreas: ["Calculus", "Organic Chemistry"],
    strengthAreas: ["Classical Mechanics", "Algebra"],
    sessionPerformance: [
      {
        classId: "1",
        preQuizScore: 65,
        postQuizScore: 85,
        participation: 90,
      },
      {
        classId: "2",
        preQuizScore: 70,
        postQuizScore: 80,
        participation: 80,
      },
    ],
  },
  {
    id: "s2",
    name: "James Wilson",
    overallScore: 62,
    participation: 70,
    status: "needs improvement",
    improvementAreas: ["Physics", "Algebra"],
    strengthAreas: ["Biology", "Chemistry"],
    sessionPerformance: [
      {
        classId: "1",
        preQuizScore: 55,
        postQuizScore: 70,
        participation: 70,
      },
      {
        classId: "2",
        preQuizScore: 60,
        postQuizScore: 65,
        participation: 75,
      },
    ],
  },
  {
    id: "s3",
    name: "Sophia Garcia",
    overallScore: 45,
    participation: 55,
    status: "struggling",
    improvementAreas: ["Calculus", "Physics", "Chemistry"],
    strengthAreas: ["Literature"],
    sessionPerformance: [
      {
        classId: "1",
        preQuizScore: 40,
        postQuizScore: 55,
        participation: 50,
      },
      {
        classId: "2",
        preQuizScore: 45,
        postQuizScore: 50,
        participation: 60,
      },
    ],
  },
];

const TeacherDashboard: React.FC = () => {
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);
  const [isViewAllUpcomingClassesOpen, setIsViewAllUpcomingClassesOpen] = useState(false);
  const [isViewAllPastClassesOpen, setIsViewAllPastClassesOpen] = useState(false);
  const [isViewAllStudentsOpen, setIsViewAllStudentsOpen] = useState(false);
  const [isManageResourcesOpen, setIsManageResourcesOpen] = useState(false);
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const upcomingClasses = classes.filter(
    (classItem) => 
      !classItem.completed && new Date(classItem.scheduledFor) > new Date()
  );

  const pastClasses = classes.filter(
    (classItem) => 
      classItem.completed || new Date(classItem.scheduledFor) < new Date()
  );

  const handleCreateClass = (classData: any) => {
    const newClass: Class = {
      id: `class-${Date.now()}`,
      title: classData.title,
      description: classData.description,
      teacherId: "t1",
      createdAt: new Date().toISOString(),
      scheduledFor: classData.scheduledFor,
      meetingUrl: classData.meetingUrl,
      resources: classData.resources || [],
    };

    setClasses([...classes, newClass]);
    setIsCreateClassOpen(false);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
      </div>

      {/* Upcoming Classes Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Upcoming Classes</h2>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setIsViewAllUpcomingClassesOpen(true)}
            >
              View All Upcoming Classes
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsManageResourcesOpen(true)}
            >
              Manage Resources
            </Button>
            <Button onClick={() => setIsCreateClassOpen(true)}>
              Create New Class
            </Button>
          </div>
        </div>

        {upcomingClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingClasses.slice(0, 3).map((classItem) => (
              <div
                key={classItem.id}
                className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium mb-2">{classItem.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {new Date(classItem.scheduledFor).toLocaleDateString()} at{" "}
                  {new Date(classItem.scheduledFor).toLocaleTimeString()}
                </p>
                <p className="text-sm mb-4 line-clamp-2">{classItem.description}</p>
                
                {/* Display resources if available */}
                {classItem.resources && classItem.resources.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-1">Resources:</h4>
                    <ul className="text-sm space-y-1">
                      {classItem.resources.map(resource => (
                        <li key={resource.id} className="flex items-center">
                          <span className="truncate">{resource.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-2 border-t">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                  {classItem.meetingUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={classItem.meetingUrl} target="_blank" rel="noopener noreferrer">
                        Join Meeting
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-muted-foreground">No upcoming classes scheduled</p>
            <Button className="mt-4" onClick={() => setIsCreateClassOpen(true)}>
              Create New Class
            </Button>
          </div>
        )}
      </div>

      {/* Past Classes Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Past Classes</h2>
          <Button 
            variant="outline" 
            className="px-4"
            onClick={() => setIsViewAllPastClassesOpen(true)}
          >
            View All Past Classes
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Class Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Students</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Avg Score</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pastClasses.length > 0 ? (
                pastClasses.slice(0, 5).map((classItem) => (
                  <tr key={classItem.id}>
                    <td className="px-4 py-3 text-sm font-medium">{classItem.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(classItem.scheduledFor).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">25</td>
                    <td className="px-4 py-3 text-sm text-gray-500">78%</td>
                    <td className="px-4 py-3 text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          const classToView = classes.find(c => c.id === classItem.id);
                          if (classToView) {
                            setSelectedClass(classToView);
                          }
                        }}
                      >
                        View Analytics
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    No past classes found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Alerts & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StudentAlerts 
            students={mockStudents} 
            onViewAllClick={() => setIsViewAllStudentsOpen(true)}
          />
        </div>
        <div>
          <RecentActivities />
        </div>
      </div>

      {/* Dialogs */}
      <ResponsiveDialog
        isOpen={isCreateClassOpen}
        onClose={() => setIsCreateClassOpen(false)}
        title="Create New Class"
        description="Add details for your new class session."
      >
        <CreateClassForm
          onSubmit={handleCreateClass}
          onCancel={() => setIsCreateClassOpen(false)}
        />
      </ResponsiveDialog>

      <ResponsiveDialog
        isOpen={isViewAllUpcomingClassesOpen}
        onClose={() => setIsViewAllUpcomingClassesOpen(false)}
        title="All Upcoming Classes"
        maxWidth="max-w-5xl"
      >
        <div className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button onClick={() => setIsCreateClassOpen(true)}>
              Create New Class
            </Button>
          </div>
          <ClassCalendarView classes={upcomingClasses} />
        </div>
      </ResponsiveDialog>

      <ResponsiveDialog
        isOpen={isViewAllPastClassesOpen}
        onClose={() => setIsViewAllPastClassesOpen(false)}
        title="All Past Classes"
        maxWidth="max-w-5xl"
      >
        <div className="space-y-4">
          <PastClassesList classes={pastClasses} />
        </div>
      </ResponsiveDialog>

      <ResponsiveDialog
        isOpen={isViewAllStudentsOpen}
        onClose={() => setIsViewAllStudentsOpen(false)}
        title="All Students"
        maxWidth="max-w-5xl"
      >
        <AllStudentsView students={mockStudents} classes={classes} />
      </ResponsiveDialog>

      {/* Manage Resources Dialog */}
      <ResponsiveDialog
        isOpen={isManageResourcesOpen}
        onClose={() => setIsManageResourcesOpen(false)}
        title="Manage Resources"
        maxWidth="max-w-4xl"
      >
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Class Resources</h3>
          
          {classes.map((classItem) => (
            <div key={classItem.id} className="border rounded-lg p-4">
              <h4 className="font-medium text-lg mb-2">{classItem.title}</h4>
              <p className="text-sm text-gray-500 mb-4">
                {new Date(classItem.scheduledFor).toLocaleDateString()}
              </p>
              
              {classItem.resources && classItem.resources.length > 0 ? (
                <div>
                  <h5 className="font-medium text-sm mb-2">Resources:</h5>
                  <ul className="space-y-2">
                    {classItem.resources.map((resource) => (
                      <li key={resource.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">{resource.title}</p>
                          <p className="text-xs text-muted-foreground">{resource.type}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-red-500">Remove</Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No resources have been added for this class.</p>
              )}
              
              <div className="mt-4 pt-3 border-t flex justify-end">
                <Button variant="outline" size="sm">
                  Add Resources
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ResponsiveDialog>
    </div>
  );
};

export default TeacherDashboard;
