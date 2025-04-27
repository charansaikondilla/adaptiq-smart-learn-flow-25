
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ExternalLink } from "lucide-react";
import { Class } from "@/types";
import { Input } from "@/components/ui/input";

interface AllClassesModalProps {
  isOpen: boolean;
  onClose: () => void;
  classes: Class[];
  onViewClass: (classItem: Class) => void;
  onPreQuiz: (classItem: Class) => void;
}

// Extend mock classes with more items for the view all display
const additionalMockClasses: Class[] = [
  {
    id: '5',
    title: 'Mobile App Development',
    description: 'Learn to build native mobile applications for iOS and Android',
    teacherId: '2',
    createdAt: '2023-04-15T10:00:00Z',
    scheduledFor: '2025-05-08T03:30:00Z',
    meetingUrl: 'https://meet.google.com/mno-pqrs-tuv',
    resources: []
  },
  {
    id: '6',
    title: 'Cloud Computing Fundamentals',
    description: 'Introduction to cloud computing concepts and services',
    teacherId: '1',
    createdAt: '2023-04-20T10:00:00Z',
    scheduledFor: '2025-05-10T07:30:00Z',
    meetingUrl: 'https://meet.google.com/wxy-zabc-def',
    resources: []
  },
  {
    id: '7',
    title: 'Cybersecurity Essentials',
    description: 'Learn fundamental cybersecurity concepts and practices',
    teacherId: '3',
    createdAt: '2023-05-01T10:00:00Z',
    scheduledFor: '2025-05-15T03:30:00Z',
    meetingUrl: 'https://meet.google.com/ghi-jklm-nop',
    resources: []
  }
];

const AllClassesModal: React.FC<AllClassesModalProps> = ({ 
  isOpen, 
  onClose, 
  classes,
  onViewClass,
  onPreQuiz
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const allClasses = [...classes, ...additionalMockClasses];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `May ${date.getDate()}, ${date.getFullYear()}, ${date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }).replace(' ', '').toLowerCase()}`;
  };
  
  // Filter classes based on search term
  const filteredClasses = allClasses.filter(classItem => 
    classItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classItem.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Split classes into upcoming and past
  const upcomingClasses = filteredClasses.filter(classItem => !classItem.completed);
  const pastClasses = filteredClasses.filter(classItem => classItem.completed);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>All Classes</DialogTitle>
          <DialogDescription>
            Browse all your upcoming and past classes
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Input 
            placeholder="Search classes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          
          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming Classes</TabsTrigger>
              <TabsTrigger value="past">Past Classes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-4 space-y-4">
              {upcomingClasses.length > 0 ? (
                upcomingClasses.map((classItem) => (
                  <div key={classItem.id} className="border rounded-md p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{classItem.title}</h3>
                      <div className="flex mt-2 md:mt-0 space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onPreQuiz(classItem)}
                        >
                          Pre-Quiz
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => onViewClass(classItem)}
                        >
                          View Class
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{classItem.description}</p>
                    <div className="flex items-center justify-between text-gray-500 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(classItem.scheduledFor || classItem.createdAt)}</span>
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
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No upcoming classes found
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past" className="mt-4 space-y-4">
              {pastClasses.length > 0 ? (
                pastClasses.map((classItem) => (
                  <div key={classItem.id} className="border rounded-md p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{classItem.title}</h3>
                      <div className="flex mt-2 md:mt-0 space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onViewClass(classItem)}
                        >
                          View Notes
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                        >
                          Post Quiz
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{classItem.description}</p>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(classItem.scheduledFor || classItem.createdAt)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No past classes found
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AllClassesModal;
