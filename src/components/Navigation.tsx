import { useState, useEffect } from 'react';
import { Menu, X, BookOpen, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700' 
        : 'bg-transparent'
    }`}>
      <div className="flex items-center justify-between h-16 px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            PMStarter
          </span>
        </div>
        {/* Navigation Buttons */}
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => smoothScroll('resources')}
            className="bg-white text-primary border border-primary hover:bg-primary hover:text-white transition-colors duration-200 font-medium"
          >
            Resources
          </Button>
          <Button
            onClick={() => smoothScroll('chatbot-section')}
            className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Chat Assistant
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
