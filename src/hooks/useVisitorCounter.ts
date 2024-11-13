import { useState, useEffect } from 'react';
import { useApi } from './useApi';
import { useVisitorId } from './useVisitorId';

interface VisitorState {
  totalCount: number;
  uniqueVisitors: string[];
  lastUpdated: number;
  sessionId: string;
}

const SESSION_KEY = 'visitorSession';
const STATE_KEY = 'visitorState';
const SYNC_INTERVAL = 30000; // 30 seconds

function getInitialState(): VisitorState {
  const storedState = localStorage.getItem(STATE_KEY);
  const sessionId = crypto.randomUUID();
  
  if (storedState) {
    const parsed = JSON.parse(storedState);
    return {
      ...parsed,
      sessionId,
      lastUpdated: Date.now()
    };
  }

  return {
    totalCount: 0,
    uniqueVisitors: [],
    lastUpdated: Date.now(),
    sessionId
  };
}

export function useVisitorCounter() {
  const [state, setState] = useState<VisitorState>(getInitialState);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewVisitor, setIsNewVisitor] = useState(false);
  const { fetchWithAuth } = useApi();
  const visitorId = useVisitorId();

  useEffect(() => {
    let syncInterval: NodeJS.Timeout;
    const currentSession = sessionStorage.getItem(SESSION_KEY);

    const syncWithServer = async () => {
      if (!visitorId) return;

      try {
        const response = await fetchWithAuth<VisitorState>({
          endpoint: '/visitors/sync',
          method: 'POST',
          body: {
            visitorId,
            sessionId: state.sessionId,
            lastSync: state.lastUpdated,
            currentState: state
          }
        });

        // Merge local and server states
        const mergedState = {
          ...response,
          totalCount: Math.max(response.totalCount, state.totalCount),
          uniqueVisitors: [...new Set([...response.uniqueVisitors, ...state.uniqueVisitors])],
          lastUpdated: Date.now()
        };

        setState(mergedState);
        localStorage.setItem(STATE_KEY, JSON.stringify(mergedState));
        
        const isFirstVisit = !currentSession && !response.uniqueVisitors.includes(visitorId);
        setIsNewVisitor(isFirstVisit);
        
        if (isFirstVisit) {
          sessionStorage.setItem(SESSION_KEY, 'true');
        }
      } catch (error) {
        console.error('Failed to sync with server:', error);
        handleOfflineMode();
      } finally {
        setIsLoading(false);
      }
    };

    const handleOfflineMode = () => {
      if (!currentSession && !state.uniqueVisitors.includes(visitorId)) {
        const newState = {
          ...state,
          totalCount: state.totalCount + 1,
          uniqueVisitors: [...state.uniqueVisitors, visitorId],
          lastUpdated: Date.now()
        };
        setState(newState);
        localStorage.setItem(STATE_KEY, JSON.stringify(newState));
        sessionStorage.setItem(SESSION_KEY, 'true');
        setIsNewVisitor(true);
      }
    };

    syncWithServer();
    syncInterval = setInterval(syncWithServer, SYNC_INTERVAL);

    return () => {
      clearInterval(syncInterval);
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
    };
  }, [visitorId, fetchWithAuth, state.sessionId]);

  return {
    count: state.totalCount,
    isNewVisitor,
    isLoading,
    uniqueVisitors: state.uniqueVisitors.length
  };
}
