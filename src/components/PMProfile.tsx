
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
    // Using a placeholder avatar service
    const seed = name.toLowerCase().replace(/\s+/g, '');
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=ff7a00`;
  };

  return (
    <Card className="h-full bg-white/80 backdrop-blur-sm border border-orange-200 hover:shadow-lg transition-all duration-300 hover:border-primary-300">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="w-16 h-16 border-2 border-primary-200">
            <AvatarImage 
              src={profile.avatar || generateAvatarUrl(profile.name)} 
              alt={profile.name}
            />
            <AvatarFallback className="bg-primary-100 text-primary-700 font-semibold">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 truncate">{profile.name}</h3>
            <p className="text-sm text-gray-600 truncate">
              {profile.role} @ {profile.company}
            </p>
          </div>
        </div>
        
        <p className="text-sm text-gray-700 mb-4 flex-1 italic">
          "{profile.highlight}"
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {profile.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs border-orange-200 text-orange-700">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Button
          asChild
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
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
