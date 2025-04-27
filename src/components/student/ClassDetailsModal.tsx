
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ExternalLink, User, Book } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Class } from "@/types";

interface ClassDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  classItem: Class;
}

const ClassDetailsModal: React.FC<ClassDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  classItem 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `May ${date.getDate()}, ${date.getFullYear()}`;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }).replace(' ', '').toLowerCase();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{classItem.title}</DialogTitle>
          <DialogDescription>
            Class details and resources
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium text-lg mb-2">Session Info</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>{formatDate(classItem.scheduledFor || classItem.createdAt)}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span>{formatTime(classItem.scheduledFor || classItem.createdAt)}</span>
              </div>
              <div className="flex items-center text-sm">
                <User className="h-4 w-4 mr-2 text-gray-500" />
                <span>Professor Smith</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Description</h3>
            <p className="text-sm text-gray-700">{classItem.description}</p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Resources</h3>
            <div className="space-y-2">
              {classItem.resources && classItem.resources.length > 0 ? (
                classItem.resources.map((resource) => (
                  <div key={resource.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <Book className="h-4 w-4 mr-2 text-blue-600" />
                      <div>
                        <p className="font-medium text-sm">{resource.title}</p>
                        <p className="text-xs text-gray-500">{resource.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {resource.type}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No resources available for this class.</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="space-x-2">
          {classItem.meetingUrl && (
            <Button 
              variant="default" 
              className="flex items-center" 
              onClick={() => window.open(classItem.meetingUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Join Session
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClassDetailsModal;
