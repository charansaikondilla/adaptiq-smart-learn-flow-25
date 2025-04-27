
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, FileText, Link } from 'lucide-react';
import { Class } from '@/types';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

interface ClassDetailProps {
  classData: Class;
  showResources?: boolean;
}

const ClassDetail: React.FC<ClassDetailProps> = ({ classData, showResources = true }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{classData.title}</span>
          <Badge variant={classData.videoUrl ? "secondary" : "default"}>
            {classData.videoUrl ? "Completed" : "Upcoming"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-adaptiq-600" />
            <span className="text-sm">
              {formatDate(classData.scheduledFor || classData.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-adaptiq-600" />
            <span className="text-sm">
              {new Date(classData.scheduledFor || classData.createdAt).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-1">Description</h3>
          <p className="text-sm text-gray-600">{classData.description}</p>
        </div>

        {showResources && (
          <div>
            <h3 className="text-sm font-medium mb-2">Resources</h3>
            <div className="space-y-2">
              <div className="flex items-center p-2 rounded-md bg-gray-50 hover:bg-gray-100">
                <FileText className="h-4 w-4 mr-2 text-adaptiq-600" />
                <span className="text-sm">Class Slides</span>
                <Button variant="ghost" size="sm" className="ml-auto p-0 h-auto">
                  <Link className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center p-2 rounded-md bg-gray-50 hover:bg-gray-100">
                <FileText className="h-4 w-4 mr-2 text-adaptiq-600" />
                <span className="text-sm">Additional Reading</span>
                <Button variant="ghost" size="sm" className="ml-auto p-0 h-auto">
                  <Link className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClassDetail;
