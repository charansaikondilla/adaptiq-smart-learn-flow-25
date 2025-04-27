
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ClassNote, Class } from '@/types';
import { BookOpen, Search, File, Clock, BookMarked } from 'lucide-react';
import { formatDate } from '@/lib/utils';

// Mock class notes for demo
const mockClassNotes: ClassNote[] = [
  {
    id: '1',
    classId: '1',
    content: `
# Introduction to Computer Science

## Key Concepts
- Computing systems and their components
- Algorithms and problem-solving approaches
- Programming fundamentals and logic

## Main Points
1. **Computing Systems**: Explored the main components of modern computing systems including hardware (CPU, memory, storage) and software (operating systems, applications).
2. **Algorithmic Thinking**: Discussed the importance of breaking down problems into logical steps and creating efficient solutions.
3. **Programming Basics**: Introduced variables, data types, control structures, and basic syntax patterns common across languages.

## Examples Covered
- Analyzed the steps to solve a simple sorting problem
- Compared different approaches to searching algorithms
- Demonstrated basic programming constructs with pseudocode

## Questions Raised
1. How do we measure algorithm efficiency?
2. What are the trade-offs between different programming paradigms?
3. How has computing evolved historically and what trends might continue?
    `,
    keyConcepts: [
      { text: 'Computing Systems Architecture', timestamp: '00:05:30' },
      { text: 'Algorithmic Problem Solving', timestamp: '00:18:45' },
      { text: 'Programming Fundamentals', timestamp: '00:32:20' },
    ],
    unansweredQuestions: [
      { text: 'How do quantum computers differ from classical computers?', timestamp: '00:42:15' },
      { text: 'What are the ethical implications of AI development?', timestamp: '00:55:30' },
    ],
    createdAt: '2023-01-15T10:00:00Z',
  },
  {
    id: '2',
    classId: '2',
    content: `
# Advanced Mathematics

## Key Concepts
- Linear algebra and its applications
- Differential equations
- Probability and statistics

## Main Points
1. **Linear Algebra**: Explored matrices, vector spaces, linear transformations and their applications in computer graphics and machine learning.
2. **Differential Equations**: Discussed how to model real-world phenomena using differential equations and various solving techniques.
3. **Probability Models**: Introduced probability distributions, random variables, and statistical inference methods.

## Examples Covered
- Matrix operations for 3D transformations
- Solving systems of differential equations
- Bayesian inference examples

## Questions Raised
1. How do eigenvalues relate to principal component analysis?
2. When should we use numerical methods versus analytical solutions for differential equations?
3. What are the limitations of current statistical methods in big data scenarios?
    `,
    keyConcepts: [
      { text: 'Matrix Transformations', timestamp: '00:08:15' },
      { text: 'Differential Equations in Physics', timestamp: '00:24:30' },
      { text: 'Statistical Models and Inference', timestamp: '00:45:10' },
    ],
    unansweredQuestions: [
      { text: 'How are complex eigenvalues interpreted geometrically?', timestamp: '00:30:45' },
      { text: 'What are the cutting-edge approaches to high-dimensional statistics?', timestamp: '00:52:20' },
    ],
    createdAt: '2023-02-10T09:30:00Z',
  },
  {
    id: '3',
    classId: '3',
    content: `
# Data Structures and Algorithms

## Key Concepts
- Array-based structures
- Linked data structures
- Trees and graphs
- Algorithm analysis techniques

## Main Points
1. **Array Structures**: Discussed arrays, dynamic arrays, and their operations with time complexity analysis.
2. **Linked Structures**: Covered singly and doubly linked lists, their implementations and use cases.
3. **Trees**: Explored binary trees, binary search trees, balanced trees and their applications.
4. **Graphs**: Introduced graph representations and basic algorithms like BFS, DFS, and shortest path.

## Examples Covered
- Implementing a dynamic array
- Operations on binary search trees
- Dijkstra's algorithm for shortest path

## Questions Raised
1. When should we prefer hash tables over balanced BSTs?
2. What are the practical considerations when choosing between adjacency lists and matrices?
3. How do modern hardware architectures affect traditional algorithm analysis?
    `,
    keyConcepts: [
      { text: 'Dynamic Array Implementation', timestamp: '00:10:25' },
      { text: 'Binary Search Tree Operations', timestamp: '00:33:15' },
      { text: 'Graph Traversal Algorithms', timestamp: '00:52:40' },
    ],
    unansweredQuestions: [
      { text: 'How do we optimize data structures for cache efficiency?', timestamp: '01:05:30' },
      { text: 'What are the latest advancements in string matching algorithms?', timestamp: '01:15:40' },
    ],
    createdAt: '2023-03-05T11:15:00Z',
  },
];

// Mock classes for reference
const mockClasses = [
  {
    id: '1',
    title: 'Introduction to Computer Science',
    description: 'Learn the fundamentals of computer science and programming.',
    teacherId: '1',
    createdAt: '2023-01-15T10:00:00Z',
    scheduledFor: '2025-05-01T14:00:00Z',
  },
  {
    id: '2',
    title: 'Advanced Mathematics',
    description: 'Explore complex mathematical concepts and their applications.',
    teacherId: '1',
    createdAt: '2023-02-10T09:30:00Z',
    scheduledFor: '2025-05-02T10:00:00Z',
  },
  {
    id: '3',
    title: 'Data Structures and Algorithms',
    description: 'Learn efficient data structures and algorithms for solving problems.',
    teacherId: '1',
    createdAt: '2023-03-05T11:15:00Z',
    scheduledFor: '2025-05-03T15:30:00Z',
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
  },
];

// Simple markdown renderer
const renderMarkdown = (content: string) => {
  const lines = content.split('\n');
  return (
    <div className="space-y-4">
      {lines.map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-2xl font-bold">{line.slice(2)}</h1>;
        } else if (line.startsWith('## ')) {
          return <h2 key={index} className="text-xl font-semibold">{line.slice(3)}</h2>;
        } else if (line.startsWith('### ')) {
          return <h3 key={index} className="text-lg font-medium">{line.slice(4)}</h3>;
        } else if (line.startsWith('- ')) {
          return <li key={index} className="ml-4">{line.slice(2)}</li>;
        } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
          return <li key={index} className="ml-4 list-decimal">{line.slice(3)}</li>;
        } else if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={index} className="font-bold">{line.slice(2, -2)}</p>;
        } else {
          return <p key={index}>{line}</p>;
        }
      })}
    </div>
  );
};

const Notes = () => {
  const [notes, setNotes] = useState<ClassNote[]>([]);
  const [selectedNote, setSelectedNote] = useState<ClassNote | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch these from an API
    setNotes(mockClassNotes);
  }, []);

  // Map class IDs to titles
  const classMap = mockClasses.reduce((acc, cls) => {
    acc[cls.id] = cls.title;
    return acc;
  }, {} as Record<string, string>);

  const filteredNotes = notes.filter(note => {
    const classTitle = classMap[note.classId] || '';
    const content = note.content.toLowerCase();
    const search = searchTerm.toLowerCase();
    
    return classTitle.toLowerCase().includes(search) || 
           content.includes(search) ||
           note.keyConcepts.some(concept => concept.text.toLowerCase().includes(search));
  });

  const handleNoteSelect = (note: ClassNote) => {
    setSelectedNote(note);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Class Notes</h1>
          <p className="text-gray-600">
            Access and search through your automatically generated class notes
          </p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search notes..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <Card 
              key={note.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleNoteSelect(note)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Clock size={16} />
                  <span>{formatDate(note.createdAt)}</span>
                </div>
                <CardTitle>{classMap[note.classId] || 'Unnamed Class'}</CardTitle>
                <CardDescription>
                  {note.keyConcepts.length} key concepts identified
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="line-clamp-3 text-sm text-gray-600">
                  {note.content.split('\n').slice(0, 3).join('\n')}...
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">No notes found</h3>
          <p className="text-gray-500 mt-2">
            {searchTerm
              ? "No notes matching your search criteria"
              : "You don't have any class notes yet"}
          </p>
        </div>
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedNote && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">
                  {classMap[selectedNote.classId] || 'Unnamed Class'}
                </DialogTitle>
                <DialogDescription>
                  {formatDate(selectedNote.createdAt)}
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="notes" className="mt-4">
                <TabsList className="mb-4">
                  <TabsTrigger value="notes">
                    <File className="h-4 w-4 mr-2" />
                    Notes
                  </TabsTrigger>
                  <TabsTrigger value="concepts">
                    <BookMarked className="h-4 w-4 mr-2" />
                    Key Concepts
                  </TabsTrigger>
                  <TabsTrigger value="questions">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Questions
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="notes" className="prose prose-slate max-w-none">
                  {renderMarkdown(selectedNote.content)}
                </TabsContent>
                
                <TabsContent value="concepts">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Key Concepts Identified</h3>
                    <div className="space-y-2">
                      {selectedNote.keyConcepts.map((concept, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">{concept.text}</h4>
                            <div className="text-sm text-gray-500">
                              {concept.timestamp}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="questions">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Unanswered Questions</h3>
                    <div className="space-y-2">
                      {selectedNote.unansweredQuestions.map((question, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">{question.text}</h4>
                            <div className="text-sm text-gray-500">
                              {question.timestamp}
                            </div>
                          </div>
                          <div className="mt-2 flex justify-end">
                            <Button variant="outline" size="sm">Research This</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Notes;
