import { useState, useEffect } from 'react';
import { useApi } from './useApi';
import { useVisitorId } from './useVisitorId';

interface VisitorState {
  totalCount: number;
  uniqueVisitors: string[];
  lastUpdated: number;
}

const INITIAL_STATE: VisitorState = {
  totalCount: 0,
  uniqueVisitors: [],
  lastUpdated: 0
};

const SYNC_INTERVAL = 30000; // 30 seconds

export function useVisitorCounter() {
  const [state, setState] = useState<VisitorState>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewVisitor, setIsNewVisitor] = useState(false);
  const { fetchWithAuth } = useApi();
  const visitorId = useVisitorId();

  useEffect(() => {
    let syncInterval: NodeJS.Timeout;

    const syncWithServer = async () => {
      if (!visitorId) return;

      try {
        const response = await fetchWithAuth<VisitorState>({
          endpoint: '/visitors/sync',
          method: 'POST',
          body: {
            visitorId,
            lastSync: state.lastUpdated,
            currentState: state
          }
        });

        setState(response);
        setIsNewVisitor(!response.uniqueVisitors.includes(visitorId));
      } catch (error) {
        console.error('Failed to sync with server:', error);
        handleOfflineMode();
      } finally {
        setIsLoading(false);
      }
    };

    const handleOfflineMode = () => {
      const storedData = localStorage.getItem('visitorState');
      if (storedData) {
        const localState: VisitorState = JSON.parse(storedData);
        if (localState.lastUpdated > state.lastUpdated) {
          setState(localState);
        }
      }

      if (!state.uniqueVisitors.includes(visitorId)) {
        const newState = {
          totalCount: state.totalCount + 1,
          uniqueVisitors: [...state.uniqueVisitors, visitorId],
          lastUpdated: Date.now()
        };
        setState(newState);
        localStorage.setItem('visitorState', JSON.stringify(newState));
        setIsNewVisitor(true);
      }
    };

    syncWithServer();
    syncInterval = setInterval(syncWithServer, SYNC_INTERVAL);

    return () => clearInterval(syncInterval);
  }, [visitorId, fetchWithAuth, state.lastUpdated]);

  return {
    count: state.totalCount,
    isNewVisitor,
    isLoading
  };
}
