
import React from "react";
import { Student } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";

interface StudentDetailsProps {
  student: Student;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ student }) => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
                <CardDescription>Overall performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Overall Score</p>
                  <div className="mt-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${student.overallScore}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-sm text-right">
                    {student.overallScore}%
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Participation</p>
                  <div className="mt-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${student.participation}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-sm text-right">
                    {student.participation}%
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Areas of Focus</CardTitle>
                <CardDescription>Strengths and improvement areas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Strengths</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {student.strengthAreas.map((area) => (
                      <span key={area} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Needs Improvement</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {student.improvementAreas.map((area) => (
                      <span key={area} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle>Session Performance</CardTitle>
              <CardDescription>Performance across different classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.sessionPerformance.map((session, index) => {
                  const mockDate = new Date();
                  mockDate.setDate(mockDate.getDate() - (index * 7));
                  
                  return (
                    <div key={session.classId} className="p-3 border rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">Class #{index + 1}</h4>
                          <p className="text-xs text-muted-foreground">{formatDate(mockDate.toISOString())}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {session.participation}% participation
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-xs font-medium mb-1">Pre-Quiz Score</p>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400"
                              style={{ width: `${session.preQuizScore}%` }}
                            ></div>
                          </div>
                          <p className="text-xs mt-1 text-right">{session.preQuizScore}%</p>
                        </div>
                        
                        <div>
                          <p className="text-xs font-medium mb-1">Post-Quiz Score</p>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500"
                              style={{ width: `${session.postQuizScore}%` }}
                            ></div>
                          </div>
                          <p className="text-xs mt-1 text-right">{session.postQuizScore}%</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDetails;
