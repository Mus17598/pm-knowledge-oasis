
import { useState } from 'react';
import { Search, Filter, Coffee, ChevronDown, ChevronUp, ExternalLink, Youtube, FileText, Linkedin, BookOpen, Download, Mail, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ResourceSection from '@/components/ResourceSection';
import PMProfile from '@/components/PMProfile';
import CoffeeButton from '@/components/CoffeeButton';
import Navigation from '@/components/Navigation';
import { ThemeProvider } from '@/components/ThemeProvider';
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
    <ThemeProvider defaultTheme="light" storageKey="pmstarter-theme">
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <Navigation />
        
        {/* Hero Section */}
        <header className="relative overflow-hidden bg-gradient-to-r from-white via-orange-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
          <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm"></div>
          <div className="relative container mx-auto px-4 py-16">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block p-2 bg-primary-100 dark:bg-primary-900 rounded-full mb-6">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-transparent mb-6 leading-tight">
                PMStarter
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Your comprehensive resource hub for Product Management excellence. 
                <br className="hidden md:block" />
                Discover curated content, learn from experts, and level up your PM skills.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => document.getElementById('youtube')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Resources
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  asChild
                  className="border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 px-8 py-4 text-lg rounded-full transition-all duration-300"
                >
                  <a href="https://www.linkedin.com/in/muskan-gupta98/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5 mr-2" />
                    Connect with Me
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-16" id="resources">
          {/* Resource Sections */}
          <div className="space-y-8">
            {sections.map((section) => {
              const isExpanded = expandedSections.includes(section.id);
              const Icon = section.icon;
              
              return (
                <Card key={section.id} id={section.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden scroll-mt-20">
                  <CardHeader 
                    className="cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-white dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all duration-300 p-8"
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${section.color} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 mb-2">{section.title}</CardTitle>
                          <p className="text-gray-600 dark:text-gray-300 text-lg">{section.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary" className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-4 py-2 text-sm font-semibold rounded-full">
                          {section.resources.length} resources
                        </Badge>
                        <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                          {isExpanded ? (
                            <ChevronUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {isExpanded && (
                    <CardContent className="animate-fade-in p-8 pt-0">
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
          <Card id="pm-profiles" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden mt-8 scroll-mt-20">
            <CardHeader 
              className="cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-white dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all duration-300 p-8"
              onClick={() => toggleSection('pm-profiles')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🌟</span>
                  </div>
                  <div>
                    <CardTitle className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 mb-2">PMs to Follow on LinkedIn</CardTitle>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">Learn from industry leaders and thought pioneers</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-4 py-2 text-sm font-semibold rounded-full">
                    {pmProfiles.length} profiles
                  </Badge>
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                    {expandedSections.includes('pm-profiles') ? (
                      <ChevronUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            {expandedSections.includes('pm-profiles') && (
              <CardContent className="animate-fade-in p-8 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pmProfiles.map((profile, index) => (
                    <PMProfile key={index} profile={profile} />
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Support Section */}
          <Card id="support" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden mt-8 scroll-mt-20">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="inline-block p-3 bg-primary-100 dark:bg-primary-900 rounded-full mb-6">
                  <Coffee className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Support PMStarter
                </h2>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                  Help us maintain and expand this resource library. Your support helps us curate more high-quality PM content for the community.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    asChild
                    size="lg"
                    className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <a href="https://www.linkedin.com/in/muskan-gupta98/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-5 h-5 mr-2" />
                      Connect & Share Feedback
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Coffee Button */}
        <CoffeeButton />
      </div>
    </ThemeProvider>
  );
};

export default Index;
