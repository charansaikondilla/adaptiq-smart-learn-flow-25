
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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface DetailedAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data for concept mastery chart
const conceptMasteryData = [
  { name: "Programming Basics", value: 85 },
  { name: "Data Structures", value: 65 },
  { name: "Algorithms", value: 78 },
  { name: "Mathematics", value: 52 },
  { name: "Database Design", value: 60 },
  { name: "OOP Concepts", value: 72 }
];

// Mock data for quiz performance chart
const quizPerformanceData = [
  { name: "CS Fundamentals", pre: 65, post: 85 },
  { name: "Data Structures", pre: 55, post: 75 },
  { name: "Algorithms", pre: 60, post: 82 },
  { name: "OOP Concepts", pre: 58, post: 79 }
];

// Learning improvement areas
const improvementAreas = [
  {
    area: "Data Structures",
    description: "Your quiz performance indicates you may benefit from additional practice with tree and graph structures."
  },
  {
    area: "Mathematics",
    description: "Consider revisiting calculus concepts, particularly integration techniques."
  }
];

const DetailedAnalyticsModal: React.FC<DetailedAnalyticsModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detailed Analytics</DialogTitle>
          <DialogDescription>
            View your detailed learning progress and performance
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {/* Top metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-sm text-gray-500 mb-1">Overall Score</h3>
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-sm text-gray-500 mb-1">Class Participation</h3>
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold">65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-sm text-gray-500 mb-1">Quiz Improvement</h3>
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold text-green-600">+25%</span>
                <span className="text-xs text-gray-500">Average pre-to-post improvement</span>
              </div>
              <Progress value={25} className="h-2 bg-green-100" />
            </div>
          </div>
          
          <Tabs defaultValue="overall" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overall">Overall Analytics</TabsTrigger>
              <TabsTrigger value="session">Session Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overall" className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Concept Mastery</h3>
                <p className="text-sm text-gray-500 mb-4">Your understanding of different course concepts</p>
                <div className="h-[300px] bg-white border rounded-lg p-4">
                  <ChartContainer
                    config={{
                      bar: {
                        color: "#2563eb"
                      }
                    }}
                  >
                    <BarChart data={conceptMasteryData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }} 
                        angle={-45}
                        textAnchor="end"
                        height={70}
                      />
                      <YAxis 
                        tickFormatter={(value) => `${value}%`} 
                        domain={[0, 100]}
                      />
                      <ChartTooltip 
                        formatter={(value) => `${value}%`}
                        labelStyle={{ color: "#111827" }}
                      />
                      <Bar dataKey="value" name="Mastery" fill="var(--color-bar)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Areas for Improvement</h3>
                <p className="text-sm text-gray-500 mb-4">Topics where additional focus would be beneficial</p>
                <div className="space-y-4">
                  {improvementAreas.map((area, idx) => (
                    <div key={idx} className="bg-white p-4 border rounded-lg">
                      <h4 className="font-medium mb-1">{area.area}</h4>
                      <p className="text-sm text-gray-600">{area.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="session" className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Quiz Performance</h3>
                <p className="text-sm text-gray-500 mb-4">Your pre and post quiz scores</p>
                <div className="h-[300px] bg-white border rounded-lg p-4">
                  <ChartContainer
                    config={{
                      pre: {
                        color: "#818cf8"
                      },
                      post: {
                        color: "#2563eb"
                      }
                    }}
                  >
                    <LineChart data={quizPerformanceData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                      <XAxis dataKey="name" />
                      <YAxis 
                        tickFormatter={(value) => `${value}%`} 
                        domain={[0, 100]}
                      />
                      <ChartTooltip />
                      <Line type="monotone" dataKey="pre" name="Pre-Quiz" stroke="var(--color-pre)" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="post" name="Post-Quiz" stroke="var(--color-post)" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ChartContainer>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Session Engagement</h3>
                <p className="text-sm text-gray-500 mb-4">Your participation and engagement metrics</p>
                <div className="space-y-4">
                  <div className="bg-white p-4 border rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Questions Asked</span>
                      <span className="text-sm font-medium">5 questions</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">You ask more questions than 65% of peers</p>
                  </div>
                  
                  <div className="bg-white p-4 border rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Discussion Participation</span>
                      <span className="text-sm font-medium">12 contributions</span>
                    </div>
                    <Progress value={78} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">You participate more than 78% of peers</p>
                  </div>
                  
                  <div className="bg-white p-4 border rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Resource Utilization</span>
                      <span className="text-sm font-medium">8 of 12 resources</span>
                    </div>
                    <Progress value={67} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">You've accessed 67% of available resources</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={onClose}>Download Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailedAnalyticsModal;
