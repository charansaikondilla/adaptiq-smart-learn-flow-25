
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Resource } from "@/types";
import ResourceSelector from "./ResourceSelector";

interface CreateClassFormProps {
  onSubmit: (classData: any) => void;
  onCancel: () => void;
}

const CreateClassForm: React.FC<CreateClassFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [meetingUrl, setMeetingUrl] = useState("");
  const [selectedResources, setSelectedResources] = useState<Resource[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !selectedDate) return;

    const newClass = {
      title,
      description,
      scheduledFor: selectedDate.toISOString(),
      meetingUrl,
      resources: selectedResources,
    };

    onSubmit(newClass);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Class Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter class title"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter class description"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Date and Time</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP HH:mm") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
            <div className="p-3 border-t">
              <Input 
                type="time" 
                className="w-full" 
                onChange={(e) => {
                  if (selectedDate && e.target.value) {
                    const [hours, minutes] = e.target.value.split(':').map(Number);
                    const newDate = new Date(selectedDate);
                    newDate.setHours(hours, minutes);
                    setSelectedDate(newDate);
                  }
                }}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <label htmlFor="meetingUrl" className="text-sm font-medium">
          Meeting URL (Optional)
        </label>
        <Input
          id="meetingUrl"
          value={meetingUrl}
          onChange={(e) => setMeetingUrl(e.target.value)}
          placeholder="Enter meeting URL"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Add Resources</label>
        <ResourceSelector 
          selectedResources={selectedResources}
          onResourcesChange={setSelectedResources}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Create Class</Button>
      </div>
    </form>
  );
};

export default CreateClassForm;
