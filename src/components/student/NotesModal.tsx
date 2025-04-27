
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Class } from "@/types";

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  classItem: Class;
}

const sampleNotes = {
  content: `# Data Structures and Algorithms

## Key Topics Covered
- Time and space complexity analysis
- Binary search trees
- Graph traversal algorithms (BFS and DFS)
- Sorting algorithms (quicksort, mergesort)

## Important Concepts
1. **Big O Notation** - Used to classify algorithms according to how their run time or space requirements grow as the input size grows.
2. **Tree Traversal** - Different ways to visit all nodes in a tree data structure.
3. **Dynamic Programming** - Breaking down problems into simpler subproblems.

## Example Code
\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1
\`\`\`

## Questions to Review
- How does quicksort perform in worst-case scenarios?
- What are the trade-offs between BFS and DFS?
- When would you choose a hash table over a binary search tree?
`,
  keyConcepts: [
    { text: "Big O Notation", timestamp: "10:15" },
    { text: "Binary Search Trees", timestamp: "10:30" },
    { text: "Graph Traversal", timestamp: "11:05" },
    { text: "Dynamic Programming", timestamp: "11:25" },
  ],
  unansweredQuestions: [
    { text: "How to handle collisions in hash tables?", timestamp: "10:45" },
    { text: "Optimal strategy for balancing AVL trees?", timestamp: "11:15" },
  ],
  aiSummary: `This class provided a comprehensive overview of fundamental data structures and algorithms, with particular emphasis on tree-based structures and search algorithms. The material covered time and space complexity analysis using Big O notation, which is crucial for evaluating algorithm efficiency. 

Key learning outcomes include:
1. Understanding the implementation and optimization of binary search trees
2. Mastering graph traversal techniques using breadth-first and depth-first approaches
3. Analyzing the performance characteristics of common sorting algorithms

Recommended follow-up resources: "Introduction to Algorithms" by Cormen et al., particularly chapters 12-14 on binary search trees and dynamic programming.`
};

const NotesModal: React.FC<NotesModalProps> = ({ isOpen, onClose, classItem }) => {
  const [activeTab, setActiveTab] = useState("notes");
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Class Notes: {classItem.title}</DialogTitle>
          <DialogDescription>
            Your notes and AI-generated summaries from this class
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="notes" className="py-4" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notes">My Notes</TabsTrigger>
            <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
            <TabsTrigger value="ai-summary">AI Summary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notes" className="mt-4">
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-md">
                {sampleNotes.content}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="concepts" className="mt-4 space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Key Concepts</h3>
              <div className="space-y-2">
                {sampleNotes.keyConcepts.map((concept, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="font-medium">{concept.text}</span>
                    <Badge variant="outline" className="text-xs">
                      {concept.timestamp}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Unanswered Questions</h3>
              <div className="space-y-2">
                {sampleNotes.unansweredQuestions.map((question, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span>{question.text}</span>
                    <Badge variant="outline" className="text-xs">
                      {question.timestamp}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ai-summary" className="mt-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">AI-Generated Summary</h3>
              <p className="text-sm whitespace-pre-line">{sampleNotes.aiSummary}</p>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Recommended Resources</h3>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-blue-600">Advanced Tree Traversal Techniques</p>
                      <p className="text-xs text-gray-500 mt-1">Article - In-depth guide to efficient tree traversal algorithms</p>
                    </div>
                    <Badge>AI Recommended</Badge>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-blue-600">Dynamic Programming Visualized</p>
                      <p className="text-xs text-gray-500 mt-1">Video - Step-by-step visualization of DP problems</p>
                    </div>
                    <Badge>AI Recommended</Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {activeTab === "notes" && (
            <Button>
              Edit Notes
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NotesModal;
