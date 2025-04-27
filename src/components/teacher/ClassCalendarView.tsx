
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { formatDate } from "@/lib/utils";
import { Class } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClassCalendarViewProps {
  classes: Class[];
}

const ClassCalendarView: React.FC<ClassCalendarViewProps> = ({ classes }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Filter classes for the selected date
  const classesForSelectedDate = selectedDate 
    ? classes.filter(classItem => {
        const classDate = new Date(classItem.scheduledFor);
        return (
          classDate.getDate() === selectedDate.getDate() &&
          classDate.getMonth() === selectedDate.getMonth() &&
          classDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : [];

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      <div className="md:w-1/2 bg-white rounded-lg shadow p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md bg-white p-3 pointer-events-auto"
          showOutsideDays={true}
        />
      </div>
      
      <div className="md:w-1/2">
        <h3 className="text-lg font-medium mb-4">
          Classes on {selectedDate ? formatDate(selectedDate.toISOString()) : "Selected Date"}
        </h3>
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
          {classesForSelectedDate.length > 0 ? (
            classesForSelectedDate.map((classItem) => (
              <Card key={classItem.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <h4 className="font-semibold">{classItem.title}</h4>
                  <p className="text-muted-foreground text-sm mb-2">{formatDate(classItem.scheduledFor)}</p>
                  <p className="text-sm mb-3">{classItem.description}</p>
                  
                  {classItem.resources && classItem.resources.length > 0 && (
                    <div className="mt-2">
                      <h5 className="text-sm font-medium mb-1">Resources:</h5>
                      <ul className="space-y-1">
                        {classItem.resources.map((resource) => (
                          <li key={resource.id} className="text-sm flex items-center justify-between">
                            <span>{resource.title}</span>
                            {resource.url && (
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" asChild>
                                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {classItem.meetingUrl && (
                    <div className="mt-3 pt-2 border-t">
                      <Button size="sm" variant="outline" className="w-full" asChild>
                        <a href={classItem.meetingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
                          <ExternalLink className="h-4 w-4" />
                          Join Meeting
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-8">No classes scheduled for this date</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassCalendarView;
