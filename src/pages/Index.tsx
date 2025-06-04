
import { useState } from 'react';
import { Search, Filter, Coffee, ChevronDown, ChevronUp, ExternalLink, Youtube, FileText, Linkedin, BookOpen, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ResourceSection from '@/components/ResourceSection';
import PMProfile from '@/components/PMProfile';
import CoffeeButton from '@/components/CoffeeButton';
import { youtubeResources, blogResources, linkedinResources, courseResources, pdfResources, pmProfiles } from '@/data/resources';

const Index = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const sections = [
    {
      id: 'youtube',
      title: 'YouTube Videos',
      icon: Youtube,
      description: 'Curated PM videos from industry experts',
      resources: youtubeResources,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'blogs',
      title: 'Blogs & Medium Articles',
      icon: FileText,
      description: 'In-depth articles and thought leadership',
      resources: blogResources,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Posts',
      icon: Linkedin,
      description: 'Insights and discussions from PM community',
      resources: linkedinResources,
      color: 'from-blue-700 to-blue-800'
    },
    {
      id: 'courses',
      title: 'Online Courses',
      icon: BookOpen,
      description: 'Structured learning paths and certifications',
      resources: courseResources,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'pdfs',
      title: 'PDFs & Downloadables',
      icon: Download,
      description: 'Templates, frameworks, and guides',
      resources: pdfResources,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent mb-2">
              PM Knowledge Library
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Your comprehensive resource hub for Product Management excellence. Discover curated content, learn from experts, and level up your PM skills.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Resource Sections */}
        <div className="space-y-6 mb-12">
          {sections.map((section) => {
            const isExpanded = expandedSections.includes(section.id);
            const Icon = section.icon;
            
            return (
              <Card key={section.id} className="bg-white/70 backdrop-blur-sm border border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader 
                  className="cursor-pointer hover:bg-orange-50/50 transition-colors duration-200"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${section.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-800">{section.title}</CardTitle>
                        <p className="text-gray-600 text-sm">{section.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-primary-100 text-primary-700">
                        {section.resources.length} resources
                      </Badge>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-primary-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-primary-500" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                {isExpanded && (
                  <CardContent className="animate-fade-in">
                    <ResourceSection 
                      resources={section.resources}
                      sectionId={section.id}
                    />
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* PMs to Follow Section */}
        <Card className="bg-white/70 backdrop-blur-sm border border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader 
            className="cursor-pointer hover:bg-orange-50/50 transition-colors duration-200"
            onClick={() => toggleSection('pm-profiles')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                  <span className="text-2xl">🌟</span>
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-800">PMs to Follow on LinkedIn</CardTitle>
                  <p className="text-gray-600 text-sm">Learn from industry leaders and thought pioneers</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-primary-100 text-primary-700">
                  {pmProfiles.length} profiles
                </Badge>
                {expandedSections.includes('pm-profiles') ? (
                  <ChevronUp className="w-5 h-5 text-primary-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-primary-500" />
                )}
              </div>
            </div>
          </CardHeader>
          
          {expandedSections.includes('pm-profiles') && (
            <CardContent className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pmProfiles.map((profile, index) => (
                  <PMProfile key={index} profile={profile} />
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      </main>

      {/* Coffee Button */}
      <CoffeeButton />
    </div>
  );
};

export default Index;
