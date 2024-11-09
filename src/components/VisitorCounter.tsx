import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

export function VisitorCounter() {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching visitor count from storage/API
    // In a real app, you'd want to implement actual backend storage
    const storedCount = localStorage.getItem('visitorCount');
    const initialCount = storedCount ? parseInt(storedCount) : 0;
    
    // Increment count for new visit
    const newCount = initialCount + 1;
    localStorage.setItem('visitorCount', newCount.toString());
    
    setCount(newCount);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 flex items-center gap-2">
      <Users className="w-4 h-4 text-purple-400" />
      <span className="text-sm font-medium">
        {count.toLocaleString()} visitor{count !== 1 ? 's' : ''}
      </span>
    </div>
  );
}
