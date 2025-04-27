
import React, { useState } from "react";
import { formatDate } from "@/lib/utils";
import { Class } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import ResponsiveDialog from "./ResponsiveDialog";
import ClassAnalytics from "./ClassAnalytics";

interface PastClassesListProps {
  classes: Class[];
}

const PastClassesList: React.FC<PastClassesListProps> = ({ classes }) => {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  
  // Past classes are those with completed=true or date in the past
  const pastClasses = classes.filter(
    (classItem) => 
      classItem.completed || new Date(classItem.scheduledFor) < new Date()
  );

  const handleViewAnalytics = (classItem: Class) => {
    setSelectedClass(classItem);
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Average Score</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pastClasses.length > 0 ? (
              pastClasses.map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell className="font-medium">{classItem.title}</TableCell>
                  <TableCell>{formatDate(classItem.scheduledFor)}</TableCell>
                  <TableCell>25</TableCell>
                  <TableCell>78%</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleViewAnalytics(classItem)}
                    >
                      <Eye className="h-4 w-4" />
                      View Analytics
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No past classes found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedClass && (
        <ResponsiveDialog
          isOpen={!!selectedClass}
          onClose={() => setSelectedClass(null)}
          title={`Analytics: ${selectedClass.title}`}
          maxWidth="max-w-4xl"
        >
          <ClassAnalytics classData={selectedClass} />
        </ResponsiveDialog>
      )}
    </div>
  );
};

export default PastClassesList;
