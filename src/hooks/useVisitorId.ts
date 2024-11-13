import { useEffect, useState } from 'react';

export function useVisitorId() {
  const [visitorId, setVisitorId] = useState<string>('');

  useEffect(() => {
    const getOrCreateVisitorId = () => {
      const stored = localStorage.getItem('visitorId');
      if (stored) return stored;

      const newId = crypto.randomUUID();
      localStorage.setItem('visitorId', newId);
      return newId;
    };

    setVisitorId(getOrCreateVisitorId());
  }, []);

  return visitorId;
}