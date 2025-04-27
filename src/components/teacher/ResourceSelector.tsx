
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Resource } from '@/types';

interface ResourceSelectorProps {
  selectedResources: Resource[];
  onResourcesChange: (resources: Resource[]) => void;
}

const ResourceSelector: React.FC<ResourceSelectorProps> = ({ selectedResources, onResourcesChange }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState<'article' | 'video' | 'example'>('article');

  const handleAddResource = () => {
    if (!title || !url) return;
    
    const newResource: Resource = {
      id: `temp-${Date.now()}`,
      title,
      description,
      url,
      type,
      conceptIds: [],
    };

    onResourcesChange([...selectedResources, newResource]);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setUrl('');
    setType('article');
    setIsAdding(false);
  };

  const handleRemoveResource = (resourceId: string) => {
    onResourcesChange(selectedResources.filter(r => r.id !== resourceId));
  };

  return (
    <div className="space-y-4">
      {selectedResources.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Added Resources:</h4>
          <ul className="space-y-2">
            {selectedResources.map(resource => (
              <li key={resource.id} className="flex justify-between items-center p-2 bg-gray-50 rounded border">
                <div>
                  <p className="font-medium">{resource.title}</p>
                  <p className="text-xs text-muted-foreground">{resource.type}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRemoveResource(resource.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isAdding ? (
        <div className="space-y-3 p-3 border rounded-md">
          <div>
            <label className="text-xs font-medium" htmlFor="resourceTitle">Title</label>
            <Input 
              id="resourceTitle" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="Resource title"
            />
          </div>
          
          <div>
            <label className="text-xs font-medium" htmlFor="resourceDesc">Description (optional)</label>
            <Textarea 
              id="resourceDesc" 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              placeholder="Resource description"
              rows={2}
            />
          </div>
          
          <div>
            <label className="text-xs font-medium" htmlFor="resourceUrl">URL</label>
            <Input 
              id="resourceUrl" 
              value={url} 
              onChange={e => setUrl(e.target.value)} 
              placeholder="https://..."
            />
          </div>
          
          <div>
            <label className="text-xs font-medium" htmlFor="resourceType">Type</label>
            <Select value={type} onValueChange={(value: any) => setType(value)}>
              <SelectTrigger id="resourceType">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="article">Article</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="example">Example</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" size="sm" onClick={resetForm}>Cancel</Button>
            <Button size="sm" onClick={handleAddResource}>Add</Button>
          </div>
        </div>
      ) : (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={() => setIsAdding(true)}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Resource
        </Button>
      )}
    </div>
  );
};

export default ResourceSelector;
