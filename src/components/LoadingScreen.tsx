import { Html, useProgress } from '@react-three/drei';

export function LoadingScreen() {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="text-white text-xl font-semibold">
        {progress.toFixed(0)}%
      </div>
    </Html>
  );
}