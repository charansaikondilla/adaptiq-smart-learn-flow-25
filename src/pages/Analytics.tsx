
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BadgeAlert, Check, ChevronDown, Users, Info } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

// Mock data for student performance
const studentPerformanceData = [
  { name: 'John D.', preQuiz: 65, postQuiz: 85, improvement: 20 },
  { name: 'Sarah M.', preQuiz: 72, postQuiz: 90, improvement: 18 },
  { name: 'David L.', preQuiz: 45, postQuiz: 62, improvement: 17 },
  { name: 'Emma W.', preQuiz: 80, postQuiz: 95, improvement: 15 },
  { name: 'Michael R.', preQuiz: 58, postQuiz: 71, improvement: 13 },
  { name: 'Jessica P.', preQuiz: 62, postQuiz: 73, improvement: 11 },
  { name: 'Robert K.', preQuiz: 70, postQuiz: 78, improvement: 8 },
  { name: 'Linda T.', preQuiz: 53, postQuiz: 59, improvement: 6 },
];

// Mock data for concept mastery
const conceptMasteryData = [
  { concept: 'Variables & Data Types', mastery: 85 },
  { concept: 'Control Flow', mastery: 72 },
  { concept: 'Functions', mastery: 78 },
  { concept: 'Arrays & Objects', mastery: 65 },
  { concept: 'DOM Manipulation', mastery: 58 },
  { concept: 'Event Handling', mastery: 69 },
];

// Mock data for student progress over time
const progressTrendData = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 68 },
  { month: 'Mar', score: 72 },
  { month: 'Apr', score: 75 },
  { month: 'May', score: 79 },
  { month: 'Jun', score: 82 },
];

// Mock alerts for teacher
const teacherAlerts = [
  {
    id: 1,
    student: 'David L.',
    message: 'Struggling with Arrays & Objects concepts, score below 60%',
    severity: 'warning',
  },
  {
    id: 2,
    student: 'Emma W.',
    message: 'Excellent progress in all recent assessments, consistently above 90%',
    severity: 'success',
  },
  {
    id: 3,
    student: 'Linda T.',
    message: 'Limited improvement between pre and post quizzes (only 6% increase)',
    severity: 'warning',
  },
];

// Student-specific analytics data
const studentAnalyticsData = {
  conceptMastery: [
    { concept: 'Variables & Data Types', mastery: 92 },
    { concept: 'Control Flow', mastery: 85 },
    { concept: 'Functions', mastery: 78 },
    { concept: 'Arrays & Objects', mastery: 65 },
    { concept: 'DOM Manipulation', mastery: 70 },
    { concept: 'Event Handling', mastery: 82 },
  ],
  recentQuizzes: [
    { class: 'Introduction to JavaScript', preQuiz: 72, postQuiz: 85 },
    { class: 'Advanced CSS Techniques', preQuiz: 65, postQuiz: 81 },
    { class: 'Responsive Web Design', preQuiz: 80, postQuiz: 90 },
    { class: 'Git & Version Control', preQuiz: 68, postQuiz: 75 },
  ],
  improvementAreas: [
    'Arrays & Objects',
    'DOM Manipulation',
  ],
  strengthAreas: [
    'Variables & Data Types',
    'Control Flow',
    'Event Handling',
  ],
  classParticipation: 80,
};

const Analytics = () => {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';
  const [expandedAlerts, setExpandedAlerts] = useState<number[]>([]);

  const toggleAlert = (id: number) => {
    if (expandedAlerts.includes(id)) {
      setExpandedAlerts(expandedAlerts.filter(alertId => alertId !== id));
    } else {
      setExpandedAlerts([...expandedAlerts, id]);
    }
  };

  const TeacherAnalytics = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Class Average</CardTitle>
            <CardDescription>Overall performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-3xl font-bold text-adaptiq-600">78%</div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded ml-2">
                +12% from pre-quiz
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Students</CardTitle>
            <CardDescription>Quiz participation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-adaptiq-600">24/28</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Sessions Completed</CardTitle>
            <CardDescription>Total classes held</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-adaptiq-600">12</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Performance</CardTitle>
          <CardDescription>Pre-quiz vs. Post-quiz scores</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={studentPerformanceData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="preQuiz" name="Pre-Quiz" fill="#9b87f5" />
              <Bar dataKey="postQuiz" name="Post-Quiz" fill="#7E69AB" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Concept Mastery</CardTitle>
            <CardDescription>Average understanding by topic</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                layout="vertical"
                data={conceptMasteryData}
                margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="concept" type="category" width={150} />
                <Tooltip />
                <Bar dataKey="mastery" name="Mastery %" fill="#9b87f5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Student Alerts</CardTitle>
            <CardDescription>Performance highlights and concerns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teacherAlerts.map(alert => (
                <Alert 
                  key={alert.id}
                  variant={alert.severity === 'warning' ? 'destructive' : 'default'}
                  className="cursor-pointer"
                  onClick={() => toggleAlert(alert.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-2">
                      {alert.severity === 'warning' ? 
                        <BadgeAlert className="h-5 w-5 text-destructive" /> : 
                        <Check className="h-5 w-5 text-green-600" />
                      }
                      <div>
                        <AlertTitle className="mb-1">{alert.student}</AlertTitle>
                        <AlertDescription>{alert.message}</AlertDescription>
                        {expandedAlerts.includes(alert.id) && (
                          <div className="mt-2 p-2 bg-gray-50 text-sm rounded">
                            <p>Recommended action: {alert.severity === 'warning' ? 
                              'Schedule additional review session or provide targeted resources.' : 
                              'Consider assigning more advanced content to maintain engagement.'}
                            </p>
                            <Button variant="outline" size="sm" className="mt-2">
                              {alert.severity === 'warning' ? 'Send Resources' : 'Assign Advanced Content'}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedAlerts.includes(alert.id) ? 'rotate-180' : ''}`} />
                  </div>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const StudentAnalytics = () => (
    <div className="space-y-8">
      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="quizzes">Quiz Results</TabsTrigger>
          <TabsTrigger value="concepts">Concept Mastery</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Overall Progress</CardTitle>
                <CardDescription>Your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress this semester</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-adaptiq-500 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Class Participation</span>
                      <span className="font-medium">{studentAnalyticsData.classParticipation}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-adaptiq-500 rounded-full" style={{ width: `${studentAnalyticsData.classParticipation}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Quiz Completion</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-adaptiq-500 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Strength Areas</CardTitle>
                <CardDescription>Topics you excel in</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {studentAnalyticsData.strengthAreas.map((area, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{area}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Improvement Areas</CardTitle>
                <CardDescription>Focus on these topics</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {studentAnalyticsData.improvementAreas.map((area, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-amber-500" />
                      <span className="text-sm">{area}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Progress Trend</CardTitle>
              <CardDescription>Your performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={progressTrendData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[50, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" name="Score %" stroke="#9b87f5" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recommended Resources</CardTitle>
              <CardDescription>Based on your performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentAnalyticsData.improvementAreas.map((area, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">{area}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Button variant="outline" className="justify-start">
                        <Info className="h-4 w-4 mr-2" />
                        Interactive Tutorial
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Info className="h-4 w-4 mr-2" />
                        Practice Exercises
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quizzes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Quiz Results</CardTitle>
              <CardDescription>Pre and post quiz performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={studentAnalyticsData.recentQuizzes}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="class" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="preQuiz" name="Pre-Quiz" fill="#9b87f5" />
                  <Bar dataKey="postQuiz" name="Post-Quiz" fill="#7E69AB" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Quizzes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Data Structures - Pre-Quiz</h4>
                        <p className="text-sm text-gray-600">Available May 3, 2025</p>
                      </div>
                      <Button size="sm" variant="outline">Prepare</Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Web Development - Post-Quiz</h4>
                        <p className="text-sm text-gray-600">Available May 5, 2025</p>
                      </div>
                      <Button size="sm" disabled>Not Yet Available</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quiz Performance Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <Check className="h-4 w-4 mr-2" />
                    <AlertTitle>Great improvement!</AlertTitle>
                    <AlertDescription>
                      You improved by 16% between pre and post quizzes for Advanced CSS Techniques.
                    </AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <Info className="h-4 w-4 mr-2" />
                    <AlertTitle>Area needing attention</AlertTitle>
                    <AlertDescription>
                      Quiz results indicate more practice needed with DOM Manipulation concepts.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="concepts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Concept Mastery</CardTitle>
              <CardDescription>Your understanding by topic</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={studentAnalyticsData.conceptMastery}
                  margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="concept" type="category" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="mastery" name="Mastery %" fill="#9b87f5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Need Improvement</CardTitle>
                <CardDescription>Concepts scoring below 70%</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentAnalyticsData.conceptMastery
                    .filter(item => item.mastery < 70)
                    .map((item, idx) => (
                      <div key={idx} className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">{item.concept}</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-full h-2 bg-gray-100 rounded-full">
                            <div 
                              className="h-2 bg-amber-500 rounded-full" 
                              style={{ width: `${item.mastery}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{item.mastery}%</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-2">View Resources</Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Strong Concepts</CardTitle>
                <CardDescription>Concepts scoring above 80%</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentAnalyticsData.conceptMastery
                    .filter(item => item.mastery >= 80)
                    .map((item, idx) => (
                      <div key={idx} className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">{item.concept}</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-full h-2 bg-gray-100 rounded-full">
                            <div 
                              className="h-2 bg-green-500 rounded-full" 
                              style={{ width: `${item.mastery}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{item.mastery}%</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-2">Advanced Resources</Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-gray-600">
          {isTeacher
            ? 'Track student performance and identify areas for improvement'
            : 'Monitor your progress and focus on areas for growth'}
        </p>
      </div>

      {isTeacher ? <TeacherAnalytics /> : <StudentAnalytics />}
    </div>
  );
};

export default Analytics;
