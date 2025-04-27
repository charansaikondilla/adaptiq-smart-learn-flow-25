
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from '@/lib/utils';

const RecentActivities: React.FC = () => {
  // Mock recent activities data
  const activities = [
    {
      id: '1',
      type: 'class_completed',
      description: 'Advanced Mathematics class completed',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      type: 'student_quiz',
      description: 'Emma Thompson completed post-quiz with 92%',
      date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      type: 'resource_added',
      description: 'Added 3 new resources to Physics Fundamentals',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '4',
      type: 'class_scheduled',
      description: 'Scheduled new class: Introduction to Calculus',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  // Function to get the appropriate icon for activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'class_completed':
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-800">
            ✓
          </div>
        );
      case 'student_quiz':
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800">
            Q
          </div>
        );
      case 'resource_added':
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-800">
            R
          </div>
        );
      case 'class_scheduled':
        return (
          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
            S
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-800">
            •
          </div>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map(activity => (
            <div key={activity.id} className="flex gap-4">
              {getActivityIcon(activity.type)}
              <div className="flex-1">
                <p className="text-sm">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{formatDate(activity.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
