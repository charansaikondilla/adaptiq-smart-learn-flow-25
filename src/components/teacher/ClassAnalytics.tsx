
import React from "react";
import { Class } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ClassAnalyticsProps {
  classData: Class;
}

const ClassAnalytics: React.FC<ClassAnalyticsProps> = ({ classData }) => {
  // Mock data for the analytics
  const mockStudents = [
    {
      id: "1",
      name: "Emma Thompson",
      preQuizScore: 65,
      postQuizScore: 85,
      participation: 95,
      improvementAreas: ["Concept A", "Concept B"],
      strengthAreas: ["Concept C", "Concept D"],
    },
    {
      id: "2",
      name: "James Wilson",
      preQuizScore: 70,
      postQuizScore: 90,
      participation: 85,
      improvementAreas: ["Concept B"],
      strengthAreas: ["Concept A", "Concept C"],
    },
    {
      id: "3",
      name: "Sophia Garcia",
      preQuizScore: 55,
      postQuizScore: 75,
      participation: 90,
      improvementAreas: ["Concept D"],
      strengthAreas: ["Concept B"],
    },
  ];

  return (
    <div className="space-y-4">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Class Overview</TabsTrigger>
          <TabsTrigger value="students">Student Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Pre-Quiz Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    mockStudents.reduce(
                      (acc, student) => acc + student.preQuizScore,
                      0
                    ) / mockStudents.length
                  )}
                  %
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Post-Quiz Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    mockStudents.reduce(
                      (acc, student) => acc + student.postQuizScore,
                      0
                    ) / mockStudents.length
                  )}
                  %
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">
                  {Math.round(
                    mockStudents.reduce(
                      (acc, student) =>
                        acc + (student.postQuizScore - student.preQuizScore),
                      0
                    ) / mockStudents.length
                  )}
                  %
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Class Resources</CardTitle>
              <CardDescription>
                Resources shared with students for this class
              </CardDescription>
            </CardHeader>
            <CardContent>
              {classData.resources && classData.resources.length > 0 ? (
                <ul className="space-y-2">
                  {classData.resources.map((resource) => (
                    <li key={resource.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{resource.title}</p>
                        <p className="text-xs text-muted-foreground">{resource.description}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                        {resource.type}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No resources have been added to this class.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Performance</CardTitle>
              <CardDescription>
                Individual performance metrics for students in this class
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                  {mockStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.preQuizScore}%</TableCell>
                      <TableCell>{student.postQuizScore}%</TableCell>
                      <TableCell className="text-green-500">
                        +{student.postQuizScore - student.preQuizScore}%
                      </TableCell>
                      <TableCell>{student.participation}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Concept Mastery</CardTitle>
              <CardDescription>
                Analysis of concept understanding across the class
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Strong Concepts</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Concept A (85%)
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Concept C (82%)
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Needs Improvement</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                      Concept B (65%)
                    </span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                      Concept D (58%)
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassAnalytics;
