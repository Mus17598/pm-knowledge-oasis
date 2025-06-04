
import { ExternalLink, Linkedin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PMProfileProps {
  profile: {
    name: string;
    role: string;
    company: string;
    highlight: string;
    tags: string[];
    linkedinUrl: string;
    avatar?: string;
  };
}

const PMProfile = ({ profile }: PMProfileProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const generateAvatarUrl = (name: string) => {
    const seed = name.toLowerCase().replace(/\s+/g, '');
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=ff7a00`;
  };

  return (
    <Card className="h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 rounded-xl overflow-hidden">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="w-16 h-16 border-3 border-primary-200 shadow-md">
            <AvatarImage 
              src={profile.avatar || generateAvatarUrl(profile.name)} 
              alt={profile.name}
            />
            <AvatarFallback className="bg-primary-100 text-primary-700 font-semibold text-lg">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-800 truncate text-lg">{profile.name}</h3>
            <p className="text-sm text-gray-600 truncate font-medium">
              {profile.role} @ {profile.company}
            </p>
          </div>
        </div>
        
        <p className="text-sm text-gray-700 mb-4 flex-1 italic bg-gray-50 p-3 rounded-lg">
          "{profile.highlight}"
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {profile.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs border-primary-200 text-primary-700 bg-primary-50">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Button
          asChild
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
        >
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-4 h-4 mr-2" />
            Follow on LinkedIn
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PMProfile;
