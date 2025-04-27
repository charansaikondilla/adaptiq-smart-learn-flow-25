
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Class } from '@/types';
import ClassDetail from './ClassDetail';

interface ClassDetailDialogProps {
  classData: Class;
  triggerText: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  buttonSize?: "default" | "sm" | "lg" | "icon";
}

const ClassDetailDialog: React.FC<ClassDetailDialogProps> = ({ 
  classData, 
  triggerText,
  buttonVariant = "outline",
  buttonSize = "sm" 
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize}>
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl">
        <DialogHeader>
          <DialogTitle>Class Details</DialogTitle>
          <DialogDescription>
            View complete information about this class.
          </DialogDescription>
        </DialogHeader>
        <ClassDetail classData={classData} />
      </DialogContent>
    </Dialog>
  );
};

export default ClassDetailDialog;
