
import React, { useState } from "react";
import { Student, Class } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { getStatusColor } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";
import ResponsiveDialog from "./ResponsiveDialog";
import StudentDetails from "./StudentDetails";

interface AllStudentsViewProps {
  students: Student[];
  classes: Class[];
}

const AllStudentsView: React.FC<AllStudentsViewProps> = ({ students, classes }) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <Input 
          placeholder="Search students..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Students Overview</TabsTrigger>
          <TabsTrigger value="performance">Session Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Overall Score</TableHead>
                  <TableHead>Participation</TableHead>
                  <TableHead>Improvement Areas</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(
                          student.status
                        )}`}
                      >
                        {student.status}
                      </span>
                    </TableCell>
                    <TableCell>{student.overallScore}%</TableCell>
                    <TableCell>{student.participation}%</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {student.improvementAreas.slice(0, 2).map((area) => (
                          <span
                            key={area}
                            className="px-1 py-0.5 bg-red-100 text-red-800 rounded text-xs"
                          >
                            {area}
                          </span>
                        ))}
                        {student.improvementAreas.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{student.improvementAreas.length - 2} more
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <Eye className="h-4 w-4 mr-1" /> View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="space-y-6">
            {classes
              .filter(classItem => classItem.completed || new Date(classItem.scheduledFor) < new Date())
              .slice(0, 5)
              .map((classItem, index) => (
                <div key={classItem.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b">
                    <h3 className="font-medium">{classItem.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(classItem.scheduledFor).toLocaleDateString()}
                    </p>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Pre-Quiz</TableHead>
                        <TableHead>Post-Quiz</TableHead>
                        <TableHead>Improvement</TableHead>
                        <TableHead>Participation</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map(student => {
                        const sessionData = student.sessionPerformance.find(
                          session => session.classId === classItem.id
                        ) || student.sessionPerformance[index % student.sessionPerformance.length];
                        
                        return (
                          <TableRow key={`${classItem.id}-${student.id}`}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>{sessionData.preQuizScore}%</TableCell>
                            <TableCell>{sessionData.postQuizScore}%</TableCell>
                            <TableCell className="text-green-600">
                              +{sessionData.postQuizScore - sessionData.preQuizScore}%
                            </TableCell>
                            <TableCell>{sessionData.participation}%</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedStudent && (
        <ResponsiveDialog
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Student Details: ${selectedStudent.name}`}
          maxWidth="max-w-4xl"
        >
          <StudentDetails student={selectedStudent} />
        </ResponsiveDialog>
      )}
    </div>
  );
};

export default AllStudentsView;
