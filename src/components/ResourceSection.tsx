
import { useState, useMemo } from 'react';
import { Search, Filter, X, ExternalLink, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Resource {
  title: string;
  url: string;
  description: string;
  tags: string[];
  source: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All';
  type: string;
  views?: string;
  author?: string;
}

interface ResourceSectionProps {
  resources: Resource[];
  sectionId: string;
}

const ResourceSection = ({ resources, sectionId }: ResourceSectionProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique tags from resources
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    resources.forEach(resource => {
      resource.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [resources]);

  // Filter and sort resources
  const filteredResources = useMemo(() => {
    let filtered = resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLevel = selectedLevel === 'all' || resource.level === selectedLevel;
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => resource.tags.includes(tag));
      
      return matchesSearch && matchesLevel && matchesTags;
    });

    // Sort resources
    switch (sortBy) {
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'level':
        const levelOrder = { 'Beginner': 0, 'Intermediate': 1, 'Advanced': 2 };
        filtered.sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [resources, searchTerm, selectedLevel, selectedTags, sortBy]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedLevel('all');
    setSelectedTags([]);
    setSortBy('relevance');
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-700';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'Advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-orange-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-orange-200 focus:border-primary-500"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-36 border-orange-200">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-36 border-orange-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="level">Level</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-orange-200 hover:bg-orange-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Tags
            </Button>

            {(selectedTags.length > 0 || selectedLevel !== 'all' || searchTerm) && (
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Tags Filter */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-orange-200">
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedTags.includes(tag) 
                      ? 'bg-primary-500 text-white hover:bg-primary-600' 
                      : 'hover:bg-orange-50 border-orange-200'
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Active Filters */}
        {(selectedTags.length > 0 || selectedLevel !== 'all') && (
          <div className="mt-4 pt-4 border-t border-orange-200">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600">Active filters:</span>
              {selectedLevel !== 'all' && (
                <Badge variant="secondary" className="bg-primary-100 text-primary-700">
                  Level: {selectedLevel}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedLevel('all')} />
                </Badge>
              )}
              {selectedTags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-primary-100 text-primary-700">
                  {tag}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => toggleTag(tag)} />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredResources.length} of {resources.length} resources
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource, index) => (
          <Card key={index} className="h-full bg-white/80 backdrop-blur-sm border border-orange-200 hover:shadow-lg transition-all duration-300 hover:border-primary-300">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 line-clamp-2 leading-tight">
                    {resource.title}
                  </h3>
                  <Badge className={`ml-2 text-xs ${getLevelColor(resource.level)}`}>
                    {resource.level}
                  </Badge>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {resource.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs border-orange-200 text-orange-700">
                      {tag}
                    </Badge>
                  ))}
                  {resource.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                      +{resource.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {resource.views && (
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <Star className="w-3 h-3 mr-1" />
                    {resource.views}
                  </div>
                )}
              </div>
              
              <Button
                asChild
                className="w-full bg-primary-500 hover:bg-primary-600 text-white"
              >
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Resource
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No resources found</div>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default ResourceSection;
