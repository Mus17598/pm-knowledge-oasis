import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const resources = {
  articles: [
    {
      title: "The Product Manager's Guide to User Research",
      description: "Learn how to conduct effective user research and gather valuable insights.",
      level: "Beginner",
      link: "#"
    },
    {
      title: "Advanced Product Strategy",
      description: "Deep dive into product strategy and roadmap planning.",
      level: "Advanced",
      link: "#"
    }
  ],
  videos: [
    {
      title: "Product Discovery Workshop",
      description: "Step-by-step guide to running effective product discovery sessions.",
      level: "Intermediate",
      link: "#"
    },
    {
      title: "Data-Driven Decision Making",
      description: "Learn how to use data to make better product decisions.",
      level: "Advanced",
      link: "#"
    }
  ],
  templates: [
    {
      title: "PRD Template",
      description: "Comprehensive product requirements document template.",
      level: "Beginner",
      link: "#"
    },
    {
      title: "Product Strategy Framework",
      description: "Framework for developing and documenting product strategy.",
      level: "Intermediate",
      link: "#"
    }
  ]
};

export function ResourceList() {
  return (
    <Tabs defaultValue="articles" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-background/50 backdrop-blur-sm border border-border/50">
        <TabsTrigger value="articles">Articles</TabsTrigger>
        <TabsTrigger value="videos">Videos</TabsTrigger>
        <TabsTrigger value="templates">Templates</TabsTrigger>
      </TabsList>
      
      {Object.entries(resources).map(([key, items]) => (
        <TabsContent key={key} value={key} className="space-y-4">
          {items.map((resource, index) => (
            <Card key={index} className="bg-background/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <Badge variant="secondary" className="ml-2">
                    {resource.level}
                  </Badge>
                </div>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href={resource.link}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  View Resource →
                </a>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      ))}
    </Tabs>
  );
} 