
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
import { useToast } from "@/hooks/use-toast";
import { Question } from "@/types";
import { Progress } from "@/components/ui/progress";

interface PostQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  classId: string;
  className: string;
}

const samplePostQuizQuestions: Question[] = [
  {
    id: "pq1",
    text: "Which of the following is NOT a common sorting algorithm?",
    options: [
      "Bubble Sort",
      "Merge Sort",
      "Loop Sort",
      "Quick Sort"
    ],
    correctOption: 2,
    difficulty: "medium",
    conceptId: "c4"
  },
  {
    id: "pq2",
    text: "What is the time complexity of binary search?",
    options: [
      "O(n)",
      "O(log n)",
      "O(n log n)",
      "O(n²)"
    ],
    correctOption: 1,
    difficulty: "hard",
    conceptId: "c4"
  },
  {
    id: "pq3",
    text: "Which data structure is most suitable for implementing a priority queue?",
    options: [
      "Array",
      "Stack",
      "Linked List",
      "Heap"
    ],
    correctOption: 3,
    difficulty: "medium",
    conceptId: "c4"
  }
];

const PostQuizModal: React.FC<PostQuizModalProps> = ({ isOpen, onClose, classId, className }) => {
  const { toast } = useToast();
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const handleStartQuiz = () => {
    setStarted(true);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    
    // Move to next question or complete the quiz
    if (currentQuestion < samplePostQuizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 500);
    } else {
      setCompleted(true);
    }
  };

  const handleViewResults = () => {
    setShowResults(true);
  };

  const handleComplete = () => {
    // Calculate score
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === samplePostQuizQuestions[index].correctOption) {
        score++;
      }
    });
    
    const percentage = Math.round((score / samplePostQuizQuestions.length) * 100);
    
    toast({
      title: "Post-Quiz Completed",
      description: `You scored ${percentage}%. This shows your understanding after the class.`,
    });
    
    onClose();
    resetState();
  };

  const resetState = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setCompleted(false);
    setShowResults(false);
  };

  const handleClose = () => {
    onClose();
    resetState();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {!started ? `Post-Quiz: ${className}` : 
             completed ? "Quiz Complete" :
             showResults ? "Your Results" :
             `Question ${currentQuestion + 1} of ${samplePostQuizQuestions.length}`}
          </DialogTitle>
          <DialogDescription>
            {!started ? 
              "Complete this quiz to evaluate what you've learned from the class." : 
              completed ? 
              "You've completed the post-quiz. Let's see how much you've improved!" :
              showResults ? 
              "See how well you've mastered the concepts from this class." :
              samplePostQuizQuestions[currentQuestion].text}
          </DialogDescription>
        </DialogHeader>

        {!started && (
          <div className="py-4">
            <p className="text-sm text-gray-500">
              This quiz contains {samplePostQuizQuestions.length} questions and will help assess what you've learned during the class.
            </p>
          </div>
        )}

        {started && !completed && !showResults && (
          <div className="py-4 space-y-2">
            {samplePostQuizQuestions[currentQuestion].options.map((option, idx) => (
              <Button 
                key={idx} 
                variant={answers[currentQuestion] === idx ? "default" : "outline"} 
                className="w-full justify-start text-left mb-2"
                onClick={() => handleAnswerSelect(idx)}
              >
                {option}
              </Button>
            ))}
          </div>
        )}

        {showResults && (
          <div className="py-4 space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <p className="text-sm font-medium">Overall Score</p>
                <p className="text-sm font-medium">78%</p>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <p className="text-sm font-medium">Improvement</p>
                <p className="text-sm font-medium text-green-600">+25%</p>
              </div>
              <Progress value={25} className="h-2 bg-green-100" />
            </div>
            
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm font-medium mb-2">Areas for Further Study</p>
              <ul className="text-sm list-disc list-inside text-gray-600">
                <li>Data Structures - Tree traversal algorithms</li>
                <li>Mathematics - Calculus integration</li>
              </ul>
            </div>
          </div>
        )}

        <DialogFooter className="sm:justify-between">
          {!started ? (
            <>
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleStartQuiz}>Start Quiz</Button>
            </>
          ) : completed && !showResults ? (
            <Button onClick={handleViewResults} className="w-full">View Results</Button>
          ) : showResults ? (
            <Button onClick={handleComplete} className="w-full">Complete</Button>
          ) : (
            <div className="w-full flex justify-between">
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {samplePostQuizQuestions.length}
              </span>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostQuizModal;
