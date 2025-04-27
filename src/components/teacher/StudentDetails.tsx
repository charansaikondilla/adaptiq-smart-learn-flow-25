
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
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-medium">Overall Score</p>
                    <p className="text-sm font-medium">{student.overallScore}%</p>
                  </div>
                  <Progress value={student.overallScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-medium">Participation</p>
                    <p className="text-sm font-medium">{student.participation}%</p>
                  </div>
                  <Progress value={student.participation} className="h-2" />
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
                  <p className="text-sm font-medium mb-2">Strengths</p>
                  <div className="flex flex-wrap gap-2">
                    {student.strengthAreas.map((area) => (
                      <Badge key={area} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Needs Improvement</p>
                  <div className="flex flex-wrap gap-2">
                    {student.improvementAreas.map((area) => (
                      <Badge key={area} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        {area}
                      </Badge>
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
                        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                          {session.participation}% participation
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-xs font-medium mb-1">Pre-Quiz Score</p>
                          <Progress value={session.preQuizScore} className="h-2" />
                          <p className="text-xs mt-1 text-right">{session.preQuizScore}%</p>
                        </div>
                        
                        <div>
                          <p className="text-xs font-medium mb-1">Post-Quiz Score</p>
                          <Progress value={session.postQuizScore} className="h-2" />
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
