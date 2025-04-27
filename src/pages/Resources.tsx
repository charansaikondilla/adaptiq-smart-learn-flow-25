
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, Link, Plus, Search, Video, BookOpen } from 'lucide-react';
import { Resource } from '@/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';

// Mock resources
const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Introduction to JavaScript Variables',
    description: 'A comprehensive guide to understanding JavaScript variables and their scope.',
    url: 'https://example.com/js-variables',
    type: 'article',
    conceptIds: ['js-basics']
  },
  {
    id: '2',
    title: 'Building Responsive Web Layouts',
    description: 'Learn how to create responsive layouts using CSS Grid and Flexbox.',
    url: 'https://example.com/responsive-layouts',
    type: 'video',
    conceptIds: ['css-layouts']
  },
  {
    id: '3',
    title: 'Data Structures Practice Problems',
    description: 'A collection of practice problems to help master common data structures.',
    url: 'https://example.com/data-structures',
    type: 'example',
    conceptIds: ['data-structures']
  },
  {
    id: '4',
    title: 'Understanding Big O Notation',
    description: 'An exploration of algorithmic efficiency and space/time complexity analysis.',
    url: 'https://example.com/big-o-notation',
    type: 'article',
    conceptIds: ['algorithms']
  },
  {
    id: '5',
    title: 'Introduction to React Hooks',
    description: 'Learn how to use React hooks to manage state and side effects in functional components.',
    url: 'https://example.com/react-hooks',
    type: 'video',
    conceptIds: ['react-basics']
  },
];

// Concept data for the dropdown
const concepts = [
  { id: 'js-basics', name: 'JavaScript Basics' },
  { id: 'css-layouts', name: 'CSS Layouts' },
  { id: 'data-structures', name: 'Data Structures' },
  { id: 'algorithms', name: 'Algorithms' },
  { id: 'react-basics', name: 'React Fundamentals' },
];

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  url: z.string().url({
    message: "Please enter a valid URL.",
  }),
  type: z.enum(['video', 'article', 'example'], {
    required_error: "Please select a resource type.",
  }),
  conceptId: z.string({
    required_error: "Please select a concept.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const getResourceIcon = (type: 'video' | 'article' | 'example') => {
  switch (type) {
    case 'video':
      return <Video className="h-4 w-4 mr-1" />;
    case 'article':
      return <FileText className="h-4 w-4 mr-1" />;
    case 'example':
      return <BookOpen className="h-4 w-4 mr-1" />;
  }
};

const Resources = () => {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';
  const { toast } = useToast();
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [searchTerm, setSearchTerm] = useState('');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
    },
  });
  
  const onSubmit = (values: FormValues) => {
    const newResource: Resource = {
      id: (resources.length + 1).toString(),
      title: values.title,
      description: values.description,
      url: values.url,
      type: values.type,
      conceptIds: [values.conceptId],
    };
    
    setResources([...resources, newResource]);
    
    toast({
      title: "Resource Added",
      description: `${values.title} has been added to your resources.`,
    });
    
    form.reset();
  };
  
  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Create a lookup object for concept names
  const conceptsMap = concepts.reduce((acc, concept) => {
    acc[concept.id] = concept.name;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Resources</h1>
          <p className="text-gray-600">
            {isTeacher 
              ? 'Manage learning resources for your students' 
              : 'Explore resources to enhance your learning'}
          </p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search resources..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {isTeacher && (
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Resource
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Resource</DialogTitle>
                  <DialogDescription>
                    Add a new learning resource for your students.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Introduction to JavaScript Variables" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="A brief description of this resource..." 
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/resource" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select resource type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="article">Article</SelectItem>
                                <SelectItem value="example">Example</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="conceptId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Concept</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select related concept" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {concepts.map(concept => (
                                  <SelectItem key={concept.id} value={concept.id}>
                                    {concept.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <DialogFooter>
                      <Button type="submit">Add Resource</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="article">Articles</TabsTrigger>
          <TabsTrigger value="example">Examples</TabsTrigger>
          {!isTeacher && <TabsTrigger value="recommended">Recommended for You</TabsTrigger>}
        </TabsList>
        
        {['all', 'video', 'article', 'example', 'recommended'].map(tab => (
          <TabsContent key={tab} value={tab}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources
                .filter(resource => tab === 'all' || tab === 'recommended' || resource.type === tab)
                .map(resource => (
                  <Card key={resource.id} className="flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <Badge 
                          variant="outline"
                          className="mb-2 flex items-center"
                        >
                          {getResourceIcon(resource.type)}
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </Badge>
                        {tab === 'recommended' && (
                          <Badge variant="secondary">Recommended</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="text-sm text-gray-500">
                        Related to: {resource.conceptIds.map(id => conceptsMap[id] || id).join(', ')}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" className="w-full" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <Link className="h-4 w-4 mr-2" />
                          Access Resource
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
            {filteredResources.filter(resource => tab === 'all' || tab === 'recommended' || resource.type === tab).length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No resources found</h3>
                <p className="text-gray-500 mt-2">
                  {searchTerm
                    ? "No resources matching your search criteria"
                    : isTeacher
                      ? "Add resources to help your students learn"
                      : "No resources available in this category yet"}
                </p>
                {isTeacher && (
                  <Button className="mt-4" asChild>
                    <DialogTrigger>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Resource
                    </DialogTrigger>
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Resources;
