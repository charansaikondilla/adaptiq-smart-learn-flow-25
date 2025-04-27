
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Student } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStatusColor } from "@/lib/utils";
import { User } from "lucide-react";
import ResponsiveDialog from "./ResponsiveDialog";
import StudentDetails from "./StudentDetails";

interface StudentAlertsProps {
  students: Student[];
  onViewAllClick: () => void;
}

const StudentAlerts: React.FC<StudentAlertsProps> = ({ students, onViewAllClick }) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Filter students who need attention (using status)
  const alertStudents = students.filter(
    (student) => student.status === "needs improvement" || student.status === "struggling"
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Student Alerts</h2>
        <Button variant="outline" onClick={onViewAllClick}>
          View All Students
        </Button>
      </div>

      {alertStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alertStudents.map((student) => (
            <Card key={student.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </span>
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(
                      student.status
                    )}`}
                  >
                    {student.status}
                  </span>
                </div>
                <CardDescription>
                  Overall Score: {student.overallScore}%
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Needs Help With:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {student.improvementAreas.map((area) => (
                        <span
                          key={area}
                          className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Session:</p>
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span>Score: {student.sessionPerformance[0]?.postQuizScore ?? "N/A"}%</span>
                      <span>Participation: {student.participation}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => setSelectedStudent(student)}
                >
                  View Student Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-6">
            <p className="text-muted-foreground">No students currently need attention.</p>
          </CardContent>
        </Card>
      )}

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

export default StudentAlerts;
