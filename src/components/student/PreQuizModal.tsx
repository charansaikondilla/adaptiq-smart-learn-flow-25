
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

interface PreQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  classId: string;
  className: string;
}

const sampleQuizQuestions: Question[] = [
  {
    id: "q1",
    text: "What is the primary function of an operating system?",
    options: [
      "To run applications",
      "To manage hardware resources",
      "To provide a user interface",
      "All of the above"
    ],
    correctOption: 3,
    difficulty: "medium",
    conceptId: "c1"
  },
  {
    id: "q2",
    text: "Which data structure operates on a LIFO basis?",
    options: [
      "Queue",
      "Stack",
      "Linked List",
      "Array"
    ],
    correctOption: 1,
    difficulty: "easy",
    conceptId: "c4"
  },
  {
    id: "q3",
    text: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Systems",
      "Creative Style Solutions",
      "Coded Style Structures"
    ],
    correctOption: 0,
    difficulty: "easy",
    conceptId: "c6"
  }
];

const PreQuizModal: React.FC<PreQuizModalProps> = ({ isOpen, onClose, classId, className }) => {
  const { toast } = useToast();
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  
  const handleStartQuiz = () => {
    setStarted(true);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    
    // Move to next question or complete the quiz
    if (currentQuestion < sampleQuizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 500);
    } else {
      setCompleted(true);
    }
  };

  const handleComplete = () => {
    // Calculate score
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === sampleQuizQuestions[index].correctOption) {
        score++;
      }
    });
    
    const percentage = Math.round((score / sampleQuizQuestions.length) * 100);
    
    toast({
      title: "Pre-Quiz Completed",
      description: `You scored ${percentage}%. Your results have been saved.`,
    });
    
    onClose();
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setCompleted(false);
  };

  const handleClose = () => {
    onClose();
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setCompleted(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {!started ? `Pre-Quiz: ${className}` : 
             completed ? "Quiz Complete" : 
             `Question ${currentQuestion + 1} of ${sampleQuizQuestions.length}`}
          </DialogTitle>
          <DialogDescription>
            {!started ? 
              "Complete this quiz to assess your knowledge before the class." : 
              completed ? 
              "You've completed the pre-quiz. Your results will help tailor the class to your needs." :
              sampleQuizQuestions[currentQuestion].text}
          </DialogDescription>
        </DialogHeader>

        {!started && (
          <div className="py-4">
            <p className="text-sm text-gray-500">
              This quiz contains {sampleQuizQuestions.length} questions and will help identify areas you should focus on during the class.
            </p>
          </div>
        )}

        {started && !completed && (
          <div className="py-4 space-y-2">
            {sampleQuizQuestions[currentQuestion].options.map((option, idx) => (
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

        <DialogFooter className="sm:justify-between">
          {!started ? (
            <>
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleStartQuiz}>Start Quiz</Button>
            </>
          ) : completed ? (
            <Button onClick={handleComplete} className="w-full">View Results</Button>
          ) : (
            <div className="w-full flex justify-between">
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {sampleQuizQuestions.length}
              </span>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreQuizModal;
