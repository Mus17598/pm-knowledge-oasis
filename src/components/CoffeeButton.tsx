
import { useState, useEffect } from 'react';
import { Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CoffeeButton = () => {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }, 20000); // Shake every 20 seconds

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    // Replace with actual donation link
    window.open('https://ko-fi.com/pmknowledgelibrary', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleClick}
        className={`
          bg-primary-500 hover:bg-primary-600 text-white
          px-4 py-3 rounded-full shadow-lg hover:shadow-xl
          transition-all duration-300 transform hover:scale-105
          animate-gentle-bounce
          ${isShaking ? 'animate-coffee-shake' : ''}
        `}
        title="Support us starting at $5!"
      >
        <Coffee className="w-5 h-5 mr-2" />
        <span className="hidden sm:inline">Buy Me a Coffee</span>
        <span className="sm:hidden">☕</span>
      </Button>
    </div>
  );
};

export default CoffeeButton;
