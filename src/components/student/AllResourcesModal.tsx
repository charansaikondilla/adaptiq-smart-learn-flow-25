
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ExternalLink, Book, Video, Code } from "lucide-react";
import { Resource } from "@/types";

interface AllResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  resources: Resource[];
}

// Add more mock resources
const additionalResources: Resource[] = [
  {
    id: '201',
    title: 'Design Patterns in Object-Oriented Programming',
    description: 'Article - Comprehensive guide to common design patterns',
    url: '#',
    type: 'article',
    conceptIds: ['c7'],
    aiRecommended: true
  },
  {
    id: '202',
    title: 'Advanced SQL Techniques',
    description: 'Video - Deep dive into complex SQL queries and optimizations',
    url: '#',
    type: 'video',
    conceptIds: ['c8'],
    aiRecommended: false
  },
  {
    id: '203',
    title: 'Web Security Best Practices',
    description: 'Article - Essential security measures for web applications',
    url: '#',
    type: 'article',
    conceptIds: ['c9'],
    aiRecommended: true
  },
  {
    id: '204',
    title: 'Interactive Git Tutorial',
    description: 'Example - Hands-on tutorial for mastering Git workflows',
    url: '#',
    type: 'example',
    conceptIds: ['c10'],
    aiRecommended: false
  },
  {
    id: '205',
    title: 'Building Responsive UIs',
    description: 'Video - Techniques for creating dynamic user interfaces',
    url: '#',
    type: 'video',
    conceptIds: ['c11'],
    aiRecommended: true
  }
];

const AllResourcesModal: React.FC<AllResourcesModalProps> = ({ 
  isOpen, 
  onClose, 
  resources
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "article" | "video" | "example">("all");
  
  const allResources = [...resources, ...additionalResources];
  
  // Filter resources based on search term and type
  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || resource.type === filter;
    return matchesSearch && matchesFilter;
  });
  
  // Get icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <Book className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'example':
        return <Code className="h-4 w-4" />;
      default:
        return <Book className="h-4 w-4" />;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>All Resources</DialogTitle>
          <DialogDescription>
            Browse all available learning resources
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex flex-col md:flex-row gap-2 mb-4">
            <Input 
              placeholder="Search resources..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <div className="flex space-x-2">
              <Button 
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={filter === "article" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("article")}
              >
                Articles
              </Button>
              <Button 
                variant={filter === "video" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("video")}
              >
                Videos
              </Button>
              <Button 
                variant={filter === "example" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("example")}
              >
                Examples
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <div key={resource.id} className="border rounded-md p-4">
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 text-blue-600">
                        {getResourceIcon(resource.type)}
                      </div>
                      <div>
                        <h3 className="text-blue-600 font-medium">{resource.title}</h3>
                        <p className="text-sm text-gray-500">{resource.description}</p>
                        <p className="text-xs mt-1">
                          <span className="font-medium">Topic:</span> Data Structures
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      {resource.aiRecommended && (
                        <Badge className="mb-2">AI Recommended</Badge>
                      )}
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-blue-600 border-blue-600"
                      onClick={() => window.open(resource.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Open Resource
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No resources found
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AllResourcesModal;
